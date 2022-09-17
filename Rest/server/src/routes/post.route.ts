import express from "express";
const router = express.Router();
import {
  CreatePost,
  deletePost,
  fetchPost,
  fetchPosts,
  editPost,
  deletePostImage,
} from "../controller/post.controller";
import { isAuthenticated } from "../utils/auth";
import { postImageHandler } from "../utils/imageUpload";

router.post("/uploadPost", isAuthenticated, postImageHandler, CreatePost);
router.put("/editPost/:id", isAuthenticated, postImageHandler, editPost);
router.get("/getPost", isAuthenticated, fetchPost);
router.get("/getPosts", isAuthenticated, fetchPosts);
router.delete("/deletePost/:id", isAuthenticated, deletePost);
router.delete(
  "/deletePostImage/:id/:imageId",
  isAuthenticated,
  deletePostImage
);

export default router;
