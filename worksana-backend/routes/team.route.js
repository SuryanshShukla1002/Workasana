import express from "express";
import { verifyToken } from '../utils/verifyUser.js';
import { allTeamsGet, createTeam } from '../controllers/team.controller.js';

const router = express.Router();

router.post("/teams", verifyToken, createTeam);
router.get("/teams", verifyToken, allTeamsGet);

export default router;