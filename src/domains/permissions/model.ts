import { Schema, model } from "mongoose";
import { Action } from "./types";

const permissionSchema: Schema = new Schema(
    {
        feature: {type: String, require: true, unique: true},
        actions : {type: [String], enum : Object.values(Action), default : []}
    }
)

const permissionModel = model("Permission", permissionSchema);
export default permissionModel;

