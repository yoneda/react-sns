import { Router } from "express";
import asyncHandler from "express-async-handler";
import * as users from "../handlers/users";


const router = Router();

router.get("/", asyncHandler(users.get));

router.delete("/", asyncHandler(users.remove));

export default router;