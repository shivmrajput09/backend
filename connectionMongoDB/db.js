const mongoose = require('mongoose');
const dotenv = require('dotenv');

//load env configuration
dotenv.config();

 const connectionDB = async()=>{
    try{
 const conn = await mongoose.connect(process.env.MONGODB_URI);
     console.log('connected Succesfully');   
    }
    catch(error){
        console.error(error.message);
        process.exit(1);
    }
 }

module.exports = connectionDB;
