import { Router } from "express";
import asyncHandler from "express-async-handler";
import * as notes from "../handlers/notes";


const router = Router();

router.get("/:account", asyncHandler(notes.get));
router.delete("/", asyncHandler(notes.remove));

export default router;