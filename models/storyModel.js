import mongoose from 'mongoose';

const StorySchema = new mongoose.Schema({
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
    userID: {
        type: String,
        required: true
    },
    category: {
        type: String, 
        required: false
    },
    createdDate: {
        type: Date,
        default: Date.now 
    },
    
        
    
}, { timestamps: true });

export default mongoose.model('story', StorySchema);
