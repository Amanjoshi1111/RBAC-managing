import roleModel from "./model";
import userModel from "../users/model";
import { Request, Response } from "express";

export async function getAllRoles(req: Request, res: Response) {
    try {
        const allRolesData = await roleModel.find();
        res.status(200).json(allRolesData);
    } catch (err) {
        res.status(500).json({
            msg: err
        })
    }
}

export async function getRoleById(req: Request, res: Response) {
    try {
        const roleData = await roleModel.findById(req.params.id);
        res.status(200).json(roleData);
    } catch (err) {
        res.status(500).json({
            msg: err
        })
    }
}

export async function createRole(req: Request, res: Response) {
    try {
        const { name, permissions } = req.body;

        const roleData = new roleModel({ name, permissions });
        await roleData.save();

        res.status(200).json({
            msg: "Role created"
        })

    } catch (err) {
        res.status(500).json({
            msg: err
        })
    }
}

export async function updateRole(req: Request, res: Response) {
    try {
        const { name, permissions } = req.body;

        const roleData = await roleModel.findByIdAndUpdate(req.query.id, { $set: { name: name, permissions: permissions } });
        if (!roleData) {
            res.status(404).json({
                msg: "Role Not Found"
            })
        }
        res.status(200).json({
            msg: "Role Updated"
        })
    } catch (err) {
        res.status(500).json({
            msg: err
        })
    }
}

export async function deleteRole(req: Request, res: Response) {
    try {
        const userWithGivenRole = await userModel.find({ roleId: req.query.id });
        if (userWithGivenRole.length != 0) {
            res.status(400).json({
                msg: "Role in use, cannot delete"
            })
            return;
        }
        const roleData = await roleModel.findByIdAndDelete(req.query.id);
        if(!roleData){
            res.status(404).json({
                msg : "Role Not Found"
            })
        }
        res.status(200).json({
            msg: "Role Deleted"
        })
    } catch (err) {
        res.status(500).json({
            msg: err
        })
    }
}