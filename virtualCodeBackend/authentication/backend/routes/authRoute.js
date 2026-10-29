import express from "express"
import { signUp, login, logout, getUserData } from "../controllers/authController.js"
import { upload } from "../middleware/multer.js"
import { checkAuth } from "../middleware/checkAuth.js"

const authRouter = express.Router()

authRouter.post("/signup", upload.single("profilePic"), signUp)
authRouter.post("/login", login)
authRouter.post("/logout", logout)
authRouter.get("/test", checkAuth, getUserData)

export default authRouter