import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Post = () => {

  const { user } = useSelector(
    (state) => state.user
  );
  const [myPosts, setMyPosts] = useState([]);


  useEffect(() => {

    axios.get(`${import.meta.env.VITE_URL}/api/v1/blog/post/user/${user._id}`, { withCredentials: true }).then(res => {

      // console.log(res.data)
      setMyPosts(res.data.posts);
    });




  }, []);


  return (
    <div className='flex flex-col justify-evenly shadow-gray-600'>


      {myPosts?.map(post => {
        return (
          <>
          <Link to={user ? `/posts/post-detail/${post._id}` : "/login"}>
            <div className='border  rounded-lg shadow-gray-400 mb-2 p-2' >
              <div className='max-w-[35vw] min-w-[30vw] flex justify-center items-center'>
                <img
                  src={post?.picture?.url}
                  alt="post image"
                  className='aspect-square w-[25%]'

                />
              </div>
              <div className="flex flex-col max-w-[35vw] min-w-[30vw]  bg-white shadow-lg rounded-lg p-4">
                <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
                  {post.title}
                </h1>
                <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
                  <p>@{post.username}</p>
                  <div className="flex space-x-2 text-sm">
                    <p>{new Date(post.updatedAt).toLocaleDateString()}</p>
                    <p>{new Date(post.updatedAt).toLocaleTimeString()}</p>
                  </div>
                </div>
                <p className="text-sm md:text-lg leading-snug">{post.description.slice(0, 200)} ...<span className="text-blue-500">Read more</span></p>
              </div>

            </div>

          </Link>
          </>
        )
      })}
    </div>
  )
}

export default Post
