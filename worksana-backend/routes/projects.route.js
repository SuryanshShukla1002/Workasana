import express from "express";
import { getAllProject, newProject } from '../controllers/projects.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/projects", verifyToken, newProject);
router.get("/projects", verifyToken, getAllProject);

export default router;