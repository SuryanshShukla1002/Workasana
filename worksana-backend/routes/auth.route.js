import express from "express";
import { signup, login, signOut } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", login);
router.post("/signout", signOut);

export default router;