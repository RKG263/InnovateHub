import mongoose from "mongoose";

const mentorPlanSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration:{
      type:String,
      required:true
    },
    price:{
      type:Number,
      required:true
    },
   
    mentorId: {
      type: String,
      required: true,
    },
    subscriber:[]
    ,

    createdDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("mentorPlan", mentorPlanSchema);
