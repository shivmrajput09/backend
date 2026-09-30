 const express = require('express')

 // router create 

 const router = express.Router();

 const User = require('../models/userModel')
 //routes

 //CRUD Operations

 //View/Read

 router.get('/users',async(req,res)=>{
try{
    const users = await User.find();
res.status(200).json(users);

}
catch(err){
    res.status(500).json({
        success:false,
        message : err.message
    })
}


 })


 //create

 router.post('/users',async(req,res)=>{
    try{
        const {name,age,weight} = req.body;
        const user = new User({name,age,weight});
        await User.bulkSave(user);


    }
    catch(err){
        res.status(500).json({
            success:false,
            message : err.message,
        })
    }

 })









 
 module.exports  = router; 