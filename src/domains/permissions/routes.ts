import { Router } from "express";
import { createPermission, deletePermission, getAllPermissions, getPermissionById, updatePermission } from "./controller";

const permissionRouter = Router();

permissionRouter.get("/:id", getPermissionById);
permissionRouter.route("/")
    .get(getAllPermissions)
    .post(createPermission)
    .put(updatePermission)
    .delete(deletePermission)

export default permissionRouter;