import express from 'express'
import dotenv from 'dotenv'

dotenv.config()
let app = express()
let port = process.env.PORT || 4000


app.get('/',(req,res)=>{
    res.send("ddeddededdd")

})

app.listen(port,()=>{
    console.log(`server is running or ${port}`);
})