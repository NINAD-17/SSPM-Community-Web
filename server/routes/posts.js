import express from "express";
import { createPost, getFeedPosts, getUserPosts, likePost, deletePost, createComment, deleteComment } from "../controllers/posts.js";

const router = express.Router();

// READ
router.delete("/:postId", deletePost)
router.get("/", getFeedPosts);
router.get("/:userId/posts", getUserPosts);

// WRITE
// router.post("/createpost", upload.single("picture"), createPost);

// UPDATE
router.patch("/:id/likes", likePost);

// comments:
router.patch("/:id/create-comment", createComment);
router.delete("/:postId/:commentId/delete-comment", deleteComment);

export default router;