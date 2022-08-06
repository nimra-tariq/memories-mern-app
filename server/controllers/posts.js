import mongoose from "mongoose";
import { PostMessage } from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find({});
    // console.log(postMessages, "message");
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const post = req.body;
    const newPost = await PostMessage.create(post);
    // console.log(newPost, "message");
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error, "error createPost");
    res.status(400).send({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(400).send({ message: "no post for this id" });
    const updatePost = await PostMessage.findByIdAndUpdate(_id, post, {
      new: true,
    });
    return res.status(200).json(updatePost);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(400).send({ message: "no post for this id" });
    const post = await PostMessage.findByIdAndRemove(_id);
    return res.status(200).json(post);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(400).send({ message: "no post for this id" });
    const post = await PostMessage.findById(_id);
    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      { likeCount: post.likeCount + 1 },
      {
        new: true,
      }
    );
    return res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
