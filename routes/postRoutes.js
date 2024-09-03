import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import ExpressFormidable from "express-formidable";
import {
  createPostController,
  deletePostController,
  getpostController,
  getSinglePostController,
  postPhotoController,
} from "../controllers/postControllers.js";

const router = express.Router();

//routes

//create post
router.post(
  "/create-post",
  requireSignIn,
  ExpressFormidable(),
  createPostController
);

//get posts
router.get("/get-post", getpostController);

//get photo
router.get("/post-photo/:pid", postPhotoController);

//delete post
router.delete("/delete-post/:pid", deletePostController);
//single post
router.get("/get-post/:pid", getSinglePostController);

export default router;
