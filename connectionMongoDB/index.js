 const express = require('express');
const { default: mongoose } = require('mongoose');
const connectionDB = require('./db');
 const app = express();
  const connectionDB = require('./db');

 const PORT = 3005;

//body parser
app.use(express.json());

//connect to db 
 connectionDB();


 app.get('/',(req,res)=>{
    console.log("server inside  handler")
    res.send("hy req send successfully")

 });


 app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);

 })