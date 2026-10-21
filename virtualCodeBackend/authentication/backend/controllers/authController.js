import generateToken from "../config/token.js";
import User from "../models/userModel.js"
import bcrypt from "bcryptjs";

export const signUp = async(req,res)=>{

try {
const{firstName ,lastName , email,password,userName} = req.body  
if(!firstName || !lastName || !email || !password || !userName){
        return res.json(400).json({message:"send all details"})

}

let existUser = await User.findOne({email})
if(existUser){
    return res.status(400).json({message:"User already exist"})
}


const hassedPassword = await bcrypt.hash(password,10)


const user = await User.create({
    firstName,
    lastName,
    email,
    password:hassedPassword,
    userName,
})

 let token = generateToken(user._id)


 res.cookie("token",token,{
    httpOnly:true, // js access ko prevent krta h jisse ki koi inspect krke secret key na kr skte
secure: process.env.NODE_ENVIRONMENT ==  "production",
sameSite: "strict",
maxAge:7*24*60*60*1000,


})


return res.status(201).json({
    user:{
        firstName,
        lastName,
        email,
        userName
    }
})


    
} catch (error) {
    return res.json({
        message:'internal server error'
    })
}



    
}
