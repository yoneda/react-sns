const express = require("express");
const env = require("dotenv");
const dev = process.env.NODE_ENV !== "production";
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const asyncHandler = require("express-async-handler");
const auth = require("./handlers/auth");
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

server.get(
  "/api/checkAuth",
  asyncHandler(auth),
  asyncHandler(async function (req, res, next) {
    res.sendStatus(200);
  })
);

server.use("/api", routes);


const options = {
  outDir: "./client/dist",
  cacheDir: "./client/.cache",
}
const bundler = new Bundler("./client/index.html", options);
server.use(bundler.middleware());

server.listen(3000, (err) => {
  if (err) throw err;
  console.log("ready on localhost:3000");
});
