import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const meetingSchema = new Schema({

    personId1 : {
        type: Schema.Types.ObjectId,
        required : true
    },
    personId2 : {
        type: Schema.Types.ObjectId,
        required : true
    },
    date : {
        type : String,
        required : true
    },
    startTime : {
        type : String,
        required : true
    },
    endTime : {
        type : String,
        required : true
    }
    

}, {timestamps : true})



export default mongoose.model("meetings", meetingSchema);