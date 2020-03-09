import db from "../db";
import { pick } from "lodash";

export const get = async (req, res) => {
  const { account } = req.params;
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
