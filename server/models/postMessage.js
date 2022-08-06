import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  message: String,
  creater: String,
  tags: [String],
  selectedFile: String,
  likeCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now() },
});

export const PostMessage = mongoose.model("PostMessage", postSchema);
