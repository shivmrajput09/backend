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
    return res.json(400).json({message:"User already exist"})
}


const hassedPassword = await bcrypt.hash(password,10)


const user = await User.create({
    firstName,
    lastName,
    email,
    password:hassedPassword,
    userName,
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
