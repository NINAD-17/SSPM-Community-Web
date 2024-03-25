import express from "express";
import { createGroup, getGroups, getGroupInfo, getGroupPosts } from "../controllers/groups.js";

const router = express.Router();

router.get("/", getGroups);
router.get("/:groupId/posts", getGroupPosts);
router.get("/:groupId", getGroupInfo);
router.post("/create-group", createGroup);

export default router;