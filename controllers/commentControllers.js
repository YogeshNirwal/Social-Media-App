import commentModel from "../models/commentModel.js";

import dotenv from "dotenv";

dotenv.config();

//create comment

export const createCommentController = async (req, res) => {
  try {
    const { userId, postId, content } = req.body;
    const comment = await new commentModel({
      userId,
      postId,
      content,
    }).save();

    res.status(201).send({
      success: true,
      message: "comment Created Successfully",
      comment,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      success: false,
      message: "Error creating comment",
      error: error.message,
    });
  }
};

export const getcommentController = async (req, res) => {
  try {
    const comments = await commentModel
      .find({ postId: req.params.pid })
      .populate("userId", "name")
      .populate({
        path: "replies.userId",
        select: "name",
      })
      .sort({ createdAt: -1 });

    if (comments) {
      res.status(201).send({
        success: true,
        message: "Comments retrieved successfully",
        comments,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "No comments found",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      success: false,
      message: "Error in getting comments",
      error: error.message,
    });
  }
};

//delet comment controller

export const deletecommentController = async (req, res) => {
  try {
    await commentModel.findByIdAndDelete(req.params.cid);
    res.status(201).send({
      success: true,
      message: "comment deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      success: false,
      message: "Error in delete conent",
      error: error.message,
    });
  }
};

//edit comment controller

export const getEditcommentController = async (req, res) => {
  try {
    const updateComment = await commentModel.findByIdAndUpdate(req.params.cid, {
      content: req.body.content,
    });
    res.status(200).send({
      success: true,
      message: "comment update successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      success: false,
      message: "error in edit comment",
      error: error.message,
    });
  }
};

//edit comment controller

export const getReplycommentController = async (req, res) => {
  try {
    const { userId, content } = req.body;
    if (!userId || !content) {
      return res.status(400).send({
        success: false,
        message: "userId and content are required",
      });
    }

    const comment = await commentModel.findById(req.params.cid);
    if (comment) {
      comment.replies.push({ userId, content });
      await comment.save();
      res.status(200).send({
        success: true,
        message: "Reply added successfully",
        comment,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Comment not found",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      success: false,
      message: "Error in replying to comment",
      error: error.message,
    });
  }
};
