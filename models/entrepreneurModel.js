import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const entrepreneurSchema = new Schema({
   

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
    mentorIds: {
        type: [Schema.Types.ObjectId],

    },
    investorIds: {
        type: [Schema.Types.ObjectId],

    }



});


export default mongoose.model("entrepreneurs", entrepreneurSchema);