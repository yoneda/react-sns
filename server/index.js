const express = require("express");
const env = require("dotenv");
const cors = require("cors");
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const asyncHandler = require("express-async-handler");
const auth = require("./handlers/auth");
const db = require("./db");
const { omit } = require("lodash");
const Bundler = require("parcel-bundler");

// .envファイルを使用
env.config();
const server = express();
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// api を定義
server.get("/api/helth", (req, res) => {
  res.send({ val: "ok" });
});

// 特定ホストの CORS を許可
server.use(
  cors({
    origin: "http://localhost:3000",
  })
);

server.get(
  "/api/checkAuth",
  asyncHandler(auth),
  asyncHandler(async function (req, res, next) {
    const email = req.email;
    const user = await db("users").where({ email }).first();
    res.status(200).send({ user: omit(user, ["password"]) });
  })
);

server.use("/api", routes);

const options = {
  outDir: "./client/dist",
  cacheDir: "./client/.cache",
};
const bundler = new Bundler("./client/index.html", options);
server.use(bundler.middleware());

const port = process.env.PORT;
server.listen(port || 3000, (err) => {
  if (err) throw err;
  console.log(`ready on localhost:${port}`);
});
