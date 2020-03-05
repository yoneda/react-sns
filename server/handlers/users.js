const data = [
  { name: "yamada", mail: "yamada@gmail.com" },
  { name: "tanaka", mail: "tanaka@gmail.com" },
  { name: "suzuki", mail: "suzuki@gmail.com" }
];

export const get = async (req, res) => {
  res.send({ user: data });
};

export const remove = async (req, res) => {
  // 削除処理
  res.send({ success: true });
};
