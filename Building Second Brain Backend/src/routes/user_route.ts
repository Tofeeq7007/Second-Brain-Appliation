
import Express  from "express";
import { userMiddleware } from "../middleware.js";
import { checkLogin, user_signin, user_signUp } from "../controller/auth.controller.js";

const user_route = Express.Router();

user_route.post("/signup", user_signUp)

user_route.post("/signin", user_signin)
user_route.post("/check", checkLogin)
export default user_route;