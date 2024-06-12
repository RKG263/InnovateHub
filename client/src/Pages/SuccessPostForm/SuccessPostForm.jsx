import React from "react";
import "./SuccessPostForm.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

const SuccessPostForm = () => {
  return (
    <>
      <Header />
      <div className="success-post-form">
        <div className="success-post-container">
          <h1>Create Your New Success Story</h1>
          <form>
            <div className="success-post-form-group">
              <label for="title">Story Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter the story title"
                required
              />
            </div>
            <div className="success-post-form-group">
              <label for="description">Story Description:</label>
              <textarea
                id="description"
                name="description"
                rows="5"
                placeholder="Write the story description here..."
                required
              ></textarea>
            </div>
            <div className="success-post-form-group">
              <label for="image">Upload Image:</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                required
              />
            </div>
            <div className="success-post-form-group">
              <label for="hashtag">Hashtag:</label>
              <input
                type="text"
                id="hashtags"
                name="hashtags"
                placeholder="example"
                required
              />
            </div>
            <button type="submit">Submit Post</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SuccessPostForm;
