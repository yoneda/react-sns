const express = require("express");
const next = require("next");
const env = require("dotenv");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev, dir: "./client" });
const handle = nextApp.getRequestHandler();

const db = require("./db");
const asyncHandler = require('express-async-handler');

nextApp
  .prepare()
  .then(() => {
    // .envファイルを使用
    env.config();
    console.log(env.config());

    const server = express();

    // api を定義
    server.get("/api/helth", (req, res) => {
      res.send({ val: "OK" });
    });

    // async/await 構文を用いた遅延処理
    server.get("/api/users", asyncHandler(async(req, res, next) => {
      const users = await db.select().from("users");
      res.send(users);
    }));

    // その他はすべてNextのrouterに飛ばす
    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log("ready on localhost:3000");
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
