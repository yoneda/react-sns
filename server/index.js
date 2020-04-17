const express = require("express");
const next = require("next");
const env = require("dotenv");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev, dir: "./client" });
const handle = nextApp.getRequestHandler();
import routes from "./routes";
import cookieParser from "cookie-parser";
import asyncHandler from "express-async-handler";
import auth from "./handlers/auth";

nextApp
  .prepare()
  .then(() => {
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
      "/check",
      asyncHandler(auth),
      asyncHandler(async function (req, res, next) {
        res.sendStatus(200);
      })
    );

    server.use("/api", routes);

    // その他はすべてNextのrouterに飛ばす
    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log("ready on localhost:3000");
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
