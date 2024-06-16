import React, { useState } from "react";
import "./SuccessPost.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { AiOutlineClockCircle, AiOutlineTags } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const SuccessPost = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { state } = useLocation();
  const { user } = useSelector(
    (state) => state.user
  );
  console.log( user);

  return (
    <>
      <Header />
      <div className="success-post">
        <div className="success-post-container">
          <div className="success-post-user-info">
            <img
              src={user?.profile_pic?.url || "https://images.pexels.com/photos/4917824/pexels-photo-4917824.jpeg?auto=compress&cs=tinysrgb&w=600"}
              alt="User Profile Picture"
              className="success-post-profile-pic"
            />
            <div className="success-post-user-details">
              <h2 className="success-post-user-name">{user?.name}</h2>
              <p className="success-post-user-designation">{user?.role}</p>
            </div>

            {isAdmin ? (
              <button className="success-post-connect-btn">REMOVE</button>
            ) : (
              <button className="success-post-connect-btn">CONNECT</button>
            )}
          </div>

          <div className="success-post-content">
            <img
              src={`${state?.item?.picture?.url}` || "https://images.pexels.com/photos/20704817/pexels-photo-20704817/free-photo-of-allee.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load`"}
              alt="image"
              className="success-post-image"
            />
            <div className="success-post-details">
              <div className="success-post-tag">
                <AiOutlineTags className="success-post-icon" />
                <a href="/">#{state?.item?.category}</a>
              </div>
              <h3>{state?.item?.title}</h3>
              <p>
                {state?.item?.description}
              </p>
              <div className="success-post-date">
                <AiOutlineClockCircle className="success-post-icon" />{" "}
                <label htmlFor="">Posted on: {state?.item?.createdDate.slice(0,10)}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SuccessPost;
