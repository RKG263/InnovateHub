import React from "react";
import "./SuccessStories.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { blog } from "../../assets/Data";
import { AiOutlineTags, AiOutlineClockCircle } from "react-icons/ai";

const SuccessStories = () => {
  return (
    <>
      <Header />
      <section className="blog">
        <div className="heading">
          <div className="title">
            Success <br />
            Stories.
          </div>
          <div className="bio">
            Embrace challenges as opportunities to grow and achieve greatness
          </div>
          <div className="link">Add Yours</div>
        </div>

        <div className="grid3">
          {blog.map((item) => (
            <div className="box boxItems" key={item.id}>
              <div className="img">
                <img
                  src="https://images.pexels.com/photos/20704817/pexels-photo-20704817/free-photo-of-allee.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                  alt=""
                />
              </div>
              <div className="details">
                <div className="tag">
                  <AiOutlineTags className="icon" />
                  <a href="/">#{item.category}</a>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc.slice(0, 200)}...</p>
                <div className="date">
                  <AiOutlineClockCircle className="icon" />{" "}
                  <label htmlFor="">{item.date}</label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default SuccessStories;
