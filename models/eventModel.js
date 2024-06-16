import mongoose, { Schema } from "mongoose";

const eventSchema = new mongoose.Schema({
  topic : { type: String, required: true },
  description : { type: String, required: true },
  startDate : { type: Date, required: true },
  startTime : { type: String, required: true },
  endDate : { type: Date, required: true },
  endTime : { type: String, required: true },
  wallpaper : { type: String },
  webinarLink : { type: String, required: true , default : "www.google.com"},
  taker : { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

export default mongoose.model("Event", eventSchema);
