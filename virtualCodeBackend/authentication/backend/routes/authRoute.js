import express from  "express"
import { signUp , login, logout } from "../controllers/authController.js"
import {upload} from '../middleware/multer.js'



const authRouter = express.Router()



authRouter.post("/signup",upload.single("profilePic"),signUp)
authRouter.post("/login",login)
authRouter.post("/logout",logout)

export default authRouter