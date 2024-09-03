import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.ObjectId,
    ref: "users",
  },

  postId: {
    type: mongoose.ObjectId,
    ref: "Posts",
    required: true,
  },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  replies: [
    {
      userId: {
        type: mongoose.ObjectId,
        ref: "users",
        required: true,
      },
      content: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model("Comment", CommentSchema);
