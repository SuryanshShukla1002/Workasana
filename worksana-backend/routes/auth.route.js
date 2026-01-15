import express from "express";
import { signup, login, signOut, authenticatedUser } from '../controllers/auth.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", login);
router.post("/signout", signOut);
router.get("/me", verifyToken, authenticatedUser);

export default router;