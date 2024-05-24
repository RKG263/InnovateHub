import mentorModel from "../models/mentorModel.js";



export const mentorController = async(req, res, next)=>{

    try{
        const mentor = await mentorModel.find();
        
        res.status(200).json(mentor);

    }catch(err)
    {
        console.error(err);
        next(err);


    }


} 