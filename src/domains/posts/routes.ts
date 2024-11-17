import { Router } from "express";
import { createPost, deletePost, getAllPosts, getPostById, updatePost } from "./controller";
import asyncHandler from "../../utils/asyncHandler";

const postRouter = Router();

postRouter.get('/:', getPostById);
postRouter.route("/")
    .get(asyncHandler(getAllPosts))
    .post(asyncHandler(createPost))
    .put(asyncHandler(updatePost))
    .delete(asyncHandler(deletePost))

export default postRouter;