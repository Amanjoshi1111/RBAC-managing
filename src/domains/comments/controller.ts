import { Request, Response } from "express";
import commentModel from "./model";

export async function createComment(req: Request, res: Response){
    const {comment} = req.body;
    const {postId, userId} = req.query;
    const postComments = await commentModel.create({
        postId,
        userId,
        comment
    })
    res.status(200).json({
        msg : "Comment added"
    })
}

export async function getPostComments(req: Request, res: Response){
    const {postId, userId} = req.query;
    const postComments = await commentModel.find({
        postId,
        userId,
    })
    res.status(200).json(postComments);
}

export async function editComment(req: Request, res: Response){
    const {comment} = req.body;
    const updateComment = await commentModel.findByIdAndUpdate(req.query.id, {$set : {comment : comment}});
    if(!updateComment){
        res.status(400).json({
            msg : "No record found"
        })
        return;
    }
    res.status(200).json({
        msg : "Comment added"
    })
}

export async function deleteComment(req: Request, res: Response){
    const {comment} = req.body;
    const deletedComment = await commentModel.findByIdAndDelete(req.query.id);
    if(!deletedComment){
        res.status(400).json({
            msg : "No record found"
        })
        return;
    }
    res.status(200).json({
        msg : "Comment deleted"
    })
}