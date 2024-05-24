import meetingModel from "../models/meetingModel.js";
import { recieveMail } from "../utils/sendVerificationMail.js";


// mail contact
export const contactUsController = async (req, res, next) => {

    try {
        // console.log(req.body);
        const mail = await recieveMail(req.body);
        console.log(mail);

        res.status(200).json({
            success: true,
            message: "Mail sent successfully",

        })


    } catch (err) {
        console.error(err);
        next(err);
    }

}


// create meeting
export const meetingController = async (req, res, next) => {


    try {

        const { personId1, personId2, date, startTime, endTime } = req.body;

        if (!personId1 || !personId2 || !date || !startTime || !endTime) {
            throw new Error("all fields must be present");
        }


        const meeting = await meetingModel({
            personId1,
            personId2,
            date,
            startTime,
            endTime
        });

        await meeting.save();


    } catch (err) {
        console.error(err);
        next(err);
    }

}