import { Router } from "express";
import asyncHandler from "express-async-handler";
import * as notes from "../handlers/notes";


const router = Router();

router.get("/", asyncHandler(notes.get));
router.post("/", asyncHandler(notes.post));
router.put("/", asyncHandler(notes.put));
router.delete("/:id", asyncHandler(notes.remove));

export default router;