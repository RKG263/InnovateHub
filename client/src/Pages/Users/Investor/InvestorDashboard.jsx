import React, { useState } from "react";
import "./investorDashboard.css";
import Post from "../../../Components/Users/Post.jsx";
import Chat from "../../../Components/Users/Chat.jsx";
import EditProfile from "../../../Components/Users/EditProfile.jsx";
import Meeting from "../../../Components/Users/Meeting.jsx";
import Appointment from "../../../Components/Users/Investor/Appointment.jsx";
import Idea from "../../../Components/Users/Investor/Idea.jsx";
import Invested from "../../../Components/Users/Investor/Invested.jsx";




const InvestorDashboard = () => {

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
    
      <div className="container">
        {/* <!-- Profile Section --> */}
        <div className="profile-section">
          <div className="profile-content">
            <img
              src="https://images.pexels.com/photos/3781545/pexels-photo-3781545.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
              className="profile-img"
            />
            <h2 className="user-name">URFI JAVED</h2>

            <p className="user-bio">
              Innovating solutions to create a better tomorrow.
              <br />
              Contact - 9087890878
            </p>
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
        <div className="post-section">
        {genreateComponent()}
         </div>
      </div>
    
  );
};

export default InvestorDashboard;
