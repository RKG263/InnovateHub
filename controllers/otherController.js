import meetingModel from "../models/meetingModel.js";
import userModel from "../models/userModel.js";
import { recieveMail } from "../utils/sendVerificationMail.js";

// mail contact
export const contactUsController = async (req, res, next) => {
  try {
    const mail = await recieveMail(req.body);
    console.log(mail);

    res.status(200).cookie("contactus", "sssj@38494").json({
      success: true,
      message: "Mail sent successfully",
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

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
      endTime,
    });

    await meeting.save();
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const allUsersController = async (req, res, next) => {
  try {
    const allUser = await userModel.find();
    res.status(200).send({
      success: true,
      users: allUser,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// getuser by id controller
export const getUseraByidController = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await userModel.findById({ _id: id });


    if (!user) {
      throw new Error("user not exist");
    }

    const newUser={
        name:user.name,
        email:user.email,
        profile_pic:user.profile_pic
    }

    res.status(200).send({
        success:true,
        message:"user found successfully",
        newUser
    })
  } catch (error) {
    next(error);
  }
};
