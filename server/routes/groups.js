import express from "express";
import { createGroup, getGroups, getGroupInfo, getGroupPosts, joinOrLeaveGroup, createGroupPost, deletePost, likePost } from "../controllers/groups.js";

const router = express.Router();

router.get("/", getGroups);
router.patch("/posts/:postId/likes", likePost)
router.delete("/post/:postId/delete", deletePost);
router.patch("/:groupId/member/:userId", joinOrLeaveGroup);
router.post("/:groupId/create-post", createGroupPost);
router.get("/:groupId/posts", getGroupPosts);
router.get("/:groupId", getGroupInfo);
router.post("/create-group", createGroup);

export default router;