import mongoose from "mongoose";
const mongourl="enter your url"
const connectDB=async()=>{
  try {

    const conn=await  mongoose.connect(process.env.MONGO_URL||mongourl);
    console.log("success fully connected")
    console.log(mongoose.connection.host)
  } catch (error) {
    console.log(error)
  }
}
export default connectDB;