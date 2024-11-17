import { NextFunction, Request, Response } from "express";
import roleModel from "../domains/roles/model";

const authorizeByFeature = (featureName: string) => async (req: Request, res: Response, next: NextFunction) => {
    console.log("authorizeByFeature 1");
    const roleId = req.locals.roleId;
    const roleData = await roleModel.findById(roleId);
    if(!roleData){
        res.status(400).json({
            msg : "Invalid roleId"
        })
        return;
    }
    const permissions: [Record<string, any>]= roleData.permissions as [Record<string, any>];
    const actionMap : Map<string, string>= new Map([
        ["GET","get"],
        ["POST", "create"],
        ["PUT", "update"],
        ["DELETE", "delete"]
    ]);

    const actionType = actionMap.get(req.method);
    const havePermission = permissions.some(permission => {
        return permission.feature == featureName && permission.actions.includes(actionType);
    })
    console.log({havePermission});
    if(havePermission){
        return next();
    }
    
    res.status(400).json({
        msg : "Unauthorized access"
    })
}

export default authorizeByFeature;