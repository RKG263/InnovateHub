import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import Showplan from "../../Components/mentor-plan/Showplan";
import UserProfile from "../../Components/mentor-plan/UserProfile"; // Import UserProfile component
import Footer from "../../Components/Footer/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { URL } from "../../url";


const Plan = () => {
  const [plan, setPlan] = useState([]);
  const planId = useParams().id;

  const handleOnDelete=async(id)=>{
    try {
      const resp=await axios.delete(URL+'/api/v1/mentorPlan/delete-post/'+id);
        handle()
    } catch (error) {
      console.log(error)
    }
  }
  const handle = async () => {
    try {
      const res = await axios.get(
        URL + "/api/v1/mentorPlan/get-post/" + planId
      );
      
      setPlan(res?.data?.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
   
    handle();
  }, [planId]);

 
  return (
    <>
      <Header />
      <UserProfile id={planId} /> {/* Render the UserProfile component */}
      <div className="pattern-background">
        <div className="text-center text-gray-700 mt-8 px-4">
          <h2 className="text-4xl font-bold mb-2">
            Choose the Best Plan for Your Growth
          </h2>
          <p className="text-lg">
            Discover our range of subscription plans tailored to meet your
            learning needs and accelerate your career.
          </p>
        </div>
        <div className="flex justify-around flex-wrap p-4">
          {plan && plan.map((item, ind) => <Showplan key={ind} onDelete={() => handleOnDelete(item._id)} item={item} id={planId}  />)}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Plan;
