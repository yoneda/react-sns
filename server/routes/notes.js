const { Router } = require("express");
const asyncHandler = require("express-async-handler");
const notes = require("../handlers/notes");

const router = Router();

router.get("/", asyncHandler(notes.get));
router.post("/", asyncHandler(notes.post));
router.put("/:id", asyncHandler(notes.put));
router.delete("/:id", asyncHandler(notes.remove));

module.exports = router;
