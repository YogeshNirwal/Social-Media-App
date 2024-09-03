import express from "express";
import {
  createCommentController,
  deletecommentController,
  getcommentController,
  getEditcommentController,
  getReplycommentController,
} from "../controllers/commentControllers.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

//routes

//create comment
router.post("/create-comment", requireSignIn, createCommentController);

//get comments
router.get("/get-comment/:pid", getcommentController);

//delete comment
router.delete("/delete-comment/:cid", requireSignIn, deletecommentController);

//Edit comment
router.put("/edit-comment/:cid", requireSignIn, getEditcommentController);

//reply comment
router.post("/reply-comment/:cid", requireSignIn, getReplycommentController);

export default router;
