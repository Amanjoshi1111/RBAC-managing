import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function authMiddleware(req: Request, res: Response, next: NextFunction){

    if(req.path.includes('login') || req.path.includes('register')){
        next();
        return;
    }
    const token: string|undefined = req.header('Authentication');
    if(!token){
        res.status(401).json({
            msg: "Invalid Token"
        })
        return;
    }
    try{
        const decodedData : JwtPayload= jwt.verify(token!, process.env.PRIVATE_KEY!) as JwtPayload;
        req.locals = req.locals || {};
        req.locals.id = decodedData.id;
        req.locals.roleId = decodedData.roleId;
        next();
    }catch(err){
        res.status(401).json({
            msg : "Invalid Token"
        })
    }
}