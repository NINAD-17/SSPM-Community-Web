import express from "express";
import { createGroup, getGroups } from "../controllers/groups.js";

const router = express.Router();

router.get("/", getGroups);
router.post("/create-group", createGroup);

export default router;