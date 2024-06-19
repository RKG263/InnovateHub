/* eslint-disable react/prop-types */
import { IF } from '../../url.js';

const HomePosts = ({ post }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-8">
      {/* Featured Image */}
      <div className="relative h-80 overflow-hidden">
        <img src={post.picture.url} alt={post.title} className="absolute inset-0 w-full h-full object-cover object-center" />
      </div>

      {/* Post Details */}
      <div className="p-6">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
          {post.title}
        </h1>

        {/* Author and Date */}
        <div className="flex items-center mb-4 text-gray-600 text-sm">
          <span className="mr-2">@{post.username}</span>
          <span>&bull;</span>
          <span className="ml-2">{new Date(post.updatedAt).toLocaleDateString()}</span>
        </div>

        {/* Post Content */}
        <p className="text-lg leading-relaxed text-gray-700 mb-4 h-24">
          {post.description.slice(0,100) + "..."}
        </p>

        {/* Read more */}
        <a href="#" className="text-blue-500 hover:underline">Read more</a>
      </div>
    </div>
  );
}

export default HomePosts;
