import express from "express";
import { createPost, getFeedPosts, getUserPosts, likePost, deletePost } from "../controllers/posts.js";

const router = express.Router();

// READ
router.delete("/:postId", deletePost)
router.get("/", getFeedPosts);
router.get("/:userId/posts", getUserPosts);

// WRITE
router.post("/createpost", createPost);

// UPDATE
router.patch("/:id/likes", likePost);

export default router;