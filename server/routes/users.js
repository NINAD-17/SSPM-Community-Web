import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
    updateProfile
} from "../controllers/users.js";

const router = express.Router();

// NOTE: make sure that the more specific routes come before the more general routes.
// Otherwise it will give you errors sometime. As I've defined patch (/:id/edit) at last, it gave me error which took hours to solve that error.

router.patch("/:id/edit", updateProfile);
router.patch("/:id/:friendId", addRemoveFriend);

router.get("/:id/friends", getUserFriends);
router.get("/:id", getUser);

export default router;