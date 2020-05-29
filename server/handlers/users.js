const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pick, omit } = require("lodash");
const dayjs = require("dayjs");
const db = require("../db");

// TODO: express-validator でbodyのバリデーション

module.exports.get = async function (req, res) {
  const email = req.email;
  const user = await db("users")
    .where({ email })
    .then((users) => users[0])
    .catch((err) => res.status(404).send({ message: "no any users found" }));
  res.send({ user: omit(user, ["password"]) });
};

module.exports.post = async function (req, res) {
  const { email, password } = req.body.user;
  const hashed = await bcrypt.hash(password, 12);
  const today = dayjs().format("YYYY-M-D H:mm:ss");
  const [id] = await db("users").insert({
    email,
    password: hashed,
    name: "",
    showCalendar: true,
    createdAt: today,
    updatedAt: today,
  });
  const user = await db("users")
    .where({ id })
    .then((users) => users[0]);

  // 新規ユーザ作成時、1つの投稿を作成
  await db("notes").insert({
    title: "新しい日記",
    body: "さぁ、日記をはじめよう。",
    trashed: false,
    createdAt: today,
    updatedAt: today,
    user: id,
  });
  res
    .status(201)
    .location("location")
    .send({ user: omit(user, ["password"]) });
  // TODO: POSTではlocationヘッダに作成後のURLを含めることが推奨されている。
  // TODO: POSTでは作成された情報を返すことが推奨されている。
  // TODO: Postgreでは1回のクエリで作成情報が返るが SQLiteでは2回必要。
};

module.exports.put = async function (req, res) {
  const email = req.email;
  const payload = pick(req.body.user, ["name", "password", "showCalendar"]);
  if (payload.password) {
    payload.password = await bcrypt.hash(payload.password, 12);
  }
  await db("users").where({ email }).update(payload);
  const user = await db("users")
    .where({ email })
    .then((users) => users[0]);
  res.send({ user });
  // TODO: メールアドレスも変更できるように修正
};

module.exports.remove = async function (req, res) {
  const email = req.email;

  // ユーザに紐付けられたノートを削除
  const user = await db("users").where({email}).then(users=>users[0]);
  await db("notes").where({user:user.id}).del();

  // アカウントを削除
  const number = await db("users").where({ email }).del();
  if (!number) {
    throw new Error(`There are no account named ${email} in this database`);
  }
  res.status(200).send({ message: "User has been deleted successfully" });
};

module.exports.login = async function (req, res) {
  const { email, password } = req.body.user;
  console.log(req.body.user);
  const user = await db("users")
    .where({ email })
    .then((users) => users[0])
    .catch((err) =>
      res.status(401).json({ error: "incorrect email or password" })
    );
  console.log(user);
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: "incorrect email or password" });
  }
  const secret = process.env.SECRET;
  const payload = { email };
  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  res
    .cookie("token", token, { maxAge: 60 * 60 * 1000, httpOnly: true })
    .status(200)
    .send({
      message: `Successfully logged in simple diary, your account is ${email}.`,
    });
};

module.exports.logout = (req, res) => {
  res.clearCookie("token").sendStatus(200);
};
