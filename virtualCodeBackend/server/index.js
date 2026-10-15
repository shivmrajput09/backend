import express from "express";
import dotenv from 'dotenv';
dotenv.config()
import cors from "cors"; 
import mongoose from "mongoose";
import User from "./models/userModel.js";
import startServer from "./config/db.js";

let app = express();

// CORS middleware
app.use(cors({
    origin : "http://localhost:5173"
})); 
  
app.use(express.json());

app.use("/api",userRouter)

const port = 4001;
        // Server Start
const startApp = async () => {
    try {
        // Step 1: Pehle MongoDB connect hoga
        await startServer();

        // Step 2: Connection successful hone ke baad server start hoga
        app.listen(port, () => {
            console.log(`🚀 Server is started on port ${port}`);
        });
    } catch (error) {
        console.error("❌ Application startup failed:", error.message);
        process.exit(1);
    }
};

// Function call
startApp();
   

// Function ko call karein
