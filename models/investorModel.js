import mongoose from 'mongoose';
import validator from "validator";
const Schema = mongoose.Schema;


const investorSchema = new Schema({

    userId : {
        type: Schema.Types.ObjectId
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
    aboutMe: {
        type: String,
        default : 'Hi I want to invest in fast growing bussinesses'

    },
    post: {
        type: String,
        default : ''

    },
    chats: {
        type: String,
        default : ''

    },
    investmentGiven: {
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
    askForAppointment: {
        type: String,
        default : ''

    },
    entrepreneurs: {
        type: String,
        default : ''
    },
    myConnections: {
        type: [Schema.Types.ObjectId] ,
        default : [] 
    },

    interests: {
        type: [String],
        default : [],
    }



});


export default mongoose.model("investor", investorSchema);