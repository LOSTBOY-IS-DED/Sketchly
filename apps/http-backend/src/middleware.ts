import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

interface AuthRequest extends Request {
    userId?: string;
  }

export function authMiddleware(req : AuthRequest , res : Response , next : NextFunction){

    try{
        const token = req.headers.authorization?.split(" ")[1] ;
        if(!token){
            res.status(401).json({
                message : "No token provided"
            })
        }else{
            const decoded = JWT.verify(token , JWT_SECRET) as {userId : string} ;
            if(!decoded){
                res.status(401).json({
                    message : "Invalid token"
                })
            }else{
                req.userId = decoded.userId ;
                next();
            }
        }
    }catch(error){
        res.status(500).json({
            message : "Something went wrong in auth middleware"
        })
    }

}