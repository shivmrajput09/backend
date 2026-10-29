// अगर आप import इस्तेमाल कर रहे हैं (ES Modules):
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


// या अगर आप require इस्तेमाल कर रहे हैं (CommonJS):
// const cloudinary = require('cloudinary').v2;

// Configuration
cloudinary.config({ 
  cloud_name: process.env.CLOUDNARY_CLOUD_NAME, 
  api_key: process.env.CLOUDNARY_API_KEY, 
  api_secret: process.env.CLOUDNARY_API_SECRET 
});

const uploadImage = async (filePath) => {
try{
    if(!filepath){
        return null
    }
let result = cloudinary.uploader.upload(filePath)
console.log(result);

fs.unlinkSync(filePath)
return   result.secure_url

}
catch(error){
fs.unlinkSync(filePath)
console.log("Cloudnary error",error)


}



}

export default uploadImage  


//multer package ka kaam bcha h 