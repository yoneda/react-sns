const { pick } = require("lodash");
const dayjs = require("dayjs");
const db = require("../db");

module.exports.get = async function (req, res) {
  const email = req.email;
  const { trashed, limit } = req.query;
  console.log(req.query);
  const user = await db("users").where({ email }).first();
  const notes = await db("notes")
    .where({ user: user.id, trashed: trashed || false })
    .limit(limit || 10);
  res.send({ notes });
};

module.exports.post = async function (req, res) {
  const email = req.email;
  const payload = pick(req.body.note, ["title", "body"]);
  const user = await db("users").where({ email }).first();
  const today = dayjs().format("YYYY-M-D H:mm:ss");
  const [id] = await db("notes")
    .insert({
      ...payload,
      trashed: false,
      createdAt: today,
      updatedAt: today,
      user: user.id,
    })
    .returning("id");
  const [note] = await db("notes").where({ id }).limit(1);
  res.status(201).location("location").send({ note });
  // TODO: POSTではlocationヘッダに作成後のURLを含めることが推奨されている。
  // TODO: POSTでは作成された情報を返すことが推奨されている。Postgreでは1回のクエリで作成情報が返るが SQLiteでは2回必要。
};

module.exports.put = async function (req, res) {
  const email = req.email;
  const { id } = req.params;
  const payload = pick(req.body.note, ["title", "body"]);
  const today = dayjs().format("YYYY-M-D H:mm:ss");
  const user = await db("users").where({ email }).first();
  await db("notes")
    .where({ id, user: user.id })
    .update({ ...payload, updatedAt: today });
  const note = await db("notes").where({ id }).first();
  // TODO: ユーザを取得するクエリと、ノートを修正するクエリは1つにできる
  res.send({ note });
};

module.exports.remove = async function (req, res) {
  const email = req.email;
  const { id } = req.params;
  const user = await db("users").where({ email }).first();
  const num = await db("notes").where({ id, user: user.id }).del();
  if (!num) {
    throw new Error("Note is not found");
  }
  // TODO:
  // 1つのnoteを削除するとき、
  // ・特定のメールアドレスをもつユーザが所有するノートである
  // ・特定のノートidである
  // 以上の2つの確認をSQLの結合or副問合せでできるはずなのでPostgreをしっかり学習してから書き換える
  // TODO: エラー時の status code が500で間違いないかチェックする
  res.status(200).send({ message: "Note has been deleted successfully." });
};

module.exports.trash = async function (req, res) {
  const email = req.email;
  const { id } = req.params;
  const user = await db("users").where({ email }).first();
  await db("notes").where({ id, user: user.id }).update({ trashed: true });
  const note = await db("notes").where({ id }).first();
  res.send({ note });
};

module.exports.restore = async function (req, res) {
  const email = req.email;
  const { id } = req.params;
  const user = await db("users").where({ email }).first();
  await db("notes").where({ id, user: user.id }).update({ trashed: false });
  const note = await db("notes").where({ id }).first();
  res.send({ note });
};
