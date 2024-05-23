import { recieveMail } from "../utils/sendVerificationMail.js";

export const contactUsController = async (req, res, next)=>{

    try{
            // console.log(req.body);
        const mail = await recieveMail(req.body);
        console.log(mail);

        res.status(200).json({
            success: true,
            message: "Mail sent successfully",
            
        })
        

    }catch(err)
    {
        console.error(err);
        next(err);
    }

}