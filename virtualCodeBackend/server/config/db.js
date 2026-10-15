 import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Database connect karne ka function
const startServer = async () => {
    try {
        // MongoDB URL se database connect hoga
        await mongoose.connect(process.env.MONGODB_URL);

        console.log("MongoDB Connected Successfully!");

    } catch (error) {
        console.log("MongoDB Connection Error:", error.message);
        process.exit(1);
    }
};

export default startServer;
 