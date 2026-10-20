import User from "../models/userModel.js"

export const signUp = async(req,res)=>{

try {
const{firstName ,lastName , email,password,userName} = req.body  


let existUser = await User.findOne({email})
if(existUser){
    return res.json(400).json({message:"User already exist"})
}


const hassedPassword = await bcrypt



    
} catch (error) {
    return res.json({
        message:'internal server error'
    })
}



    
}