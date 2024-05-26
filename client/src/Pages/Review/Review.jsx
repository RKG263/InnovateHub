import React from "react";
import "./review.css";

const Review = () => {
  return (
    <div className="review-body">
      <div className="reviews-container">
        <div className="mentor-details">
          <div className="mentor-pic">
            <img
              className="mentor-img"
              src="https://images.pexels.com/photos/3772519/pexels-photo-3772519.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
            />
          </div>
          <div className="reviews-header">
            <h1>Sanjay Kumar / Mentor</h1>
            <p className="average-rating">
              4.5 <span className="stars">★★★★☆</span>
              <span className="total">15 Reviews</span>
            </p>
          </div>
        </div>
        <div className="review">
          <div className="review-details">
            <div className="user">
              <img
                src="https://images.pexels.com/photos/3772519/pexels-photo-3772519.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
                className="profile-img"
              />
              <div className="user-details">
                <h2 className="user-name">John Doe</h2>
                <div className="rating">
                  <span className="stars">★★★★☆</span>
                  <span className="review-time">2 hours ago</span>
                </div>
              </div>
            </div>
            <div className="review-content">
              <p className="review-text">
                Great product! Highly recommend to everyone.Great product!
                Highly recommend to everyone.Great product! Highly recommend to
                everyone.Great product! Highly recommend to everyone.Great
                product! Highly recommend to everyone.
              </p>
            </div>
          </div>
        </div>

        <div className="review">
          <div className="review-details">
            <div className="user">
              <img
                src="https://images.pexels.com/photos/3772519/pexels-photo-3772519.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
                className="profile-img"
              />
              <div className="user-details">
                <h2 className="user-name">John Doe</h2>
                <div className="rating">
                  <span className="stars">★★★★☆</span>
                  <span className="review-time">2 hours ago</span>
                </div>
              </div>
            </div>
            <div className="review-content">
              <p className="review-text">
                Great product! Highly recommend to everyone.Great product!
                Highly recommend to everyone.Great product! Highly recommend to
                everyone.Great product! Highly recommend to everyone.Great
                product! Highly recommend to everyone.
              </p>
            </div>
          </div>
        </div>
        <div className="review">
          <div className="review-details">
            <div className="user">
              <img
                src="https://images.pexels.com/photos/3772519/pexels-photo-3772519.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
                className="profile-img"
              />
              <div className="user-details">
                <h2 className="user-name">John Doe</h2>
                <div className="rating">
                  <span className="stars">★★★★☆</span>
                  <span className="review-time">2 hours ago</span>
                </div>
              </div>
            </div>
            <div className="review-content">
              <p className="review-text">
                Great product! Highly recommend to everyone.Great product!
                Highly recommend to everyone.Great product! Highly recommend to
                everyone.Great product! Highly recommend to everyone.Great
                product! Highly recommend to everyone.
              </p>
            </div>
          </div>
        </div>
        <div className="review">
          <div className="review-details">
            <div className="user">
              <img
                src="https://images.pexels.com/photos/3772519/pexels-photo-3772519.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
                className="profile-img"
              />
              <div className="user-details">
                <h2 className="user-name">John Doe</h2>
                <div className="rating">
                  <span className="stars">★★★★☆</span>
                  <span className="review-time">2 hours ago</span>
                </div>
              </div>
            </div>
            <div className="review-content">
              <p className="review-text">
                Great product! Highly recommend to everyone.Great product!
                Highly recommend to everyone.Great product! Highly recommend to
                everyone.Great product! Highly recommend to everyone.Great
                product! Highly recommend to everyone.
              </p>
            </div>
          </div>
        </div>
        {/* <!-- Add more reviews as needed --> */}
      </div>
    </div>
  );
};

export default Review;
