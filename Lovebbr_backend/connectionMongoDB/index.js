 const express = require('express');
const { default: mongoose } = require('mongoose');
const connectionDB = require('./db');
 const app = express(); 
 const user = require('./routes/user')
 
 const PORT = 3005;

//body parser
app.use(express.json());

//connect to db 
 connectionDB();

 //load user file
app.use('/api',user);




 app.get('/',(req,res)=>{
    console.log("server inside  handler")
    res.send("hy req send successfully")

 });


 app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);

 })