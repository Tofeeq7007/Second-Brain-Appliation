import type { NextFunction , Request,Response} from "express";
import jwt, { type JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from "./config.js";
export const userMiddleware = (req:Request,res:Response,next:NextFunction)=>{
    try {
        const header = req.headers["authorization"];
        
        if (!header) {
            return res.status(401).json({
                message: "Authorization header missing"
            });
        }
        
        // Remove 'Bearer ' prefix if present
        const token = header.startsWith('Bearer ') ? header.slice(7) : header;
        
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            
            if (typeof decoded === "string") {
                return res.status(403).json({
                    message: "Invalid token format"
                });
            }
            
            req.userId = (decoded as JwtPayload).id;
            next();
        } catch (error) {
            console.error("JWT verification error:", error);
            return res.status(401).json({
                message: "Invalid or expired token"
            });
        }
    } catch (error) {
        console.error("Middleware error:", error);
        return res.status(500).json({
            message: "Server error in authentication"
        });
    }
}