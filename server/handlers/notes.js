import db from "../db";
import { pick } from "lodash";

export const get = async (req, res) => {
  const { account } = req.query;
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

export const remove = async (req, res) => {
  const { id } = req.params;
  const num = await db("notes")
    .where({ id })
    .del();
  if (!num) {
    throw new Error("Note is not found");
    // TODO: エラー時の status code が500で間違いないかチェックする
  res.status(200).send({ message: "Note has been deleted successfully." });
};
