const { Router } = require("express");
const asyncHandler = require("express-async-handler");
const auth = require("../handlers/auth");
const users = require("../handlers/users");

const router = Router();

router.get("/", asyncHandler(auth), asyncHandler(users.get));
router.post("/", asyncHandler(users.post));
router.put("/", asyncHandler(auth), asyncHandler(users.put));
router.delete("/", asyncHandler(auth), asyncHandler(users.remove));

router.post("/login", asyncHandler(users.login));
router.post("/logout", asyncHandler(auth), users.logout);

// TODO: handlersはexpressのミドルウェアの集まりと解釈をしてasyncHandlerはhandlers側に寄せる

module.exports = router;
