import { Router } from "express";
import users from "./users";
import notes from "./notes";

const router = Router();
router.use("/users", users);
router.use("/notes", notes);

export default router;
