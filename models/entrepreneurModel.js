import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const entrepreneurSchema = new Schema({
    submittedIdea: {
        type: String,

    },
    post: {
        type: String,

    },
    chats: {
        type: String,

    },
    meetingSchedule: {
        type: String,

    },
    aboutMe: {
        type : String,

    },
    contact: {
        type: String,

    },
    mentors: {
        type: String,

    },
    investors: {
        type: String,

    }



});


export default mongoose.model("entrepreneur", entrepreneurSchema);