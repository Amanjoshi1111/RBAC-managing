import { Request, Response } from "express";
import postModel from "./model";

export async function getAllPosts(req: Request, res: Response) {
    console.log("getAllPosts 1");
    const postData = await postModel.find();
    res.status(200).json(postData);
}

export async function getPostById(req: Request, res: Response){
    const postData =await postModel.findById(req.query.id);
    res.status(200).json(postData);
}

export async function createPost(req: Request, res: Response){
    const {title, description, category} = req.body;
    const postData = new postModel({
        title,
        description,
        category
    })
    const data = await postData.save();
    res.status(200).json({
        msg : "Created successfully"
    })
}

export async function updatePost(req: Request, res: Response){
    const {title, description, category} = req.body;
    const updatedData = await postModel.findByIdAndUpdate(req.query.id, {
        $set : {
            title,
            description,
            category
        }
    })
    if(!updatedData){
        res.status(400).json({
            msg : "No record found"
        })
        return;
    }
    res.status(200).json({
        msg : "Successfully updated"
    })
}

export async function deletePost(req: Request, res: Response){
    const deletedData = await postModel.findByIdAndDelete(req.query.id)
    if(!deletedData){
        res.status(400).json({
            msg : "No record found"
        })
        return;
    }
    res.status(200).json({
        msg : "Successfully deleted"
    })
}