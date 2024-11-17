import { Router } from "express";
import { createRole, getAllRoles, getRoleById, updateRole } from "./controller";
import { arePermissionsValid } from "../permissions/middlewares";

const roleRouter = Router();

roleRouter.get("/:id", getRoleById);
roleRouter.route("/")
    .get(getAllRoles)
    .post(arePermissionsValid,createRole)
    .put(arePermissionsValid, updateRole)

export default roleRouter;