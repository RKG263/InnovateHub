import entrepreneurModel from "../models/entrepreneurModel.js"
import ideaModel from "../models/ideaModel.js";




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