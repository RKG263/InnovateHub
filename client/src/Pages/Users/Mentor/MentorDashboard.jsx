import React, { useState } from "react";
import "./mentorDashboard.css";
import Post from "../../../Components/Users/Post.jsx";
import Chat from "../../../Components/Users/Chat.jsx";
import EditProfile from "../../../Components/Users/EditProfile.jsx";
import Expertise from "../../../Components/Users/Mentor/Expertise.jsx";
import Mentored from "../../../Components/Users/Mentor/Mentored.jsx";
import Requested from "../../../Components/Users/Mentor/Requested.jsx";
import Reviews from "../../../Components/Users/Mentor/Reviews.jsx";

const MentorDashboard = () => {
  const [currentComponent, setCurrentComponent] = useState("Post");

  const handleClick = (event) => {
    setCurrentComponent(event.target.getAttribute("name"));
  };

  const genreateComponent = () => {
    switch (currentComponent) {
      case "Post":
        return <Post />;
      case "Chat":
        return <Chat />;
      case "EditProfile":
        return <EditProfile />;
      case "Expertise":
        return <Expertise />;
      case "Mentored":
        return <Mentored />;
      case "Requested":
        return <Requested />;
      case "Reviews":
        return <Reviews />;
      default:
        return <Post />;
    }
  };

  return (


    <div className="container">

      {/* <!-- Profile Section --> */}

      

        <div className="profile-section">

      <div className="flex justify-center items-center flex-col">
        <img
          src="https://images.pexels.com/photos/3781545/pexels-photo-3781545.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
          className="profile-img"
        />

        <h2 className="user-name">URFI JAVED</h2>

        <p className="user-bio text-center">
          Innovating solutions to create a better tomorrow.
          <br />
          Contact - 9087890878
        </p>
      </div>
          <div className="profile-content">
            <div className="link"
              onClick={handleClick}

            >
              <div
                className="link-info"
                name="Post"
              >
                Posts
              </div>

              <div className="link-info" name="Expertise">
                Expertise
              </div>
              <div className="link-info" name="Reviews">
                Reviews
              </div>
              <div className="link-info" name="Mentored">
                Mentored
              </div>
              <div className="link-info" name="Requested">
                Requsted
              </div>
              <div
                className="link-info"
                name="Chat"
              >
                Chat with AI
              </div>
              <div className="link-info" name="EditProfile">
                Edit Profile
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Post Section --> */}
        <div className="post-section">
          {genreateComponent()}
        
      </div>
    </div>

  );
};

export default MentorDashboard;
