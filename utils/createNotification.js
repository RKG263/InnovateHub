import notificationModel from '../models/notificationModel.js' ;

export const createNotification = async (senderId, receiverId, type, message,  description = null , status ) => {
    const notification = await notificationModel.create({
      sender: senderId,
      receiver: receiverId,
      type,
      message,
      file : "",
      description,
      status 
    });
  
    await notification.save();
    return notification;
  };