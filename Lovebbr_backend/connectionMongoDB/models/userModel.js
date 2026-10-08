const {Schema, model} = require('mongoose');  // imprt

//create 
const userSchema = new Schema({
name :{
    type : String,
 required : true,
 maxLength : 50,
},

age : {
    type : Number,
    required : true,
},

createdAt : {
    type : Date,
    default : Date.now,
},



});

//model create 

const TaskModel  = model("user",userSchema)

module.exports = TaskModel // export 

