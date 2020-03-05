const data = [
  { text: "text text text", updated: "2020-3-4" },
  { text: "text text text", updated: "2020-3-5" }
];

export const get = async (req, res) => {
  res.send({ note: data });
};

export const remove = async (req, res) => {
  // 削除処理
  res.send({ success: true });
};

