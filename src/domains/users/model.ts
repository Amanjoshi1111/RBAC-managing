import mongoose, { Schema, model, mongo } from "mongoose";

const userSchema: Schema = new Schema(
    {
        username: { type: String, reqired: true, lowercase: true, unique: true },
        password: { type: String, required: true },
        roleId: { type: mongoose.Schema.ObjectId, required: true , ref : "Role"}
    }
)

const userModel = model("User", userSchema);
export default userModel;

