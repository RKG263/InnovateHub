import entrepreneurModel from "../models/entrepreneurModel.js"
import ideaModel from "../models/ideaModel.js";
import investorModel from "../models/investorModel.js";
import mentorModel from "../models/mentorModel.js";




export const entrepreneurIdeaController = async (req, res, next) => {

    try {
        const { idea, entrepreneurId, investorId } = req.body;

        const ideaRes = await ideaModel.create({ idea, entrepreneurId, investorId });

        res.status(200).send({
            success: true,
            message: "Idea saved",
            ideaRes
        });

    } catch (err) {
        console.error(err);
        next(err);
    }

}


export const entrepreneurController = async (req, res, next) => {

    try {
        const entrepreneur = await entrepreneurModel.find();

        res.status(200).json(entrepreneur);

    } catch (err) {
        console.error(err);
        next(err);


    }


} 


export const ideaSubmittedController = async (req, res, next)=>{

    try{

        const ideas = await ideaModel.find({entrepreneurId : req.user._id});
        res.json(200).json(ideas);


    }catch(err)
    {
        console.error(err);
        next(err);
    }



}

export const myMentorController = async(req , res , next)=>{

    
    try{

        const mentors = await mentorModel.find({
            mentorshipGiven : req.user._id
        });

        res.status(200).json(mentors);

    }catch(err)
    {
        console.error(err);
        next(err);
    }


}


export const myInvestorController = async(req , res , next)=>{

    
    try{

        const investors = await investorModel.find({
            entrepreneurs : req.user._id
        });
        
        res.status(200).json(investors);


    }catch(err)
    {
        console.error(err);
        next(err);
    }


}

