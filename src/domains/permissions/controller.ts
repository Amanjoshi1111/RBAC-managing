import { Request, Response, response } from "express"
import permissionModel from "./model"
import { Action, Permission } from "../permissions/types";
import roleModel from "../roles/model";

export async function getAllPermissions(req: Request, res: Response) {
    try {
        const allPermissionsData = await permissionModel.find();
        res.status(200).json(allPermissionsData);
    } catch (err) {
        res.status(500).json({
            msg: err
        })
    }
}

export async function getPermissionById(req: Request, res: Response) {
    try {
        const permissionData = permissionModel.findById(req.params.id);
        res.status(200).json(permissionData);
    } catch (err) {
        res.status(500).json({
            msg: err
        })
    }
}

export async function createPermission(req: Request, res: Response) {
    try {
        const permisionData = new permissionModel(req.body);
        await permisionData.save();

        //Push this permission in admin role as well
        const adminData = await roleModel.updateOne({ name: "admin" }, { $addToSet: { permissions: permisionData } });

        res.status(200).json({
            msg: "new permission created"
        })
    } catch (err) {
        res.status(500).json({
            msg: err
        })
    }
}

export async function updatePermission(req: Request, res: Response) {
    try {
        const updatedData = await permissionModel.findByIdAndUpdate(req.query.id, req.body);
        if (!updatedData) {
            res.status(400).json({
                msg: "No such document found"
            })
            return;
        }
        console.log("updatedData : ", updatedData );
        const updateRolePermissions = await roleModel.updateMany(
            { "permissions.feature": updatedData.feature },
            { $set: { "permissions.$": req.body } }
        )
        
        res.status(200).json({
            msg : `Document Updated, ${updateRolePermissions.modifiedCount} role updated as well`
        })

    } catch (err) {
        res.status(500).json({
            msg: err
        })
    }
}

export async function deletePermission(req: Request, res: Response){
    try {
        const deletedData = await permissionModel.findByIdAndDelete(req.query.id);
        if (!deletedData) {
            res.status(400).json({
                msg: "No such document found"
            })
            return;
        }
        const deletedRolePermissions = await roleModel.updateMany(
            { "permissions.feature": deletedData.feature },
            { $pull: { "permissions": {"feature": deletedData.feature}}}
        )
        
        res.status(200).json({
            msg : `Document Deleted, ${deletedRolePermissions.modifiedCount} role updated as well`
        })

    } catch (err) {
        res.status(500).json({
            msg: err
        })
    }
}