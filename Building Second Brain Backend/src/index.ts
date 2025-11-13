
declare global {
    namespace Express{
        export interface Request{
            userId?:string;
        }
    }
}

import express from "express"
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import { ContentModel, LinkModel, UserModel } from "./db.js";
import { userMiddleware } from "./middleware.js";
import user_route from "./routes/user_route.js";
import content_route from "./routes/content_route.js";
import { nanoid } from "nanoid";
import cors from 'cors'
import { FRONTEND_URL, PORT } from "./config.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(cors({
  origin: FRONTEND_URL, // your frontend origin
  credentials: true,               // allow cookies/auth headers
  allowedHeaders: ["Content-Type", "Authorization"] 
}));
app.use(express.json());

app.use("/api/v1", user_route);
app.use("/api/v1", content_route);






app.post("/api/v1/brain/share", userMiddleware, async (req,res) => {
    const share = req.body.share ; // true or flase;
    // @ts-ignore
    const userId = req.userId;
    console.log(userId);
    
    if(share){
        const existingLink = await LinkModel.findOne({
            userId
        });

        if(existingLink){
            res.json({
                hash:existingLink.hash
            })
            return;
        }

        const hash = nanoid(6);
        console.log(hash);
        await LinkModel.create({
            hash,
            userId
        })

        res.json({
            hash
        })
        
    }
    else{
        await LinkModel.deleteOne({
            userId
        });
        res.json({
            message:"Removed link"
        })
    }
})

app.get("/api/v1/brain/:shareLink", async (req,res)=>{
    
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({
        hash
    })
    
    if(!link){
        res.json({
            message: "Incorrect input"
        })
        return;
    }

    const content = await ContentModel.find({
        userId:link.userId
    })

    const user = await UserModel.findOne({
        _id:link.userId
    })

    if(!user){
        res.status(411).json({
            message:"user not found, error should ideally no happend"
        })
        return;
    }


    res.json({
        username:user.name,
        content:content
    })

})

app.get("/api/v1/autocomplete", async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ error: "Query parameter 'q' is required." });
    }
    
    console.log("query : ",query);
    const results = await ContentModel.aggregate([ // assuming your model is named Content
      {
        $search: {
          index: "default",
          autocomplete: {
            query: query,
            path: "title", // Correct path syntax for a single field
            tokenOrder: "sequential"
          }
        }
      },
      { $limit: 5 },
    ]);
    console.log("Query Results :", results);
    res.json(results);
  } catch (err) {
    console.error("Autocomplete error:", err);
    res.status(500).send("Autocomplete error");
  }
});



app.listen(PORT,()=>{
    console.log("Server Running...");
    
})
app.on("error", (err: any) => {
  if (err.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} is already in use. Try another port.`);
  } else {
    console.error("❌ Server error:", err);
  }
});