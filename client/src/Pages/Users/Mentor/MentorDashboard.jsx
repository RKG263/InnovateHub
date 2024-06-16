import React, { useState } from "react";
import "./mentorDashboard.css";
import Post from "../../../Components/Users/Post.jsx";
import Chat from "../../../Components/Users/Chat.jsx";
import EditProfile from "../../../Components/Users/EditProfile.jsx";
import Expertise from "../../../Components/Users/Mentor/Expertise.jsx";
import Mentored from "../../../Components/Users/Mentor/Mentored.jsx";
import Requested from "../../../Components/Users/Mentor/Requested.jsx";
import Reviews from "../../../Components/Users/Mentor/Reviews.jsx";
import EditProfilePic from "../../../Components/Users/EditProfilePic.jsx";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MentorDashboard = () => {
  const [currentComponent, setCurrentComponent] = useState("Post");
  const { user } = useSelector (
    (state) => state.user
  );


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

        <div className="flex justify-center items-center flex-col text-center ">

          <img
            src={user?.profile_pic?.url}
            alt=""
            className="profile-img"
          />
          <EditProfilePic />
          <h2 className="font-extrabold text-2xl mb-2">{user?.name}</h2>
          <h3 className="font-semibold text-md mb-4">{user?.role}</h3>

          <p className="user-bio text-[rgb(209,207,207)]">
            {user.aboutMe}
            <br />
            Contact - {user?.contact}
            <br/><br/>
            Email - {user?.email}
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
            <Link
              to='/mentor/create-plan'
            >
            <div
              className="link-info"
              name="Chat"
            >
              Create Plan
            </div>
            
            </Link>
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
