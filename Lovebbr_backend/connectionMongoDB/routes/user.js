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
        const {name,age} = req.body;
        const newUser = new User({name,age});
            await newUser.save();
            res.status(200).json({
                success:true,
                user: newUser
            })

    }
    catch(err){
        res.status(500).json({
            success:false,
            message : err.message,
        })
    }

 })


 //Update


 router.put('/users/:id',async(req,res)=>{
  const {id} = req.params; // id lega user k parameter se

    const {name , age} = req.body;
try{
const updatedUser = await User.findByIdAndUpdate(id,{name,age});  

 if(!updatedUser){
    res.json({
        message: " User Not found"
    })
 }
 //but u have updated the user Succesfully

 res.status(200).json({
    success : true,
    user : updatedUser
})

}
 


      catch(err){
        res.status(500).json({
            success:false,
            message : err.message,
        })
    } 
    

 })









 
 module.exports  = router; 