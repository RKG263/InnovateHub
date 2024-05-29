import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const entrepreneurSchema = new Schema({
   
    userId : {
        type: Schema.Types.ObjectId
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
    mentorIds: {
        type: [Schema.Types.ObjectId],

    },
    investorIds: {
        type: [Schema.Types.ObjectId],

    }



});


export default mongoose.model("entrepreneurs", entrepreneurSchema);