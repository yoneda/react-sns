const express = require("express");
const next = require("next");
const env = require("dotenv");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev, dir: "./client" });
const handle = nextApp.getRequestHandler();

const db = require("./db");
const asyncHandler = require("express-async-handler");
import routes from "./routes";

import getUserData from "./util/getUser";

nextApp
  .prepare()
  .then(() => {
    // .envファイルを使用
    env.config();

    const server = express();

    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));

    // api を定義
    server.get("/api/helth", (req, res) => {
      res.send({ val: "not ok" });
    });

    const sleep = () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("ok");
        }, 1000);
      });

    server.get(
      "/continue",
      asyncHandler(async (req, res, next) => {
        await sleep();
        console.log("hello");
        next();
      }),
      asyncHandler(async (req, res, next) => {
        await sleep();
        console.log("world");
        next();
      }),
      asyncHandler(async (req, res, next) => {
        await sleep();
        console.log("express");
        res.send("javascript");
      })
    );

    server.use("/api", routes);

    // その他はすべてNextのrouterに飛ばす
    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.post("/bodyTest", (req, res, next) => {
      console.log(req.body);
      console.log("hogehoge");
      res.send("aa");
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
