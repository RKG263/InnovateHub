import React, { useState } from "react";
import axios from "axios";
import { URL } from "../../url";
import { SlArrowUpCircle } from "react-icons/sl";

function App() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.post(URL + "/api/v1/ai/ask", { prompt });
      setData(res.data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black text-white">
      <div className="bg-gray-900 p-8 rounded-md shadow-md w-full max-w-screen-md">
        <h2 className="text-5xl font-bold mb-4">InnovatorsHub-Ask</h2>
        <div className="chat-container">
          {data && (
            <div className="chat-box">
              <div className="chat-header bg-gray-800 text-white px-4 py-2">
                AI Response
              </div>
              <div className="chat-messages p-4 overflow-y-auto">
                {data.split('\n').map((line, index) => (
                  <p key={index} className="text-gray-300">{line}</p>
                ))}
              </div>
            </div>
          )}
          <form onSubmit={submitHandler}>
            <div className="user-input flex items-center bg-gray-800 rounded-lg shadow-md">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Write a content about..."
                className="flex-1 px-4 py-2 mr-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring focus:ring-blue-400"
              />
              <button
                type="submit"
                className={`bg-gray-800 text-white px-6 py-2 rounded-md text-lg ${
                  isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-black"
                }`}
                disabled={isLoading}
              >
                <SlArrowUpCircle className="text-2xl" />
              </button>
            </div>
          </form>
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
