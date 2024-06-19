import mongoose from 'mongoose';
import validator from "validator";
const Schema = mongoose.Schema;

const entrepreneurSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    userId : {
        type: Schema.Types.ObjectId
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        validate: validator.isEmail,
      },
    
    image: {
        type: String,
        default : ''
    },
    chats: {
        type: String,
        default : '',
    },
    meetingSchedule: {
        type: String,
        default : ''
    },
    aboutMe: {
        type: String,
        default : 'Help Me grow Fast'
    },
    contact: {
        type: String,
        default : ''
    },
    myConnections: {
        type: [Schema.Types.ObjectId],
        default: [],
    },
    interests: {
        type: [String],
        default : [] ,
    }
});

export default mongoose.model("Entrepreneurs", entrepreneurSchema);
