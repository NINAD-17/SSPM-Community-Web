import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend
} from "../controllers/users.js";

const router = express.Router();

// Read Routes: Routes from which grab information and not saving anything to database
router.get("/:id", getUser);
router.get("/:id/friends", getUserFriends);

// Update Routes:
router.patch("/:id/:friendId", addRemoveFriend);

export default router;