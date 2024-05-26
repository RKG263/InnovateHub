import axios from "axios";

import { URL } from "../../url";
import { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer"
import HomePosts from "../../Components/Blog/HomePost"
import SpinningLoader from "../../Shared/SpinningLoader";


const Home = () => {
  const { isAuthenticated, user, message, error, loading } = useSelector(
    (state) => state.user
  );

  const { search } = useLocation();
  // console.log(search)
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/v1/blog/posts/" + search);
      //console.log(res.data)
      setPosts(res.data.posts);
      if (res.data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(true);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);
  

  return (
    <> <div >
      <Header/>
      <div className="flex justify-center items-center h-40" >
      <div className="text-center">
        <h1 className="text-7xl font-bold mb-4">Immerse Yourself in</h1>
        <h3 className="text-xl text-gray-700">Inspiring Narratives, Emerging Trends, and Lucrative Opportunities.</h3>
      </div>
    </div>
      <div className="px-8 md:px-[200px] min-h-[80vh] mb-2">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
           <SpinningLoader/>
          </div>
        ) : !noResults ? (
          
          posts.map((post,key) => (

            <>
             
              <Link to={user ? `/posts/post-detail/${post._id}` : "/login"}>
             
              
                <HomePosts key={post._id} post={post} />
              </Link>
            </>
          ))
        ) : (
          <h3 className="text-center font-bold mt-16">No posts available</h3>
        )}
      </div>
      <Footer/>
      </div>
    </>
  );
};

export default Home;
