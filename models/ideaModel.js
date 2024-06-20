import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const ideaSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    idea: { 
        type: String,

    },
    entrepreneurId: {
        type: Schema.Types.ObjectId,
        required: true

    },
    url:{
        type : String,
    },
    investorId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }



}, { timestamps: true });


export default mongoose.model("ideas", ideaSchema);