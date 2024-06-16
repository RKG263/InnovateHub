import React, { useEffect, useState } from "react";
import "./SuccessStories.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { blog } from "../../assets/Data";
import { AiOutlineTags, AiOutlineClockCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
          <Link 
          to="/success-stories/form"
          >
            
          <div className="link">Add Yours</div>
          </Link>
        </div>

        {generateSuccessStories()}
      </section>
      <Footer />
    </>
  );
};

export default SuccessStories;



const  generateSuccessStories = ()=>{

  const [stories, setStories] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{

    axios.get(`${import.meta.env.VITE_URL}/api/v1/story/getStories`, {withCredentials : true})
    .then(data=>{
      console.log(data.data);
      setStories(data.data.result);
    })


  },[])
  
  const handleClick = (item)=>{
    navigate(`/success-stories/${item._id}`, {
      state: {
        item
      }
    })
  }


  return (
    <>
      <div className="grid3">
          {stories.map((item) => (
            <div className="box boxItems cursor-pointer" 
            key={item._id}
            onClick = {()=>{handleClick(item)}}
            >
              <div className="img">
                <img
                  src={item?.picture?.url || "https://images.pexels.com/photos/20704817/pexels-photo-20704817/free-photo-of-allee.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load`"}
                  alt="image"
                />
              </div>
              <div className="details">
                <div className="tag">
                  <AiOutlineTags className="icon" />
                  <a href="/">#{item.category}</a>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description.slice(0, 200)}...</p>
                <div className="date">
                  <AiOutlineClockCircle className="icon" />{" "}
                  <label htmlFor="">{item.createdDate.slice(0,10)}</label>
                </div>
              </div>
            </div>
          ))}
        </div>
    </>
  );
}