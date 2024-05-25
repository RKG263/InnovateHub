import investorModel from "../models/investorModel.js";

export const investorController = async(req, res, next)=>{

    try{
        const investor = await investorModel.find();
        
        res.status(200).json(investor);

    }catch(err)
    {
        console.error(err);
        next(err);


    }


} 