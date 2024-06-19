import mentorModel from "../models/mentorModel.js";
import entrepreneurModel from "../models/entrepreneurModel.js";



export const mentorController = async (req, res, next) => {

    try {
        const mentor = await mentorModel.find();


        res.status(200).json(mentor);

    } catch (err) {
        console.error(err);
        next(err);


    }


}





export const createConnectionController = async (req, res, next) => {


    try {
        console.log(req.body);
        const mentor = await mentorModel.updateOne(
            { userId: req.body.mentorId },
            // { $push: { myConnections: req.user._id } },
            { $push: { mentorshipGiven: req.user._id } }
        );
        const ent = await entrepreneurModel.updateOne({ userId: req.user._id }, { $push: { myConnections: req.body.mentorId } })

        console.log(mentor, ent);
        res.status(200).json({
            success: true,
            message: "connections made"
        });

    } catch (err) {
        console.error(err);
        next(err);


    }

} 