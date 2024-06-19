import React, { useState } from "react";
import "./SuccessPostForm.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import toast from "react-hot-toast";
import axios from "axios";
import { Box, Button, styled } from "@mui/material";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useNavigate } from "react-router-dom";

const VisuallyHiddenInput = styled('input')({
  opacity: 0,
  height: 1,
  position: 'absolute',
  bottom: 0,
  left: 0,
  // whiteSpace: 'nowrap',
  width: 1,
});





const SuccessPostForm = () => {

  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {


      let data = new FormData(event.currentTarget);
      // console.log(data.get('showImage'))

      const res = await axios.post(`${import.meta.env.VITE_URL}/api/v1/story/createStory`, data, { withCredentials: true })
      console.log(res.data);
      toast.success("Story Created");
      navigate('/successstorypage')

    } catch (err) {
      toast.error("Something wrong");
      console.error(err);
    }




  }




  return (
    <>
      <Header />

      <div className="success-post-form mt-8 ">
        <div className="success-post-container">
          <h1>Create Your New Success Story</h1>
          <form onSubmit={handleSubmit}>
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

            <Box
              component="div"
              sx={{ overflowY: 'auto', align: 'center' }}
              className="flex justify-center "
            >

              {image && <img
                src={URL.createObjectURL(image)}
                alt="choosed images"
                name="showImage"
                className="max-h-[180px] min-h-[100px] rounded-lg"
              />}
            </Box>

            <Button
              component="label"
              variant="contained"
              startIcon={<AddAPhotoIcon />}
              className="mt-2"
            >
              Upload Image
              <VisuallyHiddenInput
                type="file"
                name="file"
                accept="image/*"
                onChange={(e) => { setImage(e.target.files[0]) }}
              />
            </Button>
          
          
            <div className="success-post-form-group">
              <label for="hashtag">Hashtag:</label>
              <input
                type="text"
                id="hashtags"
                name="category"
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
