"use strict";
const env = require("dotenv");
const koa = require("koa");
const cors = require("@koa/cors");
const json = require("koa-json");
const bodyParser = require("koa-bodyparser");
const Router = require("koa-router");
const router = new Router();
const app = new koa();

// .envファイルを使用
env.config();

// corsを許可
app.use(cors());

// jsonを返す場合 pretty-print
app.use(json());

// postのパラメータをctx.request.body に挿入する
app.use(bodyParser());

router.get("/", (ctx, next) => {
  ctx.body = "hello, server";
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env.PORT || 3000, () => console.log(process.env.PORT));
