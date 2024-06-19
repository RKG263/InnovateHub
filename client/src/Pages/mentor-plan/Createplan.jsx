import React, { useState } from "react";
import Header from "../../Components/Header/Header";
import UserProfile from "../../Components/mentor-plan/UserProfile";
import Footer from "../../Components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { URL } from "../../url";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Createplan = () => {
  const { isAuthenticated, user, message, error } = useSelector(
    (state) => state.user
  );
  const [title, setTitele] = useState("");
  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOnSubmit = async () => {
    try {
      let res = null;
      setLoading(true);
      if (price != 0) {
        res = await axios.post(URL + "/api/v1/payment/genratePaymentLink", {
          amount: price,
          name: user.name,
        });
      }

      // console.log(res.data);

      const resp = await axios.post(URL + "/api/v1/mentorPlan/post", {
        title,
        price,
        duration,
        description,
        mentorId: user._id,
        planID: res?.data?.productId || "#",
        paymentURL: res?.data?.url,
      });
      setLoading(false);
      console.log(resp);
      toast.success("plan created successfully");
      navigate(`/mentor/${user._id}`);
    } catch (error) {
      setLoading(false)
      console.log(error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white   p-4 m-4">
        <div className="flex justify-center bg-white items-center h-fit">
          <div className="container mx-auto  bg-blue-800 my-4 px-4 lg:px-20 ">
            <div className="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 bg-white rounded-2xl shadow-2xl">
              <div className="flex justify-center">
                <h1 className="font-bold text-4xl md:text-5xl text-blue-900">
                  Create a Plan
                </h1>
              </div>
              <div className="mt-8 space-y-4">
                <div>
                  <input
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-800"
                    type="text"
                    placeholder="Title*"
                    onChange={(e) => setTitele(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                    type="number"
                    placeholder="Price"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                    type="number"
                    placeholder="Duration"
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Description*"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div>
                  <button
                    className={`w-full px-4 py-3 rounded-lg ${
                      loading
                        ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    } font-semibold uppercase`}
                    onClick={handleOnSubmit}
                    disabled={loading}
                  >
                    {loading ? <p>Please wait</p> : <p>Create Plan</p>}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Createplan;
