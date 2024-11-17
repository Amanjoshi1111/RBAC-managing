import { Router } from "express";
import userRouter from "../domains/users/routes";
import roleRouter from "../domains/roles/routes";
import permissionRouter from "../domains/permissions/routes";
import postRouter from "../domains/posts/routes";
import commentRouter from "../domains/comments/routes";
import { authMiddleware } from "../domains/users/middlewares";
import { loginUser, registerUser } from "../domains/users/controller";
import authorizeByFeature from "../utils/authorizationMiddleware";
import asyncHandler from "../utils/asyncHandler";

const routes = Router();

routes.use("/login", loginUser);
routes.use("/register", registerUser);
routes.use("/user",authMiddleware,authorizeByFeature("user"), userRouter);
routes.use("/role",authMiddleware,authorizeByFeature("role"), roleRouter);
routes.use("/permission",authMiddleware, authorizeByFeature("permission"), permissionRouter);
routes.use("/post",authMiddleware,authorizeByFeature("post"), postRouter);
routes.use("/comment",authMiddleware,authorizeByFeature("comment"), commentRouter);

export default routes;