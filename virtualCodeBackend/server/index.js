import express from "express";
import cors from "cors"; 
import mongoose from "mongoose";
import User from "./models/userModel.js";

let app = express();

// CORS middleware
app.use(cors({
    origin : "http://localhost:5173"
})); 
  
app.use(express.json());

const port = 4001;
const mongoURI = "mongodb+srv://shivmt880_db_user:s24dGgCjnFuDRvYG@cluster0.xnwsfns.mongodb.net/shivam_db";
// Routes
app.get("/", (req, res) => {
    res.json({ name: "shivam", age: 22 });
});

app.post("/", (req, res) => {
    console.log(req.body);
    res.send({ success: true });
});

// 👇 Async/Await function database connect aur server start karne ke liye
const startServer = async () => {
    try {
        // Pehle database connect hone ka wait karega
        await mongoose.connect(mongoURI);
        console.log(" MongoDB Connected Successfully!");
        
        // Jab database connect ho jayega, tab server start hoga

 app.post("/create",async(req,res)=>{
    try{
     let {name,age,email,userName} =req.body
  const newUser = await   User.create({
        name,
        age,
        email,
    userName
     })
   return   res.status(201).json({message:"User Create Succesfully." })

    }
    catch(error){
    return res.status(400).json({message:error.message})

    }

 })

//  app.get("/read",async(req,res)=>{
//     try {
//         const users = await User.find()
//         return res.status(200).json(users )
        
//     } catch (error) {
//                 return res.status(400).json({message:"user not found"})

//     }

//  })

 
 app.get("/read/:userName",async(req,res)=>{
    try {
        const users = await User.findOne({userName:req.params.userName})
        return res.status(200).json(users )
        
    } catch (error) {
                return res.status(400).json({message:"user not found"})

    }

 })


 
 app.get("/read",async(req,res)=>{
    try {
        const users = await User.find({age :{$eq : 35}})
        return res.status(200).json(users )
        
    } catch (error) {
                return res.status(400).json({message:"user not found"})

    }

 })




        app.listen(port, () => {
            console.log(`🚀 Server is started on port ${port}..`);
        });
    } catch (error) {
        // Agar database connect hone mein koi error aati hai toh yahan catch hogi
        console.log("❌ MongoDB Connection Error: ", error);
        process.exit(1); // Error aane par process ko stop karne ke liye (optional but good practice)
    }
};

// Function ko call karein
startServer();