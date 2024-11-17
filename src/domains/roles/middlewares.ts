import { NextFunction, Request, Response } from "express";
import roleModel from "./model";

// export async function isRoleValid(req: Request, res: Response, next: NextFunction) {
//     try {
//         const { roleId } = req.body;
//         if (!roleId) {
//             res.status(400).json({
//                 msg: "field 'roleId' missing"
//             })
//             return;
//         }
//         const roleData = await roleModel.findById(roleId);
//         if (!roleData) {
//             res.status(400).json({
//                 msg: "No such role exists"
//             })
//             return;
//         }
//         req.locals.roleName= roleData.name;
//         next();
//     } catch (err) {
//         res.status(500).json({
//             msg: err
//         })
//     }
// }