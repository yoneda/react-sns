const db = require("../db");

export const get = async (req, res) => {
  const { account } = req.params;
  const user = await db("users").where({ account: account });
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
