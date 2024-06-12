import React, { useState } from "react";
import "./SuccessPost.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { AiOutlineClockCircle, AiOutlineTags } from "react-icons/ai";

const SuccessPost = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <>
      <Header />
      <div className="success-post">
        <div className="success-post-container">
          <div className="success-post-user-info">
            <img
              src="https://images.pexels.com/photos/4917824/pexels-photo-4917824.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="User Profile Picture"
              className="success-post-profile-pic"
            />
            <div className="success-post-user-details">
              <h2 className="success-post-user-name">Anjali Maurya</h2>
              <p className="success-post-user-designation">Entreprenuer</p>
            </div>

            {isAdmin ? (
              <button className="success-post-connect-btn">REMOVE</button>
            ) : (
              <button className="success-post-connect-btn">CONNECT</button>
            )}
          </div>

          <div className="success-post-content">
            <img
              src="https://images.pexels.com/photos/4917824/pexels-photo-4917824.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Post Image"
              className="success-post-image"
            />
            <div className="success-post-details">
              <div className="success-post-tag">
                <AiOutlineTags className="success-post-icon" />
                <a href="/">#Technology</a>
              </div>
              <h3>AI is taking all the jobs.</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                veritatis qui iste! Aspernatur quidem placeat excepturi, magnam
                vel natus adipisci quaerat architecto unde modi perferendis
                doloremque? Mollitia ipsum, officiis fuga consectetur nobis eum
                debitis beatae libero nemo aspernatur distinctio sint quisquam
                quod necessitatibus asperiores culpa quam ut iusto natus
                corporis eveniet incidunt rerum ipsa at! Modi sint corporis
                mollitia isi eveniet eos fugiat dolores nobis ad beatae quam
                quo? Quis obcaecati perferendis nihil alias. Delectus, rem
                nesciunt? Alias accusamus officiis eaque rem molestias, commodi
                at porro sequi, eum vel incidunt, ullam deserunt est
                necessitatibus et eius doloremque iusto suscipit odit
                dignissimos vero perferendis omnis itaque sed. Dolor
                necessitatibus nam magnam officia eius! Blanditiis, aspernatur
                enim deserunt amet magni ab ut dolor eligendi.
              </p>
              <div className="success-post-date">
                <AiOutlineClockCircle className="success-post-icon" />{" "}
                <label htmlFor="">Posted on: January 1, 2024</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SuccessPost;
