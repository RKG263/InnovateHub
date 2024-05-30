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

export const allUsersController = async(req, res, next)=>{
    try{
        const allUser = await userModel.find();
        res.status(200).send({
            success : true,
            users : allUser
        });

    }catch(err)
    {
        console.error(err);
        next(err);
    }
}

export const approachUser = async (req, res) => {
    const { userId, targetUserId } = req.body;
       console.log(userId , targetUserId) ;
    try {
      const user = await userModel.findById(userId);
      const targetUser = await userModel.findById(targetUserId);
  
      if (!user || !targetUser) {
        return res.status(404).json({ message: 'User not found' });
      }
    //   let User , TargetUser ;

    //   if(user.role  == 'EnterPreneur'){
    //        const A = await entrepreneurModel.findOne({email : user.email}) ;
    //   }

      
    //   if (user.myConnections.includes(targetUserId) || targetUser.myConnections.includes(userId)) {
    //     return res.status(400).json({ message: 'Users are already connected' });
    //   }
  
    //   user.myConnections.push(targetUserId);
    //   targetUser.myConnections.push(userId);
  
    //   await user.save();
    //   await targetUser.save();
  
      res.status(200).json({ message: 'Users connected successfully' });
    } catch (error) {
      next(error) ;
    }
  };