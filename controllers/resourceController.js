import { Resources } from "../models/resourceModel.js";
import ErrorHandler from "../middleware/error.js";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";



export const postresource= catchAsyncErrors(async(req,res,next)=>{

const{ pdfUrl,videoUrl,pdfFileName,pdfFileType,videoFileType,videoFileName,
  pdfDescription,videoDescription,pdfTitle,videoTitle}=req.body;

   if(!pdfUrl&&!videoUrl)
    {

        return next(new ErrorHandler("Please Provide Resource",400));
    }

    if(pdfUrl&&!pdfDescription||pdfUrl&&!pdfTitle)
      {
        return next(new ErrorHandler("Please Provide PDF Descrption",401));
      }

      if(videoUrl&&!videoDescription||videoUrl&&!videoTitle)
        {
          return next(new ErrorHandler("Please Provide Video Decription",402));
        }
    const resources= await Resources.create({
      pdfUrl,videoUrl,pdfFileName,pdfFileType,videoFileType,videoFileName,videoDescription,
      pdfDescription,pdfTitle,videoTitle
      });
      res.status(200).json(
        {
        success:true,
        meassage:"Resources Added Sucessfully",
         resources
        }
      );

});


export const getResources=catchAsyncErrors(async(req,res,next)=>{

  const resources=await Resources.find();

  res.status(200).json({
   success:true,
   resources

  });

});