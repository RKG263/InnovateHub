import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const investorSchema = new Schema({
    abouyMe: {
        type: String,

    },
    post: {
        type: String,

    },
    chats: {
        type: String,

    },
    investmentGiven: {
        type: String,

    },
    rating: {
        type: String,

    },
    contact: {
        type: String,

    },
    askForAppointment: {
        type: String,

    },
    entrepreneurs: {
        type: String,

    }



});


export default mongoose.model("investor", investorSchema);