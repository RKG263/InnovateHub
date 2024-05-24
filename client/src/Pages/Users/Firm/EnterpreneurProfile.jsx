<<<<<<< HEAD
import React from "react";
import "./enterpreneurProfile.css";

const EnterpreneurProfile = () => {
  return (
    <div className="profile">
      <div className="picture">
        <img
          src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
        <div className="rating">STAR</div>
      </div>
      <div className="detail">
        <div className="nameDetail">
          <div className="name">LANA DEL RE</div>
          <div className="user"> Entrepreneur</div>
        </div>
        <div className="bio">
          Please help. I am full of talents. But due to my familly background I
          am unable to grow in my career.
        </div>
        <div className="moreDetail">
          <button>Update profile</button>
          <button>My Mentor</button>
          <button>My investor</button>
        </div>
      </div>
    </div>
  );
};

export default EnterpreneurProfile;
=======
import React, { useState } from "react";
import "./enterpreneurProfile.css";
import Post from "../../../Components/Users/Post.jsx";
import Chat from "../../../Components/Users/Chat.jsx";
import EditProfile from "../../../Components/Users/EditProfile.jsx";
import Meeting from "../../../Components/Users/Meeting.jsx";
import Idea from "../../../Components/Users/Enterpreneur/Idea.jsx";
import Investors from "../../../Components/Users/Enterpreneur/Investors.jsx";
import Mentors from "../../../Components/Users/Enterpreneur/Mentors.jsx";


const EnterpreneurProfile = () => {
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
      case 'Idea':
        return <Idea />
      case 'Investors':
        return <Investors />
      case 'Mentors':
        return <Mentors />
      case 'Meeting':
        return <Meeting />
      default:
        return <Post />
    }


  }


  return (
    <div className="body">
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
        <div className="post-section">
          {genreateComponent()}
        </div>
      </div>
    </div>
  );
};

export default EnterpreneurProfile;
>>>>>>> 88c6bb3cf2ebeafac829d9a4fc75edbf252a9704
