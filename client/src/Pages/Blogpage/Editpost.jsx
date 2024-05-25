import { useEffect, useState } from "react";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { URL } from "../../url";
import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

const EditPost = () => {
  const postId = useParams().id;
  const { isAuthenticated, user, message, error, loading } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/v1/blog/post-detail/" + postId);
      setTitle(res.data.post.title);
      setDesc(res.data.post.description);
      setFile(res.data.post.picture);
      setCats(res.data.post.categories);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
  
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", desc);
    formData.append("username", user.name);
    formData.append("userID", user._id);
    formData.append("categories", cats); 
  
    
    formData.append("file", file);
   console.log(formData)
  
    try {
   
      const res = await axios.put(URL + "/api/v1/blog/update/"+postId, formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
         
        },
        withCredentials: true, 
      });
      navigate("/posts");
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
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

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const deleteCategory=(i)=>{
    let updatedCats=[...cats]
    updatedCats.splice(i,1)
    setCats(updatedCats)
 }
  

  const addCategory = () => {
    let updatedCats = [...cats];
    updatedCats.push(cat);
    setCat("");
    setCats(updatedCats);
  };
  return (
    <div>
      <Header />
      <div className="px-6 md:px-[200px] mt-8">
        <h1 className="font-bold md:text-4xl text-xl mb-6">Update Post</h1>
        <form className="w-full flex flex-col space-y-6 md:space-y-8">
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Enter post title"
            className="input-field"
          />
         
          <div className="flex flex-col">
            <div className="flex items-center space-x-4 md:space-x-8">
              <input
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="input-field"
                placeholder="Enter post category"
                type="text"
              />
              <div
                onClick={addCategory}
                className="bg-blue-500  hover:bg-blue-600 rounded-md text-white font-semibold mb-5 px-5 py-2 cursor-pointer"
              >
                Add
              </div>
            </div>
            <div className="flex px-4 mt-3">
            {cats.map((c, i) => (
                <div
                  
                  key={i}
                  className="category-tag mr-2 mb-2 flex items-center bg-blue-500 px-2 py-1 rounded-md"
                >
                  <p className="mr-1 text-white">{c}</p>
                  <p
                    onClick={()=> deleteCategory(i)}
                    className="delete-btn p-1 text-sm rounded-full bg-1976d2 text-white"
                  >
                    <ImCross />
                  </p>
                </div>
              ))}
            </div>
          </div>
          <label className="block mb-4" style={{ width: "25%" }}>
            <div className="w-full px-4 text-white font-bold my-4 py-2 bg-blue-500 rounded-lg focus:outline-none">
              Upload Image
            </div>
            <input onChange={handleFileChange} type="file" className="hidden" />
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
          <div className="description-box shadow-lg p-4 rounded-lg">
            <textarea
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              rows={8}
              className="input-field w-full"
              placeholder="Enter post description"
            />
          </div>
          <button
            style={{ marginBottom: "10px" }}
            onClick={handleUpdate}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold  px-4 py-2 text-lg rounded-lg"
          >
            Update
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditPost;
