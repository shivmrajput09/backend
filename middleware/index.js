  const express = require('express')
  const app = express();
  const port = 3100;



//mount route.js in index.js

const route = require('./routes/routes');

app.use('/api',route);


 
//  const myLogging = function(req,res, next){
//     console.log("login kr rha hu")
//     next();
//  }
 
//  app.use(myLogging);

//  const myAuth = function(req,res,next){
//     console.log("auth check kr ")
//         res.send("res idahar hi send kr diya to ab aage wale middleware nhi chalenge")

//     //next();
//  }
// app.use(myAuth);

//  const myValidation = function(req,res,next){
//     console.log("Validation kr rha hu")
//     next();
//     // aage koi middleware nhi h to ye   route handler  (app.get )pr chal jayega
    
//  }

// app.use(myValidation);

//  app.get("/",(req,res)=>{
//     console.log("main route handler hu")
//     res.send("hello pajji ! kadde hass bhi liya kro ")
//  })


 

 app.listen(port , ()=>{
     console.log(`sever run on port ${port}`)
  })