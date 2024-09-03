import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import postRoutes from "./routes/postRoutes.js";
import postComment from "./routes/postCommentRoute.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Configuring __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configure env
dotenv.config();

// Database configuration
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/comment", postComment);

// Serving static files
app.use(express.static(path.resolve(__dirname, "client", "build")));
app.get("*", (req, resp) => {
  resp.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// Port configuration
const PORT = process.env.PORT || 8080;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
