
import mentorPlanModel from "../models/mentorPlanModel.js";


// create plan controller

export const createPlanController=async(req,res,next)=>{
  try {

    const {title,description,duration,mentorId,price,planID,paymentURL}=req.body;

    if(!title || !description || !duration ||!mentorId ||!price){
      return next({status:400,message:"all feild required"})
    }
    const result=await mentorPlanModel.create({
      title,
      description,
      duration, 
      mentorId,
      price,
      planID,
      paymentURL
    })
    res.status(200).send({
      success:true,
      message:"mentorPlan created successfully",
      result
    })
    
  } catch (error) {
    next("error in createPlanController");
    console.log(error)
  }
}

// get plan by id controller (mentor id)

export const getPlanController=async(req,res,next)=>{
    const id=req.params.id;
    try {
      const result=await mentorPlanModel.find({mentorId:id});
      if(!result){
        throw new Error("no plan found");
      }

      res.status(201).send({
        success:true,
        message:"all plans found successfully",
        result
      })
      
    } catch (error) {
      next("error in getpost controller")

    }
}

// delete post by id(post id)
export const deletePlanController=async(req,res,next)=>{
  const _id=req.params.id;
  try {
    const result=await mentorPlanModel.findByIdAndDelete(_id);
    if(!result){
      throw new Error("error in deletion of plan")
    }
    res.status(200).send({
      success:true,
      message:"plan deletion done",
      result
    })
    
  } catch (error) {
    next("error in delete contoller")
    console.log(error)
  }
}