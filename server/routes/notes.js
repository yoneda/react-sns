const { Router } = require("express");
const asyncHandler = require("express-async-handler");
const notes = require("../handlers/notes");
const auth = require("../handlers/auth");

const router = Router();

router.get("/", asyncHandler(auth), asyncHandler(notes.get));
router.post("/", asyncHandler(auth), asyncHandler(notes.post));
router.put("/:id", asyncHandler(auth), asyncHandler(notes.put));
router.delete("/garbage", asyncHandler(auth), asyncHandler(notes.tidyGarbage));
router.delete("/:id", asyncHandler(auth), asyncHandler(notes.remove));

router.put("/:id/trash", asyncHandler(auth), asyncHandler(notes.trash));
router.put("/:id/restore", asyncHandler(auth), asyncHandler(notes.restore));

module.exports = router;
