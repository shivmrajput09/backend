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

const port = 4001;

// Basic Routes
app.get("/", (req, res) => {
    res.json({ name: "shivam", age: 22 });
});

app.post("/", (req, res) => {
    console.log(req.body);
    res.send({ success: true });
});     // ==========================================
        // 1. CREATE Operation
        // ==========================================
        app.post("/create", async (req, res) => {
            try {
                let { name, age, email, userName } = req.body;
                const newUser = await User.create({
                    name,
                    age,
                    email,
                    userName
                });
                return res.status(201).json({ message: "User Create Succesfully.", user: newUser });
            } catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });

        // ==========================================
        // 2. READ Operation (Specific user by userName)
        // ==========================================
        app.get("/read/:userName", async (req, res) => {
            try {
                const user = await User.findOne({ userName: req.params.userName });
                return res.status(200).json(user);
            } catch (error) {
                return res.status(400).json({ message: "user not found" });
            }
        });

        // ==========================================
        // 2. READ Operation (Filtered by Age = 35)
        // ==========================================
        app.get("/read", async (req, res) => {
            try {
                const users = await User.find({ age: { $eq: 35 } });
                return res.status(200).json(users);
            } catch (error) {
                return res.status(400).json({ message: "user not found" });
            }
        });

        // ==========================================
        // 3. UPDATE Operation
        // ==========================================
        app.patch("/update/:userName", async (req, res) => {
            try {
                const updatedUser = await User.findOneAndUpdate(
                    { userName: req.params.userName }, 
                    req.body, 
                    { new: true } // new: true se database mein update hone ke baad naya data return hota hai
                );

                if (!updatedUser) {
                    return res.status(404).json({ message: "User not found" });
                }
                return res.status(200).json({ message: "User Updated Successfully", user: updatedUser });
                
            } catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });

        // ==========================================
        // 4. DELETE Operation
        // ==========================================
        app.delete("/delete", async (req, res) => {
            try {
                let { userName } = req.body;
                const deletedUser = await User.findOneAndDelete({ userName });
                
                if (!deletedUser) {
                    return res.status(404).json({ message: "User not found" });
                }
                return res.status(200).json({ message: "User Deleted Successfully", user: deletedUser });
            } catch (error) {
                return res.status(400).json({ message: "user not found" });
            }
        });
 
 
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
