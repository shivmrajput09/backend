import { Router } from "express";
import express from "express"
import { create, delete1, home, read, read2, readAlluser, update } from "../controllers/user.controller";


let userRouter = express(Router())

// Basic Routes
userRouter.get("/",home);

userRouter.post("/",home1);     // ==========================================
        // 1. CREATE Operation
        // ==========================================
        userRouter.post("/create",create);

        // ==========================================
        // 2. READ Operation (Specific user by userName)
        // ==========================================
        userRouter.get("/read/:userName",readAlluser);

        // ==========================================
        // 2. READ Operation (Filtered by Age = 35)
        // ==========================================
        userRouter.get("/read",read2);

        // ==========================================
        // 3. UPDATE Operation
        // ==========================================
        userRouter.patch("/update/:userName",update);

        // ==========================================
        // 4. DELETE Operation(using controller)
        // ==========================================
        userRouter.delete("/delete",delete1);
 
 
export default userRouter;