import { NextFunction, Request, Response } from "express";
import permissionModel from "./model";
import { Permission } from "./types";

export async function arePermissionsValid(req: Request, res: Response, next: NextFunction) {
    try {

        const { permissions } = req.body;
        if (permissions.length == 0) {
            next();
        }

        const conditions = [];
        for (let permission of permissions) {
            conditions.push({
                feature: permission.feature,
                actions: { $all: permission.actions }
            })
        }

        const result = await permissionModel.find({ $or: conditions });
        if (result.length != permissions.length) {
            res.status(400).json({
                msg: "Invalid permission"
            })
            return;
        }
        next();
    } catch (err) {
        res.status(500).json({
            msg: err
        })
    }
}