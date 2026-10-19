import mongoose  from "mongoose";
const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB connected")
        
    }
     catch (error) {
        console.log("Db error",error)
    }
}

export default connectDB