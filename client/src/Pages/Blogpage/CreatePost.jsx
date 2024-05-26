import { ImCross } from "react-icons/im";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";
import { URL } from "../../url";
import {toast} from 'react-hot-toast'
const CreatePost = () => {
  const { user } = useSelector((state) => state.user);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);

  const deleteCategory = (indexToDelete) => {
    setCats((prevCats) => {
      return prevCats.filter((_, index) => index !== indexToDelete);
    });
  };

  const addCategory = () => {
    let updatedCats = [...cats];
    updatedCats.push(cat);
    setCat("");
    setCats(updatedCats);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Display the selected image preview
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setImagePreview(null);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
  
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", desc);
    formData.append("username", user.name);
    formData.append("userID", user._id);
    formData.append("categories", cats); 
  
    
    formData.append("file", file);
   
  
    try {
   
      const res = await axios.post(URL + "/api/v1/blog/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
         
        },
        withCredentials: true, 
      });
      toast.success("posted successfully")
      navigate("/posts");
      console.log(res.data);
    } catch (err) {
      console.log(err);
      toast.error("error in posting")
    }
  };
  

  return (
    <>
      <Header />
      <div className="min-h-screen my-3 w-90 bg-1976d2 flex flex-col justify-center items-center ">
        <div  className="w-full max-w-md  shadow-lg rounded-lg overflow-hidden   ">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-bold mb-4 text-center">
              Create a Post
            </h1>
            <input
              type="text"
              placeholder="Enter post title"
              value={title}
              onChange={handleTitleChange}
              className="input-field mb-4 bg-gray-100 rounded-lg py-2 px-4 text-gray-800 focus:outline-none"
            />
            
            <div className="flex items-center mb-4">
              <input
                type="text"
                placeholder="Enter post category"
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="input-field mr-2 flex-grow bg-gray-100 rounded-lg py-2 px-4 text-gray-800 focus:outline-none"
              />
              <button
                style={{ backgroundColor: "#1976d2" }}
                type="button"
                onClick={addCategory}
                className="btn-1976d2 px-2 py-2 mb-3 text-white rounded-lg"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap mb-4">
              {cats.map((c, i) => (
                <div
                  style={{ backgroundColor: "#1976d2" }}
                  key={i}
                  className="category-tag mr-2 mb-2 flex items-center bg-gray-200 px-2 py-1 rounded-md"
                >
                  <p className="mr-1 text-white">{c}</p>
                  <button
                    onClick={() => deleteCategory(i)}
                    className="delete-btn p-1 text-sm rounded-full bg-1976d2 text-white"
                  >
                    <ImCross />
                  </button>
                </div>
              ))}
            </div>
            <div
              style={{ height: "150px" }}
              className="shadow-lg rounded-lg overflow-hidden "
            >
              <textarea
                rows={10}
                placeholder="Enter post description"
                value={desc}
                onChange={handleDescChange}
                className="input-field mb-4 w-full resize-none p-5 bg-gray-100 rounded-lg text-gray-800 focus:outline-none"
                style={{ backgroundColor: "#fff", color: "#000" }} // Override background and text color
              />
            </div>
            <label className="block mb-4">
              <div style={{backgroundColor:'#1976d2', paddingLeft:"38%"}} className="w-full text-white font-bold my-4 py-2  rounded-lg focus:outline-none">
                Upload Image
              </div>
              <input
                onChange={handleFileChange}
                type="file"
                className="hidden"
              />
            </label>
            {imagePreview && (
              <div className="mb-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-40 h-32 object-cover rounded-lg"
                />
              </div>
            )}
            <div className="flex justify-center">
              <button
                onClick={handleCreate}
                style={{ backgroundColor: "#1976d2" }}
                className="btn-1976d2 w-full text-white font-bold my-4 py-2 px-4 rounded-lg focus:outline-none"
              >
                Create Post
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreatePost;
