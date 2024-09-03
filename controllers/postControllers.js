import postModel from "../models/postModel.js";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

export const createPostController = async (req, res) => {
  try {
    const { name, description } = req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !photo:
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const post = new postModel({ ...req.fields });
    if (photo) {
      post.photo.data = fs.readFileSync(photo.path);
      post.photo.contentType = photo.type;
    }
    await post.save();
    res.status(201).send({
      success: true,
      message: "post Created Successfully",
      post,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      success: false,
      message: "Error creating post",
      error: error.message,
    });
  }
};

//get all posts
export const getpostController = async (req, res) => {
  try {
    const post = await postModel
      .find({})
      .select("-photo")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: post.length,
      message: "ALlpost ",
      post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting post",
      error: error.message,
    });
  }
};

export const postPhotoController = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.pid).select("photo");
    if (post.photo.data) {
      res.set("content-type", post.photo.contentType);
      return res.status(200).send(post.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in Photo controller",
      error,
    });
  }
};

//delete controller
export const deletePostController = async (req, res) => {
  try {
    await postModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "post Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting post",
      error,
    });
  }
};

// get single post
export const getSinglePostController = async (req, res) => {
  try {
    const post = await postModel
      .findOne({ _id: req.params.pid })
      .select("-photo");
    res.status(200).send({
      success: true,
      message: "Single post Fetched",
      post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single post",
      error,
    });
  }
};
