import express from "express";
import { addNewTags, fetchAllTags } from '../controllers/tag.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/tags", verifyToken, addNewTags);
router.get("/tags", verifyToken, fetchAllTags);

export default router;