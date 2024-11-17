import mongoose, { Schema, model } from "mongoose";
import permissionModel from "../permissions/model";
import { Action } from "../permissions/types";

const roleSchema: Schema = new Schema(
    {
        name: { type: String, unique: true },
        permissions: [{
            _id : false,
            feature : {type: String, required: true},
            actions: {
                type: [String],
                enum : Object.values(Action),
                default: []
            }
        }]
    }
)
const roleModel = model("Role", roleSchema);
export default roleModel;

