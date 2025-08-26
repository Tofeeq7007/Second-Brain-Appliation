import { ContentModel, TagsModel, UserModel } from "../db.js";
import type { Request,Response } from "express";
import { getUrlPreview } from "../routes/whatapp_url.js";
export const Push_Content = async(req:Request,res:Response)=>{
    const link = req.body.link;
    const title = req.body.title;
    
    const tag = req.body.tag;
    console.log(title);
    console.log(link);
    console.log(tag);
    
    const data = await getUrlPreview(link);
    console.log(data.description);
    console.log(data.image);
    

    const Tag = await TagsModel.create({
        tag:tag
    })


    await ContentModel.create({
        link,
        title,
        description:data.description,
        image:data.image,
        type:req.body.type,
        //@ts-ignore
        userId:req.userId,
        tags:Tag._id,
        
    })
    res.json({
        message:"Content added"
    })    
}
export const Get_Content = async(req:Request,res:Response)=>{
    //@ts-ignore
    const userId = req.userId
    const content = await ContentModel.find({
        userId
    }).populate("userId", "name")
    res.json({
        content
    }) 
}
export const RemoveContent = async(req:Request,res:Response)=>{
    //@ts-ignore
    const userId = req.userId;
    const contentId = req.body.contentId;
    console.log("userID = ",userId);
    console.log("contentID = ",contentId);
    
    console.log("Hi");
    
    const content = await ContentModel.deleteOne({
        _id:contentId
    })
    console.log(content);
    
    res.json({
        message:"Content Deleted Successfully"
    }) 
}