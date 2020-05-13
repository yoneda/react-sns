const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pick } = require("lodash");
const dayjs = require("dayjs");
const db = require("../db");

module.exports.get = async (req, res) => {
  const mail = req.mail;
  const user = await db("users").where({ mail });
  if (user && user.length === 0) {
    res.status(404).send({ message: "not found" });
  }
  res.send(user);
};

module.exports.post = async (req, res) => {
  const { mail, pass } = req.body;
  const hashed = await bcrypt.hash(pass, 12);
  const [id] = await db("users").insert({
    mail,
    pass: hashed,
    showCalendar: true,
    showDateEditor: false,
    calendarStart: 0,
    bio: "hello",
  });
  const user = await db("users").where({ id }).limit(1);

  // 新規ユーザ作成時、1つの投稿を作成
  const today = dayjs().format("YYYY-M-D H:mm:ss");
  const body = "さぁ、日記をはじめよう。";
  await db("notes").insert({
    body,
    createdAt: today,
    updatedAt: today,
    user: id,
  });

  res.status(201).location("location").send(user[0]);
  // TODO: POSTではlocationヘッダに作成後のURLを含めることが推奨されている。
  // TODO: POSTでは作成された情報を返すことが推奨されている。Postgreでは1回のクエリで作成情報が返るが SQLiteでは2回必要。
};

module.exports.put = async (req, res) => {
  const mail = req.mail;
  const payload = pick(req.body, [
    "pass",
    "showCalendar",
    "showDateEditor",
    "calendarStart",
    "bio",
  ]);
  await db("users").where({ mail }).update(payload);
  const user = await db("users").where({ mail });
  res.send(user);
  // TODO: メールアドレスも変更できるように修正
  // TODO: アカウント名も変更できるか検討
  // TODO: バリデーション実装が必要か検討
};

module.exports.remove = async (req, res) => {
  const mail = req.mail;
  const num = await db("users").where({ mail }).del();
  if (!num) {
    throw new Error(`Not found that account is ${mail} in this database.`);
  }
  res.status(200).send({ message: "User has been deleted successfully." });
  // TODO: ユーザに紐付けられたノートもついでに削除
};

module.exports.login = async (req, res) => {
  const { mail, pass } = req.body;
  const user = await db("users")
    .where({ mail })
    .then((users) => {
      if (users.length === 1) {
        return users[0];
      } else {
        throw new Error("any users not found");
      }
    })
    .catch((err) => {
      return res.status(401).json({ error: "incorrect email or password" });
    });
  const isMatch = await bcrypt.compare(pass, user.pass);
  if (!isMatch) {
    return res.status(401).json({ error: "incorrect email or password" });
  }
  const payload = { mail };
  const secret = process.env.SECRET;
  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  res
    .cookie("token", token, { maxAge: 60 * 60 * 1000, httpOnly: true })
    .status(200)
    .send({
      message: `Successfully logged in simple diary, your account is ${mail}.`,
    });
};

module.exports.logout = (req, res) => {
  res.clearCookie("token").sendStatus(200);
};
