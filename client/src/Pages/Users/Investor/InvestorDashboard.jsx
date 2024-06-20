import React, { useState } from "react";
import "./investorDashboard.css";
import Post from "../../../Components/Users/Post.jsx";
import Chat from "../../../Components/Users/Chat.jsx";
import EditProfile from "../../../Components/Users/EditProfile.jsx";
import Meeting from "../../../Components/Users/Meeting.jsx";
import Appointment from "../../../Components/Users/Investor/Appointment.jsx";
import Idea from "../../../Components/Users/Investor/Idea.jsx";
import Invested from "../../../Components/Users/Investor/Invested.jsx";
import { useSelector } from "react-redux";
import EditProfilePic from "../../../Components/Users/EditProfilePic.jsx";




const InvestorDashboard = () => {

  const [currentComponent, setCurrentComponent] = useState("Post");
  const { user } = useSelector(
    (state) => state.user
  );


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
      case 'Appointment':
        return <Appointment />
      case 'Idea':
        ; return <Idea />
      case 'Invested':
        return <Invested />
      case 'Meeting':
        return <Meeting />
      default:
        return <Post />
    }


  }



  return (

    <div className="container max-sm:flex-col">
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
            <div className="link-info"
              name="Post"
            >Post</div>
            <div className="link-info"
              name="Idea"
            >Requested Ideas</div>
            <div className="link-info"
              name="Meeting"
            >Meeting Schedule</div>
            <div className="link-info"
              name="Invested"
            >Invested</div>
            <div className="link-info"
              name="Appointment"
            >Appointment</div>
            {/* <div className="link-info"
              name="Chat"
            >Chat</div> */}
            <div className="link-info"
              name="EditProfile"
            >Edit Profile</div>
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

export default InvestorDashboard;
