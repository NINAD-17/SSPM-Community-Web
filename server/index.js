// Packages
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Node Native Packages
import path from "path";
import { fileURLToPath } from "url";

// Configurations
// -- Path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// -- dotenv
dotenv.config();
// -- Initialize Express App instance
const app = express();

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// Mongoose Setup and listening on port
const PORT = 3000;
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
    })
    .catch((error) => console.log(`{error} \n:( Unable to connect!`));