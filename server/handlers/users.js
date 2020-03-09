const db = require("../db");

export const get = async (req, res) => {
  const { account } = req.params;
  const user = await db("users").where({ account: account });
  res.send(user);
};

export const remove = async (req, res) => {
  const { account } = req.params;
  const num = await db("users")
    .where({ account: account })
    .del();
  if (!num) {
    throw new Error(`Not found that account is ${account} in this database.`);
  }
  res.send({ message: "User has been deleted successfully." });
};
