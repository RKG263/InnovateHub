import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Define the Notification Schema
const notificationSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      type: {
        type: String,
        enum: ['connection_request', 'accepted_request', 'rejected_request', 'other'], // Add 'business_request'
        required: true,
      },
      status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'other'], 
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      file: {
        type: String, // Assuming the file is stored as a path or URL
        default : ''
      },
      description: {
        type: String,
      },
      read: {
        type: Boolean,
        default: false,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
});


export default mongoose.model('Notification', notificationSchema);
