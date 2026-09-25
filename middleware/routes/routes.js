// routes specific middleware (widly used  in now days in industries)

const express = require('express')

 const router = express.Router();


 //middleware
const auth = function(req, res,next){
    console.log("ye auth wala middleware h.. ")


    //dummy user create krte hai

    req.user = {userId:1,role:"Admin"};

    // agr valid use h to proceed middleware 
    if(req.user){
    next();

    }
    else{
        //not a valid user
        res.json(
            {
                success : false,
                message : "Not a valid user "
            }
        )

    }
    
}

const isStudent = function(req,res,next){
    console.log("ye wala students k liye h bs");

    if(req.user.role === "Student"){
        next();
    }
    else{
        res.send({
            success : false,
            message : "Access Denied !."
        })
    }
}


// admin
 
 const isAdmin  = function(req,res,next){
    console.log("inside admin middle");


    if(req.user.role === "Admin"){
        next(); // router handler pr ya next middleware pr jane k lye
    }
    else{
        res.send({
            success : false,
            message : "Access Denied only for admin"
        })
    }
 }




//routes  

router.get("/Student", auth , isStudent,(req,res)=>{
console.log("i m inside student page")
res.send("Student Specific  page")

})

router.get("/Admin",auth,isAdmin,(req,res)=>{
console.log("i m inside admin page")
res.send("Admin Specific page ")
})
 

 module.exports = router; // must have