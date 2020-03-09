import { Router } from "express";
import asyncHandler from "express-async-handler";
import * as notes from "../handlers/notes";


const router = Router();

router.get("/", asyncHandler(notes.get));
router.delete("/:id", asyncHandler(notes.remove));

export default router;