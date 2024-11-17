import { Router } from "express";
import { createComment, deleteComment, editComment, getPostComments } from "./controller";
import asyncHandler from "../../utils/asyncHandler";

const commentRouter = Router();

commentRouter.route("/")
    .get(asyncHandler(getPostComments))
    .post(asyncHandler(createComment))
    .put(asyncHandler(editComment))
    .delete(asyncHandler(deleteComment));

export default commentRouter;