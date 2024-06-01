import React, { useState } from "react";
import "./enterpreneurDashboard.css";
import Post from "../../../Components/Users/Post.jsx";
import Chat from "../../../Components/Users/Chat.jsx";
import EditProfile from "../../../Components/Users/EditProfile.jsx";
import Meeting from "../../../Components/Users/Meeting.jsx";
import Idea from "../../../Components/Users/Enterpreneur/Idea.jsx";
import Investors from "../../../Components/Users/Enterpreneur/Investors.jsx";
import Mentors from "../../../Components/Users/Enterpreneur/Mentors.jsx";
import { useSelector } from "react-redux";
import EditProfilePic from "../../../Components/Users/EditProfilePic.jsx";

const EnterpreneurDashboard = () => {

  const { user } = useSelector(
    (state) => state.user
  );

  const [currentComponent, setCurrentComponent] = useState("Post");


  const handleClick = (event) => {

    setCurrentComponent(event.target.getAttribute('name'));

  }

  const genreateComponent = () => {
    switch (currentComponent) {
      case 'Post':
        return <Post />
      case 'Chat':
        return <Chat />
      case 'EditProfile':
        return <EditProfile />
      case 'Investors':
        return <Investors />
      case 'Idea':
        ; return <Idea />
      case 'Mentors':
        return <Mentors />
      case 'Meeting':
        return <Meeting />
      default:
        return <Post />
    }


  }


  return (


    <div className="container justify-evenly">
      {/* <!-- Profile Section --> */}


      <div className="profile-section">
        <div className="flex justify-center items-center flex-col text-center ">

          <img
            src={user?.profile_pic?.url}
            alt=""
            className="profile-img"
          />
          <EditProfilePic/>
          <h2 className="font-extrabold text-2xl mb-2">{user?.name}</h2>
          <h3 className="font-semibold text-md mb-4">{user?.role}</h3>

          <p className="user-bio text-[rgb(209,207,207)]">
           {user.aboutMe}
            <br />
            Contact - {user?.contact}
          </p>
        </div>

        <div className="profile-content">

          <div className="link"
            onClick={handleClick}
          >
            <div className="link-info"
              name="Post"
            >Post</div>
            <div className="link-info"
              name="Idea"
            >Ideas Submitted</div>
            <div className="link-info"
              name="Meeting"
            >Meeting Schedule</div>
            <div className="link-info"
              name="Mentors"
            >Mentors</div>
            <div className="link-info"
              name="Investors"
            >Investors</div>
            <div className="link-info"
              name="Chat"
            >Chat</div>
            <div className="link-info"
              name="EditProfile"
            >Edit Profile</div>
          </div>
        </div>
      </div>






      {/* <!-- Post Section --> */}
      <div className="flex  p-2  min-w-[45%] overflow-auto max-h-[100vh]">
        
        {genreateComponent()}
      </div>
    </div>

  );
};

export default EnterpreneurDashboard;
