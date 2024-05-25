import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const mentorSchema = new Schema({
    mentorId : {
        type: Schema.Types.ObjectId
    },
    experties: {
        type: String,

    },
    post: {
        type: String,

    },
    chats: {
        type: String,

    },
    rating: {
        type: String,

    },
    contact: {
        type: String,

    },
    askForMentorship: {
        type: String,

    },
    mentorshipGiven: {
        type: [ Schema.Types.ObjectId],

    }



});


export default mongoose.model("mentor", mentorSchema);