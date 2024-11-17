import { Router } from "express";
import dotenv from "dotenv";
import { createUser, deleteUser, getUserById, getUsers, loginUser, registerUser, updatedUser } from "./controller";
import asyncHandler from "../../utils/asyncHandler";
dotenv.config();

const userRouter = Router();

userRouter.post("/login", asyncHandler(loginUser));
userRouter.post("/register", asyncHandler(registerUser));
userRouter.get("/:id", asyncHandler(getUserById));
userRouter.route("/")
    .get(asyncHandler(getUsers))
    .put(asyncHandler(updatedUser))
    .delete(asyncHandler(deleteUser))

export default userRouter;