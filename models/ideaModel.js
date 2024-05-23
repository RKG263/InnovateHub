import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const ideaSchema = new Schema({
    idea: {
        type: String,

    },
    entrepreneurId: {
        type: Schema.Types.ObjectId,
        required : true

    },
    investorId : {
        type : Schema.Types.ObjectId,
        required : true
    }



}, {timestamps:true});


export default mongoose.model("ideas", ideaSchema);