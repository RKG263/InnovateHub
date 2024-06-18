import mongoose from "mongoose";

// Define a schema for file uploads
const ResourceSchema= new mongoose.Schema({
 
    pdfUrl: { type: String, },
    videoUrl: { type: String, },
    pdfDescription:{
        type:String,
      
    },
    pdfTitle:{
      type:String,
    },
    pdfFileName:{
        type: String,
    },
    pdfFileType:{
        type: String, 

        

    },
    videoFileType:{

        type: String,

    },
    videoDescription:{ 
       type:String,
      
    },
    videoTitle:{
       type:String,
    },
    videoFileName:{
        type: String, 
    }, 

    isAdmin:{
      type:Boolean,
      default:false,

    }
});


export  const Resources = mongoose.model('Resources', ResourceSchema);