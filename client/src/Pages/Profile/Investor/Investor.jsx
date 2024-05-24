import React from "react";
import "./investor.css";

const Investor = () => {
  return (
    <div className="profile">
      <div className="profile-container">
        <div className="profile-header">
          <img
            src="https://img.freepik.com/free-vector/abstract-black-texture-background-hexagon_206725-413.jpg?size=626&ext=jpg"
            alt=""
            className="background-img"
          />
          <div className="profile-content">
            <img
              src="https://images.pexels.com/photos/3772519/pexels-photo-3772519.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
              className="profile-img"
            />
            <div className="user-info">
              <h1 className="user-name">John Doe / Investor</h1>
              <p className="user-bio">
                A motivated individual with in-depth knowledge of languages and
                development tools, seeking a position in a growth-oriented
                company.
              </p>
              <div className="navigation">
                <button className="nav-btn">Entrepreneur</button>
                <button className="nav-btn">Resources</button>
                <button className="nav-btn">Message</button>
              </div>
            </div>
          </div>
        </div>
        <div className="posts-section">
          <h2>User's Posts</h2>
          <div className="post">Post 1 content goes here...</div>
          <div className="post">Post 2 content goes here...</div>
          {/* <!-- Add more posts as needed --> */}
        </div>
      </div>
    </div>
  );
};

export default Investor;
