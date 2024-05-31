import mongoose from 'mongoose';
import validator from "validator";
const Schema = mongoose.Schema;


const mentorSchema = new Schema({

    
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
    
    experties: {
        type: String,
        default : ''
    },
    post: {
        type: String,
        default : ''
    },
    chats: {
        type: String,
        default : ''
    },
    rating: {
        type: String,
         default : ''
    },
    contact: {
        type: String,
        default : ''
    },
    aboutMe: {
        type: String,
        default : "Hi I am an excellent Mentor"
    },
    askForMentorship: {
        type: String,

    },
    mentorshipGiven: {
        type: [ Schema.Types.ObjectId],

    } ,
   MyConnections: {
        type: [Schema.Types.ObjectId],
        default: [] ,
    },

    interests: {
        type: [String],
        default : [] 
    },


});


export default mongoose.model("mentor", mentorSchema);