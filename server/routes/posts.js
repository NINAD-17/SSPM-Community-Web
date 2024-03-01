import express from "express";
import { createPost, deletePost, getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";

const router = express.Router();

// READ
router.get("/", getFeedPosts);
router.get("/:userId/posts", getUserPosts);

// WRITE
router.post("/createpost", createPost);

// UPDATE
router.patch("/:id/like", likePost);

// DELETE
router.delete("/:id/delete-post", deletePost);

export default router;