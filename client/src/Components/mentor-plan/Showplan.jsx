import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
const Showplan = ({ ind, item ,id,onDelete}) => {
  const { isAuthenticated, user, message, error, loading } = useSelector(
    (state) => state.user
  );

  
 
  return (
    <div className="relative bg-gradient-to-br from-blue-400 via-cyan-500 to-blue-600 m-4 w-full max-w-sm h-96 flex flex-col justify-between items-center p-6 border border-transparent shadow-lg rounded-2xl transform transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
     {user._id===id &&  <button className="absolute top-4 right-4 text-blue-900 hover:text-red-700 focus:outline-none"  onClick={onDelete} >
        <FontAwesomeIcon icon={faTrash} />
      </button>}
      <div className="text-3xl font-bold text-green-200 mb-4">
        ${item.price}
      </div>
      <div className="text-center mb-4">
        <h2 className="text-2xl font-semibold text-white mb-2">{item.title}</h2>
        <p className="text-gray-200">{item.description}.</p>
      </div>
      <div className="flex mb-4">
        <FontAwesomeIcon icon={faStar} className="text-yellow-300" />
        <FontAwesomeIcon icon={faStar} className="text-yellow-300" />
        <FontAwesomeIcon icon={faStar} className="text-yellow-300" />
        <FontAwesomeIcon icon={faStar} className="text-yellow-300" />
        <FontAwesomeIcon icon={faStar} className="text-yellow-300" />
      </div>
      <div className="w-full flex justify-between items-center mt-4">
        <span className="text-gray-200 text-lg">{item.duration} months</span>
        {
          user._id!=id && <button className="bg-white text-blue-600 py-2 px-6 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
          Subscribe
        </button>
        }
      </div>
    </div>
  );
}

export default Showplan;
