import mongoose, { Schema, model, mongo } from "mongoose";

enum Category{
    testing = 'testing',
    prod = "prod"
}

const postSchema: Schema = new Schema(
    {
        title: { type: String, reqired: true , unique: true},
        description: { type: String, required: true },
        category: {type: [String], enum : Object.values(Category), required: true}
    }
)

const postModel = model("Post", postSchema);
export default postModel;

