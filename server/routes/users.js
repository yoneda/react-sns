import { Router } from "express";
import asyncHandler from "express-async-handler";
import * as users from "../handlers/users";

const router = Router();

router.get("/:account", asyncHandler(users.get));
router.post("/", asyncHandler(users.post));
router.put("/:account", asyncHandler(users.put));
router.delete("/:account", asyncHandler(users.remove));

export default router;