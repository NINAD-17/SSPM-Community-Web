// Packages
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
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
import { createPost } from "./controllers/posts.js";
import { createGroupPost } from "./controllers/groups.js";
import { updateProfile } from "./controllers/users.js";

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
// app.use(express.static('public'));
app.use("/posts", express.static(path.join(__dirname, "public/posts"), {
  setHeaders: function (res, path) {
    res.type('png')
  }}));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/posts");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

const groupPostStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/groupPosts");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const uploadGroupPost = multer({ storage: groupPostStorage });

app.use("/groupPosts", express.static(path.join(__dirname, "public/groupPosts"), {
  setHeaders: function (res, path) {
    res.type('png')
  }
}));

const profileImgStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/profileImages");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const uploadProfileImage = multer({ storage: profileImgStorage })

app.use("/profileImages", express.static(path.join(__dirname, "public/profileImages"), {
  setHeaders: function (res, path) {
    res.type('png')
  }
}));


// Routes
app.post("/posts/createpost", upload.single("picture"), createPost);
app.post("/groups/:groupId/create-post", uploadGroupPost.single("picture"), createGroupPost);
app.patch("/users/:id/edit", uploadProfileImage.single("picture"), updateProfile);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/groups", groupRoutes);

// Mongoose Setup and listening on port
const PORT = 3000;
mongoose.connect("mongodb://127.0.0.1:27017/sspmcommunitydev") //mongodb://127.0.0.1:27017/sspmcommunitydev //process.env.MONGO_URL
    .then(() => {
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

    // User.insertMany(users);
    // Post.insertMany(posts);
    })
    .catch((error) => console.log(`{error} \n:( Unable to connect!`));