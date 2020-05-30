const { pick } = require("lodash");
const dayjs = require("dayjs");
const db = require("../db");

module.exports.get = async function (req, res) {
  const email = req.email;
  const { trashed, limit } = req.query;
  const user = await db("users")
    .where({ email })
    .then((users) => users[0]);
  const queryBuilder = db("notes").where({ user: user.id });
  if (trashed !== undefined) {
    queryBuilder.where({ trashed });
  }
  if (limit !== undefined) {
    queryBuilder.limit(limit);
  }
  const notes = await queryBuilder;
  res.send({ notes });
};

/*
module.exports.get = async (req, res) => {
  const mail = req.mail;
  // MEMO: ここは後で認証済みのuserオブジェクトから取得する予定
  const notes = await db("notes")
    .join("users", "users.id", "notes.user")
    .where("users.mail", mail)
    .select("notes.id", "notes.body", "notes.createdAt", "notes.updatedAt");
  res.send(notes);
};*/

module.exports.post = async (req, res) => {
  const mail = req.mail;
  const { body } = req.body;
  const [{ id: userId }] = await db("users").select("id").where({ mail });
  const today = dayjs().format("YYYY-M-D H:mm:ss");
  const [id] = await db("notes")
    .insert({
      body,
      createdAt: today,
      updatedAt: today,
      user: userId,
    })
    .returning("id");
  const [note] = await db("notes").where({ id }).limit(1);
  res.status(201).location("location").send(note);
  // TODO: POSTではlocationヘッダに作成後のURLを含めることが推奨されている。
  // TODO: POSTでは作成された情報を返すことが推奨されている。Postgreでは1回のクエリで作成情報が返るが SQLiteでは2回必要。
};

module.exports.put = async (req, res) => {
  const mail = req.mail;
  const { id } = req.params;
  const payload = pick(req.body, ["body"]);
  const today = dayjs().format("YYYY-M-D H:mm:ss");
  const user = await db("users")
    .where({ mail })
    .then((users) => users[0]);
  await db("notes")
    .where({ id, user: user.id })
    .update({ ...payload, updatedAt: today });
  const [note] = await db("notes").where({ id });
  // TODO: ユーザを取得するクエリと、ノートを修正するクエリは1つにできる
  res.send(note);
};

module.exports.remove = async (req, res) => {
  const mail = req.mail;
  const { id } = req.params;
  const user = await db("users")
    .where({ mail })
    .then((users) => users[0]);
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
