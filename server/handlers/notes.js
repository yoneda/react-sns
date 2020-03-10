import { pick } from "lodash";
import dayjs from "dayjs";
import db from "../db";

export const get = async (req, res) => {
  const { account } = req.query;
  // MEMO: ここは後で認証済みのuserオブジェクトから取得する予定
  const notes = await db("notes")
    .join("users", "users.id", "notes.user")
    .where("users.account", account)
    .select(
      "notes.id",
      "notes.title",
      "notes.body",
      "notes.createdAt",
      "notes.updatedAt",
      "users.account"
    );
  res.send(notes);
};

export const post = async (req, res) => {
  const { account, title, body } = req.body;
  const [{ id: userId }] = await db("users")
    .select("id")
    .where({ account });
  const today = dayjs().format("YYYY-M-D H:mm:ss");
  const [id] = await db("notes").insert({
    title,
    body,
    createdAt: today,
    updatedAt: today,
    user: userId
  });
  const note = await db("notes")
    .where({ id })
    .limit(1);
  res
    .status(201)
    .location("location")
    .send(note);
  // TODO: POSTではlocationヘッダに作成後のURLを含めることが推奨されている。
  // TODO: POSTでは作成された情報を返すことが推奨されている。Postgreでは1回のクエリで作成情報が返るが SQLiteでは2回必要。
};

export const put = async (req, res) => {
  const { id } = req.params;
  const payload = pick(req.body, ["title", "body"]);
  const today = dayjs().format("YYYY-M-D H:mm:ss");
  await db("notes")
    .where({ id })
    .update({ ...payload, updatedAt: today });
  const note = await db("notes").where({ id });
  res.send(note);
};

export const remove = async (req, res) => {
  const { id } = req.params;
  const num = await db("notes")
    .where({ id })
    .del();
  if (!num) {
    throw new Error("Note is not found");
  }
  // TODO: エラー時の status code が500で間違いないかチェックする
  res.status(200).send({ message: "Note has been deleted successfully." });
};
