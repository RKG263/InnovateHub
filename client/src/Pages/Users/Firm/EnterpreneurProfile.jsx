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