import React from "react";
import "./investorProfile.css";

const InvestorProfile = () => {
  return (
    <div className="user-dashboard">
      <div className="user-container">
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
            <div className="link">
              <div className="link-info">Requested Ideas</div>
              <div className="link-info">Meeting Schedule</div>
              <div className="link-info">Invested</div>
              <div className="link-info">Appointment</div>
              <div className="link-info">Chat</div>
              <div className="link-info">Edit Profile</div>
            </div>
          </div>
        </div>
        {/* <!-- Post Section --> */}
        <div className="post-section">
          <h2>Posts</h2>
          <p>This is where the user's posts will be displayed.</p>
        </div>
      </div>
    </div>
  );
};

export default InvestorProfile;
