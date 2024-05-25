/* eslint-disable react/prop-types */
import {IF} from '../../url.js'


const HomePosts = ({post}) => {
  
  return (
    <div className="w-full flex mt-8 space-x-4">
      {/* Left */}
      <div className="w-[35%] h-[200px] flex justify-center items-center shadow-lg rounded-lg overflow-hidden">
        <img src={post.picture.url} alt="" className="h-full w-full object-cover rounded-lg" />
      </div>
      {/* Right */}
      <div className="flex flex-col w-[65%] bg-white shadow-lg rounded-lg p-4">
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
  );
  
  
  
}

export default HomePosts
