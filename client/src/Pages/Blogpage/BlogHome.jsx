import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../Components/Header/Header.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import HomePosts from "../../Components/Blog/HomePost";
import SpinningLoader from "../../Shared/SpinningLoader";

import { URL } from "../../url";

const Home = () => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/v1/blog/posts/" + search);
      setPosts(res.data.posts);
      setNoResults(res.data.posts.length === 0);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);

  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen">
        <div className="flex justify-center items-center h-40">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 max-w-4xl mx-auto px-4">
              Immerse Yourself in
            </h1>
            <h3 className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto px-4">
              Inspiring Narratives, Emerging Trends, and Lucrative
              Opportunities.
            </h3>
          </div>
        </div>

        <div className="px-4 md:px-8 max-w-6xl mx-auto">
          <div className="mt-8">
            {loader ? (
              <div className="h-60 flex justify-center items-center">
                <SpinningLoader />
              </div>
            ) : noResults ? (
              <h3 className="text-center font-bold text-xl text-gray-800 mt-16">
                No posts available
              </h3>
            ) : (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <Link
                    key={post._id}
                    to={isAuthenticated ? `/posts/post-detail/${post._id}` : "/login"}
                  >
                    <HomePosts post={post} />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-16">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
