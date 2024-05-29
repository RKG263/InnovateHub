import React, { useState } from "react";
import { format } from "timeago.js";
import axios from "axios";
import { URL } from "../../url";
const MapMessage = ({ sender, receivedMessages ,OnDelete }) => {
  const [openedMenuIndex, setOpenedMenuIndex] = useState(null);

 
  console.log(receivedMessages[0]?._id)

  return (
    <>
      {receivedMessages.map((data, key) => (
       
        <div key={key}>
          {sender === data.senderId ? (
            <div className="flex justify-end mb-3 mr-10 relative">
              {" "}
              {/* Added relative positioning */}
              <div className="max-w-xs px-4 py-2 bg-green-400 text-gray-100 rounded-lg shadow-md relative">
                <div>{data.text}</div>
                <span style={{ fontSize: "0.8rem" }}>
                  {format(data.createdAt)}
                </span>
                {/* Dropdown menu */}
                <div className="absolute top-0.5 right-0.5 mt-0.2">
                  {/* Dropdown button */}
                  <button
                    className="inline-flex justify-center w-8 h-8 items-center text-gray-500 hover:bg-green-400 rounded-full focus:outline-none"
                    onClick={() =>
                      setOpenedMenuIndex(key === openedMenuIndex ? null : key)
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.5 7a1.5 1.5 0 00-3 0v.5h3v-.5zm4 0a1.5 1.5 0 00-3 0v.5h3v-.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {/* Dropdown menu content */}
                  {key === openedMenuIndex && (
                    <div className="absolute z-20 right-0.5 -top-4 mt-10 w-32 bg-white rounded-md shadow-lg">
                      
                      <button
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={()=>OnDelete(data?._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-start mb-3 ml-10">
              <div className="max-w-xs px-4 py-2 bg-blue-400 text-gray-100 rounded-lg shadow-md">
                <div>{data.text}</div>
                <span style={{ fontSize: "0.8rem" }}>
                  {format(data.createdAt)}
                </span>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default MapMessage;
