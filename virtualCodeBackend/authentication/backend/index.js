import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db.js'
import authRouter from './routes/authRoute.js'

dotenv.config()
let app = express()
let port = process.env.PORT || 4000


 app.use("/api",authRouter)

app.listen(port,()=>{
    connectDB()
    console.log(`server is running or ${port}`);
})