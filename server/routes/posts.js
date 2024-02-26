import express from "express";
import { createPost, getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";

const router = express.Router();

// READ
router.get("/", getFeedPosts);
router.get("/:userId/posts", getUserPosts);

// WRITE
router.post("/createpost", createPost);

// UPDATE
router.patch("/:id/like", likePost);

export default router;