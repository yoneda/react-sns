import { Router } from "express";
import asyncHandler from "express-async-handler";
import auth from "../handlers/auth";
import * as users from "../handlers/users";

const router = Router();

router.get("/", asyncHandler(auth), asyncHandler(users.get));
router.post("/", asyncHandler(users.post));
router.put("/:account", asyncHandler(users.put));
router.delete("/:account", asyncHandler(users.remove));

router.post("/login", asyncHandler(users.login));
router.post("/logout", users.logout);

// TODO: handlersはexpressのミドルウェアの集まりと解釈をしてasyncHandlerはhandlers側に寄せる

export default router;
