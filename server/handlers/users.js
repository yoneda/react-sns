const db = require("../db");
import { pick } from "lodash";

export const get = async (req, res) => {
  const { account } = req.params;
  const user = await db("users").where({ account: account });
  if (user && user.length === 0) {
    res.status(404).send({ message: "not found" });
  }
  res.send(user);
};

export const post = async (req, res) => {
  const { mail, account, pass } = req.body;
  const [id] = await db("users").insert({
    mail,
    account,
    pass,
    showStatus: true,
    showCalendar: true
  });
  const user = await db("users")
    .where({ id })
    .limit(1);
  res
    .status(201)
    .location("location")
    .send(user);
  // TODO: POSTではlocationヘッダに作成後のURLを含めることが推奨されている。
  // TODO: POSTでは作成された情報を返すことが推奨されている。Postgreでは1回のクエリで作成情報が返るが SQLiteでは2回必要。
};

export const put = async (req, res) => {
  const { account } = req.params;
  const query = pick(req.body, ["mail", "pass", "showStatus", "showCalendar"]);
  const id = await db("users")
    .where({ account })
    .update(query);
  const user = await db("users").where({ id });
  res.send(user);
  // TODO: メールアドレスも変更できるように修正
  // TODO: アカウント名も変更できるか検討
  // TODO: バリデーション実装が必要か検討
};

export const remove = async (req, res) => {
  const { account } = req.params;
  const num = await db("users")
    .where({ account: account })
    .del();
  if (!num) {
    throw new Error(`Not found that account is ${account} in this database.`);
  }
  res.status(200).send({ message: "User has been deleted successfully." });
};
