const db = require("../db");

export const get = async () => {
  const users = await db("users").select();
  console.log(users);
};

export const remove = async (req, res) => {
  // 削除処理
  res.send({ success: true });
};

