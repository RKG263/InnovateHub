import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
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
        public_id:{
            type:String
          },
          url:{
            type:String
          }
    },
    username: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    categories: {
        type: [String], 
        required: false
    },
    createdDate: {
        type: Date,
        default: Date.now 
    },
    like: {
        type: Number,
        default: 0,
        min: 0 
    }
}, { timestamps: true });

export default mongoose.model('Post', PostSchema);
