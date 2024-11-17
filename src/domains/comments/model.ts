import mongoose, { Schema, model } from "mongoose";

const commentSchema: Schema = new Schema(
    {
        userId: { type: mongoose.Types.ObjectId, required: true, ref : 'User'},
        postId: {type: mongoose.Types.ObjectId, required: true, ref: "Post"},
        comment: {type: mongoose.Types.ObjectId, required: true}
    }
)

const commentModel = model("Comment", commentSchema);
export default commentModel;

