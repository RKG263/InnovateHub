import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
const SearchBox = ({ onSearch }) => {
  const { isAuthenticated, user, message, error, loading } = useSelector(
    (state) => state.user
  );
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center space-x-2 relative w-80 h-10 bg-white rounded-full shadow-md mr-8 max-lg:w-[10.5rem]">
      <input
        onChange={(e) => setPrompt(e.target.value)}
        className="outline-none px-4 py-2 w-full rounded-full bg-transparent focus:outline-none text-zinc-900"
        placeholder="Search a post"
      />

      <button
        onClick={() => navigate(prompt ? "?search=" + prompt : navigate("/"))}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
      >
        <BsSearch className="text-gray-500" />
      </button>
    </div>
  );
};

export default SearchBox;
