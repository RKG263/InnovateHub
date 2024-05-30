import mongoose from 'mongoose';
import validator from "validator";
const Schema = mongoose.Schema;

const entrepreneurSchema = new Schema({
    entrepreneurId: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
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
        default : ''
    },
    contact: {
        type: String,
        default : ''
    },
    MyConnections: {
        type: [String],
        default: [""],
    },
    interests: {
        type: [String],
        default : "" ,
    }
});

export default mongoose.model("Entrepreneurs", entrepreneurSchema);
