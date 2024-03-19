// Packages
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"; // Cross origin request. As my server running on 3000 and frontend on different port if I not include this then server will give you an error related to cors.

// Node Native Packages
import path from "path";
import { fileURLToPath } from "url";

// Packages defined by developers
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import groupRoutes from "./routes/groups.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";

// Configurations
// -- Path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// -- dotenv
dotenv.config();
// -- Initialize Express App instance
const app = express();
app.use(express.json({limit: "30mb"}));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/groups", groupRoutes);

// Mongoose Setup and listening on port
const PORT = 3000;
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

    // User.insertMany(users);
    // Post.insertMany(posts);
    })
    .catch((error) => console.log(`{error} \n:( Unable to connect!`));