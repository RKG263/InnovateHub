import { v2 as cloudinary } from 'cloudinary'
const dotenv = require('dotenv').config();
import * as fs from 'fs';

 cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  
  });

 
  export const upload = async(localImageFilePath)=>{
    try{
      // console.log(localImageFilePath, "localImange");
      if(localImageFilePath)
      {
        const result = await cloudinary.uploader.upload(localImageFilePath, {resource_type:  'image'});
        // console.log(result);
        
        
      fs.unlink(localImageFilePath,(err)=>{
        if(err) throw err;
        console.log("TemproryImageFile deleted");
      })        
        
        
        return {imageURL : result.secure_url, imageId : result.public_id};


      }
      else throw new Error("Cloudinary upload failed");

    }catch(err){

      fs.unlink(localImageFilePath,(err)=>{
        if(err) throw err;
        console.log("Unkown File deleted");
      })
      console.log(err);
      return err;
    }
  }



   export const  deleteImg = async(imageId)=>{

    try{
      const result = await cloudinary.uploader.destroy(imageId, {
        resource_type: "image",
    });
      // console.log(result, "Cloudinary deleted");
      return result;
      
    }
    catch(err){
      console.log(err);
      return err;
    }
  }
  // console.log(cloudinary.config());