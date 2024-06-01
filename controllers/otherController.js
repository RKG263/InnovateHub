import entrepreneurModel from "../models/entrepreneurModel.js";
import investorModel from "../models/investorModel.js";
import meetingModel from "../models/meetingModel.js";
import mentorModel from "../models/mentorModel.js";
import notificationModel from "../models/notificationModel.js";
import userModel from "../models/userModel.js";
import { createNotification } from "../utils/createNotification.js";
import { recieveMail } from "../utils/sendVerificationMail.js";



// mail contact
export const contactUsController = async (req, res, next) => {
  try {
    const mail = await recieveMail(req.body);
    // console.log(mail);

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


export const approachUser = async (req, res , next) => {
  try {
    const { senderId, receiverId, description , name , email} = req.body;
    // const file = req.file; // Assuming file upload middleware is used 
    // console.log(senderId, receiverId , description, name , email);
      
    const user = await userModel.findById({_id : senderId}) ;
    if(name != user.name || email != user.email){
      throw new Error("Incorrect Data Entered") ;
    }


    // let filePath = null;
    // if (file) {
      // filePath = await uploadFile(file); 
    // }
    const status = "pending" ;
    const message = `${req.user.name} has sent you a connection request.`;
    const notification = await createNotification(senderId, receiverId, 'connection_request', message,  description ,status);
 
    res.status(201).json({ success: true, notification });
  } catch (error) {
    next(error);
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

export const fetchNotification = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const notifications = await notificationModel
      .find({ receiver: userId })
      .populate('sender', 'name profile_pic role')
      .sort({ createdAt: -1 }); // Sort by createdAt in descending order

    res.status(200).json({
      success: true,
      message: "Here are Your Notifications",
      notifications,
    });
  } catch (error) {
    next(error);
  }
}

export const CheckChatStatus = async (req, res, next) => {
  const { Id1, Id2 } = req.body;

  try {
    const notification = await notificationModel.findOne({
      $or: [
        { sender: Id1, receiver: Id2 },
        { sender: Id2, receiver: Id1 }
      ]
    });

    if (!notification) {
      return res.json({ chatEnabled: false, message: 'Approach' });
    }

    if (notification.status === 'accepted') {
      return res.json({ chatEnabled: true, message: 'Chat' });
    } else if (notification.status === 'pending') {
      if (notification.sender.toString() === Id1) {
        return res.json({ chatEnabled: false, message: 'Your request is pending' });
      } else {
        return res.json({ chatEnabled: false, message: 'You have a connection request' });
      }
    } else if (notification.status === 'rejected') {
      return res.json({ chatEnabled: false, message: 'Approach' });
    } else {
      return res.json({ chatEnabled: false, message: 'No interaction found' });
    }
  } catch (error) {
    console.error('Error checking chat status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const handleNotification = async (req, res, next) => {
  try {
    const { notificationId, action, senderId, receiverId } = req.body;
    // console.log(notificationId, action, senderId, receiverId);
    const notification = await notificationModel.findById({ _id: notificationId });
    if (action == 'accepted') {
      notification.status = "accepted";
      const sender = await userModel.findById({ _id: senderId });
      const receiver = await userModel.findById({ _id: receiverId });
      let roleModel;
      if (sender.role == 'Entrepreneur') {
        roleModel = entrepreneurModel;
      } else if (sender.role == 'Investor') {
        roleModel = investorModel;
      } else {
        roleModel = mentorModel;
      }
      const Rsender = await roleModel.findOne({ email: sender.email });
      Rsender.MyConnections.push(receiverId);
      Rsender.save();

      if (receiver.role == 'Entrepreneur') {
        roleModel = entrepreneurModel;
      } else if (receiver.role == 'Investor') {
        roleModel = investorModel;
      } else {
        roleModel = mentorModel;
      }
      const Rreceiver = await roleModel.findOne({ email: receiver.email });
      Rreceiver.MyConnections.push(senderId);
      Rreceiver.save();

      const message = " Connection Request is Accepted";
      const description = "";
      const status = 'accepted';
      await createNotification(senderId, receiverId, 'accepted_request', message, description, status);
    } else {
      notification.status = 'rejected';
      const message = " Connection Request is Rejected";
      const description = "";
      const status = 'rejected';
      await createNotification(senderId, receiverId, 'rejected_request', message, description, status);
      // Create a notification for the sender as well
      const senderMessage = " Connection Request is Rejected";
      await createNotification(receiverId, senderId, 'rejected_request', senderMessage, description, status);
    }
    await notification.save();
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
}
