// It contain all routes related to authentication
import express from "express";
import { register, login } from "../controllers/auth.js";

const router = express.Router(); // // This will allow express to identify that these routes will all be configured and allows us to have it in a separate file.

// Register
router.post("/register", register);

// Login
router.post("/login", login);

export default router;