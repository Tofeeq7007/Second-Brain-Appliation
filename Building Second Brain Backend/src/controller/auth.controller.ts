import { UserModel } from "../db.js";
import type { Request,Response } from "express";
import { JWT_SECRET } from "../config.js";
import jwt from 'jsonwebtoken'
import z, { check, string } from 'zod'
import bcrypt from "bcryptjs";

export const user_signUp = async (req:Request,res:Response)=>{
    const username = req.body.name;
    const password = req.body.password;
    // Zod Validation
    const Requirebody = z.object({
        name:z.string()
            .min(3, "Username must be at least 3 characters long")
            .regex(/^[A-Za-z]{3,}$/, "Username must contain only letters and be at least 3 characters"),
        password:z.string()
            .min(8, 'Password must be at least 8 characters long')
            .max(32, 'Password must be a maximum of 32 characters long')
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,32}$/,
                'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.')
                            
    });

    const Checking_User = Requirebody.safeParse(req.body);

    if(!Checking_User.success){
        const Error_Detail :Record<string, string> = {};
        Checking_User.error.issues.forEach((err)=>{
            
            const field = err.path[0] as string;
            if(!Error_Detail[field]){

                Error_Detail[field] = (err.message);
            }

        })
        return res.status(411).json( {
            Error_Detail
        })
        
    }
    if(Checking_User.success){
        
        const user = await UserModel.findOne({
            name:username
        })
        
        
        if(user) {
            return res.status(403).json({
                message:"User already exists with this username"
            })
        }
        
        
    }
    try{
        const hash = await bcrypt.hash(password,6);
        await UserModel.create({
            name:username,
            password:hash
        })

        res.json({
            message:"User Are Signup Done "
        })
    }
    catch(e){
        res.status(500).json({
            message:"Server error"
        })
    }

}
export const user_signin = async(req:Request, res:Response)=>{
    const username = req.body.name;
    const password = req.body.password;
    console.log("uswername: ",username)
    console.log("password: ",password)
    try{

        const existUser = await UserModel.findOne({
            name:username,
        })
        if(!existUser) {
            return res.status(403).json({
                message: "Incorrect credential"
            })
        }
        const isPasswordCorrect = await bcrypt.compare(password,existUser.password as string); //typeScript error

        if(!isPasswordCorrect){
            return res.status(403).json({
                message: "Incorrect credential"
            })
        }
        const token = jwt.sign({
            id:existUser._id
        },JWT_SECRET)
        res.json({
            token
        })
    }
    catch(e){
        res.status(500).json({
            message:"Server Error"
        })
    }
}
export const checkLogin = (req:Request,res:Response)=>{
    return res.json({
        message:"User Exist"
    })
}