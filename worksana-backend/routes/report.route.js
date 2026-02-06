import express from "express";
import { verifyToken } from '../utils/verifyUser.js';
import {
    lastWeekReport,
    pendingReport,
    closedTasksReport
} from '../controllers/report.controllr.js';

const router = express.Router();

router.get("/last-week", verifyToken, lastWeekReport);
router.get("/pending", verifyToken, pendingReport);
router.get("/closed-tasks", verifyToken, closedTasksReport);

export default router;