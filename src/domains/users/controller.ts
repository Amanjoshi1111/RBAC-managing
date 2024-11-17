import { Request, Response } from "express";
import userModel from "./model";
import roleModel from "../roles/model";
import jwt from "jsonwebtoken"

export async function loginUser(req: Request, res: Response){

    const {username, password} = req.body;
    const userData = await userModel.findOne({username});
    if(!userData){
        res.status(400).json({
            msg : "INVALID CREDENTIALS"
        })
    }

    if(userData?.password != password){
        res.status(400).json({
            msg: "INVALID CREDENTIALS"
        })
    }

    const roleData = await roleModel.findOne({_id : userData?.roleId});
    if(!roleData){
        res.status(400).json({
            msg: "NO ACCESS OR ACCESS REVOKED"
        })
    }

    const token = jwt.sign({id : userData?._id, roleId : roleData?._id}, process.env.PRIVATE_KEY!);
    res.status(200).json({
        msg: "LOGIN SUCCESSFUL",
        token : token
    })
}

export async function registerUser(req: Request,res: Response){
    const userRoleData = await roleModel.findOne({name : "user"});
    const {username, password} = req.body;
    if(!userRoleData){
        res.status(400).json({
            msg : "cannot create user, contact backend team"
        })
        return;
    }
    await userModel.create({
        username,
        password,
        roleId: userRoleData._id
    })
    res.status(200).json({
        msg : "User registered!!"
    })
}

export async function getUserById(req: Request, res: Response){
    try{
        const userData = await userModel.findById(req.query.id);
        res.status(200).json(userData);
    }catch(err){
        res.status(500).json({
            msg : err
        })
    }
}

export async function getUsers(req: Request, res: Response){
    try{
        const userData = await userModel.find()
        res.status(200).json(userData);
    }catch(err){
        res.status(500).json({
            msg : err
        })
    }
}

export async function createUser(req: Request, res: Response){
    try{
        const {username, password, roleId} = req.body;
        const userData = await userModel.create({username, password, roleId})
        res.status(200).json({
            msg : "User created"
        })

    }catch(err){
        res.status(500).json({
            msg : err
        })
    }
}

export async function updatedUser(req: Request, res: Response){
    try{
        const {username, roleId} = req.body;

        const userData = await userModel.findByIdAndUpdate(req.query.id, {username, roleId});
        if(!userData){
            res.status(400).json({
                msg : "Document not found"
            })
            return;
        }
        res.status(200).json({
            msg : "User Updated"
        })

    }catch(err){
        res.status(500).json({
            msg : err
        })
    }
}

export async function deleteUser(req: Request, res: Response){
    try{
        const userData = await userModel.findByIdAndDelete(req.query.id);
        if(!userData){
            res.status(400).json({
                msg : "Document not found"
            })
            return;
        }
        res.status(200).json({
            msg : "User Deleted"
        })

    }catch(err){
        res.status(500).json({
            msg : err
        })
    }
}