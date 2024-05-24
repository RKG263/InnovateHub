import React from "react";
import "./enterpreneurProfile.css";

const EnterpreneurProfile = () => {
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
            <div className="link" onClick={handleClick}>
              <div className="link-info" name="Post">
                Post
              </div>
              <div className="link-info" name="Idea">
                Ideas Submitted
              </div>
              <div className="link-info" name="Meeting">
                Meeting Schedule
              </div>
              <div className="link-info" name="Mentors">
                Mentors
              </div>
              <div className="link-info" name="Investors">
                Investors
              </div>
              <div className="link-info" name="Chat">
                Chat
              </div>
              <div className="link-info" name="EditProfile">
                Edit Profile
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Post Section --> */}
        <div className="post-section">{genreateComponent()}</div>
      </div>
    </div>
  );
};

export default EnterpreneurProfile;
