import { useNavigate, useParams } from "react-router-dom";
import Comment from "../../Components/Blog/Comment";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { URL, IF } from "../../url";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaThumbsUp, FaThumbsDown, FaShare } from "react-icons/fa";
import SpinningLoader from "./../../Shared/SpinningLoader";
import { toast } from "react-hot-toast";

const PostDetails = () => {
  const { isAuthenticated, user, message, error, loading } = useSelector(
    (state) => state.user
  );

  const postId = useParams().id;

  const [post, setPost] = useState({});
  const [pic, setPic] = useState("https://picsum.photos/seed/picsum/200/300");

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loader, setLoader] = useState(false);
  const [like,setLike]=useState(0);
  const [disLike,setDisLike]=useState(0);
  const [likeData,setLikeData]=useState({});
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/v1/blog/post-detail/" + postId);

      setPost(res.data.post);
     
      // console.log(res.data.post);
    } catch (err) {
      console.log("Error fetching post details:");
      console.error(err);
    }
  };
 


  useEffect(() => {
    if (post && post.picture) {
      setPic(post.picture.url);
    }
  }, [post]);
  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(URL + "/api/v1/blog/delete/" + postId, {
        withCredentials: true,
      });
      // console.log(res);
      toast.success("post deleted successfully");
      navigate("/posts");
    } catch (err) {
      console.log(err);
      toast.error("error in deletion of post");
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPostComments = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/v1/comment/get-all/" + postId);
      setComments(res.data);
      setLoader(false);
    } catch (err) {
      setLoader(true);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPostComments();
  }, [postId]);

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        URL + "/api/v1/comment/create",
        {
          comment: comment,
          author: user.name,
          postId: postId,
          userId: user._id,
        },
        { withCredentials: true }
      );

      // Update the comments state directly without page reload
      setComments([...comments, res.data.newComment]);

      // Clear the comment input field
      setComment("");
    } catch (err) {
      console.log(err);
    }
  };
 // like and unlike ans share handler

 

  return (
    <div>
      <Header />
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center w-full">
          <SpinningLoader />
        </div>
      ) : (
        <div className="px-8 md:px-[200px] mt-8">
          <div className="bg-blue-100 rounded-lg shadow-lg px-6 py-4 mb-8">
            {" "}
            {/* Changed color to light bluish */}
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-black md:text-3xl">
                {post.title}
              </h1>
              {user?._id === post?.userID && (
                <div className="flex items-center justify-center space-x-2">
                  <p
                    className="cursor-pointer"
                    onClick={() => navigate("/post/edit/" + postId)}
                  >
                    <BiEdit />
                  </p>
                  <p className="cursor-pointer" onClick={handleDeletePost}>
                    <MdDelete />
                  </p>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between mt-2 md:mt-4">
              <p>@{post.username}</p>
              <div className="flex space-x-2">
                <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
                <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
              </div>
            </div>
          </div>
          <div className="bg-blue-100 rounded-lg shadow-lg mb-8">
            {" "}
            {/* Changed color to light bluish */}
            <img
              src={pic}
              className="w-full mx-auto max-h-96 object-cover rounded-t-lg"
              alt=""
            />
          </div>
          <div className="bg-blue-100 rounded-lg shadow-lg px-6 py-4 mb-8">
            {" "}
            {/* Changed color to light bluish */}
            <div className="flex items-center mt-4 space-x-4 font-semibold">
              <p>Categories:</p>
              <div className="flex justify-center items-center space-x-2">
                {post.categories?.map((c, i) => (
                  <div key={i} className="bg-blue-200 rounded-lg px-3 py-1">
                    {" "}
                    {/* Changed color to lighter bluish */}
                    {c}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-blue-100 rounded-lg shadow-lg px-6 py-4 mb-8">
            {" "}
            {/* Changed color to light bluish */}
            <h2 className="text-xl font-semibold text-gray-800">Description</h2>
            <p className="mt-2 text-gray-700">{post.description}</p>
          </div>

          {/* Like, Unlike, Share Buttons */}
          <div className="flex mb-4">
            <div className="flex items-center space-x-8">
              <button
                className="bg-blue-500 hover:bg-blue-700 w-relative text-white font-bold py-2 px-4 rounded flex items-center justify-center"
                style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)" }}
                
              >
              <FaThumbsUp />
                <span className="px-4">{like}</span>
                
              </button>
              <span>{post?.likes?.length}</span>
            </div>
            <div className="flex items-center space-x-8">
              <button
                className="bg-blue-500 hover:bg-blue-700 w-relative text-white font-bold py-2 px-4 rounded flex items-center justify-center"
                style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)" }}
                
                
              >
              <FaThumbsDown />
                <span className="px-4">{disLike}</span>
                
              </button>
              <span>{post?.likes?.length}</span>
            </div>
            <button
              className="bg-blue-500  items-center hover:bg-blue-700 w-20 text-white font-bold py-2 px-4 rounded"
              style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)" }}
            >
              <FaShare />
            </button>
          </div>

          <div className="flex flex-col">
            <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
            {comments?.map((c) => (
              <Comment key={c._id} c={c} post={post} />
            ))}
          </div>
          {/* write a comment */}
          <div className="w-full mb-3 flex flex-col mt-4 md:flex-row">
            <input
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment"
              className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0 border border-gray-300 rounded-md"
            />
            <button
              style={{ backgroundColor: "#4CAF50" }} // Teal color
              onClick={postComment}
              className=" text-sm mx-2 text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0 rounded-md"
            >
              Add Comment
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PostDetails;
