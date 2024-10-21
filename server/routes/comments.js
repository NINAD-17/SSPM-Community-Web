import express from "express";
import { createComment, fetchComments } from "../controllers/comments.js";

const router = express.Router();

router.get("/:postId/get-comments", fetchComments);

router.post("/:postId/create-comment", createComment)

export default router;