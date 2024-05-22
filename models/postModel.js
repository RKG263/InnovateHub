import mongoose from 'mongoose';

const PostSchema =new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    categories: {
        type: Array,
        required: false   
    },
    createdDate: {
        type: Date,
        default:Date.now()
    },
    like:{
        type:Number,
        default:0
    }
},{timestamps:true});


export default mongoose.model('Post',PostSchema)