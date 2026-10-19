import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db.js'

dotenv.config()
let app = express()
let port = process.env.PORT || 4000


app.get('/',(req,res)=>{
    res.send("ddeddededdd")

})

app.listen(port,()=>{
    connectDB()
    console.log(`server is running or ${port}`);
})