import Express  from "express";
import { userMiddleware } from "../middleware.js";
import { Get_Content, Push_Content, RemoveContent } from "../controller/content.controller.js";

const content_route = Express.Router();


content_route.post("/content",  userMiddleware, Push_Content);
content_route.get("/content",userMiddleware, Get_Content)
content_route.get("/content/:type",userMiddleware, Get_Content)
content_route.delete("/content",userMiddleware, RemoveContent)


export default content_route;