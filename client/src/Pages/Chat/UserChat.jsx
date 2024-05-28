import React, { useEffect, useState, useRef } from "react";
import ChatNavBar from "../../Components/Chat/ChatNavBar";
import { FaUserCircle, FaRegPaperPlane } from "react-icons/fa";
import axios from "axios";
import { URL } from "../../url";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { format } from "timeago.js";
import EmojiPicker from "emoji-picker-react";
const Chat = () => {
  const { isAuthenticated, user, error, loading } = useSelector(
    (state) => state.user
  );
  const [receiver, setReceiver] = useState(null);
  const [chat, setChat] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const sender = user?._id;
  const receiverId = useParams().id;

  // Establishing a connection to the Socket.io server
  const socket = useRef(null);

  useEffect(() => {
    // Creating a Socket.io client instance
    socket.current = io("http://localhost:4000");

    // Handling connection events
    socket.current.on("connect", () => {
      console.log("Connected to Socket.io server");
    });

    // Handling disconnection events
    socket.current.on("disconnect", () => {
      console.log("Disconnected from Socket.io server");
    });

    // Cleanup function to disconnect from the server when the component unmounts
    return () => {
      socket.current.disconnect();
    };
  }, []);

  // Joining the chat room upon component mount
  useEffect(() => {
    socket.current.emit("join", sender);

    // Listening for private messages
    socket.current.on("private_message", (msg) => {
      setReceivedMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Cleanup function to remove the listener when the component unmounts
    return () => {
      socket.current.off("private_message");
    };
  }, [sender]);

  // Function to fetch receiver data based on the receiver ID
  const receiverData = async () => {
    try {
      const response = await axios.get(
        URL + "/api/v1/other/user/" + receiverId
      );
      setReceiver(response.data.newUser);
    } catch (error) {
      console.log(error, "error on fetching detail using user id in chat");
    }
  };

  // Fetching receiver data when the receiver ID changes
  useEffect(() => {
    receiverData();
  }, [receiverId]);

  // Function to get the chat ID between the sender and receiver
  const getChatId = async () => {
    try {
      const res = await axios.get(
        URL + "/api/v1/chat/find/" + sender + "/" + receiverId
      );
      setChatId(res?.data?._id);
    } catch (error) {
      console.log(error, "error in finding chat id");
    }
  };

  // Fetching the chat ID when the sender or receiver ID changes
  useEffect(() => {
    getChatId();
  }, [sender, receiverId]);

  // Function to fetch the chat messages
  const getChats = async () => {
    try {
      const res = await axios.get(URL + "/api/v1/message/" + chatId);
      setChat(res.data);
      setReceivedMessages(res.data);
    } catch (error) {
      console.log("error in finding chat", error);
    }
  };

  // Fetching chat messages when the chat ID changes
  useEffect(() => {
    getChats();
  }, [chatId]);

  // Ref for scrolling to the bottom of the chat messages
  const chatMessagesRef = useRef(null);

  // Scroll to the bottom of the chat messages when they update
  const scrollToBottom = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  // Function to handle sending a message
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const msg = {
        text: message,
        senderId: sender,
      };
      // Emitting a private message event to the server
      socket.current.emit("private_message", { recipientId: receiverId, msg });
      // Sending the message to the server API
      const res = await axios.post(URL + "/api/v1/message", {
        text: message,
        senderId: sender,
        chatId,
      });
      // Clearing the message input after sending
      setMessage("");
      console.log(res);
      // Adding the sent message to the list of received messages
      setReceivedMessages((prevMessages) => [...prevMessages, msg]);
    } catch (error) {
      console.log("error in submit handler", error);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white text-black relative">
      {" "}
      {/* Changed background to white */}
      {/* Chat Navigation Bar */}
      <ChatNavBar />
      {/* Side by Side Container */}
      <div className="flex justify-between h-full relative">
        {/* Profile Box */}
        <div className="p-2 bg-gray-200 w-1/4 min-w-300px shadow-md z-10">
          {" "}
          {/* Changed background to light gray */}
          <div className="flex flex-col items-center justify-center text-center">
            <div style={{ position: "relative", width: 200, height: 200 }}>
              <img
                src={"https://picsum.photos/200/300"}
                alt="User Avatar"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "80%",
                  height: "80%",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </div>
            <h6 className="text-3xl font-bold">@{receiver?.name}</h6>
            <p className="text-lg text-gray-700">{receiver?.email}</p>{" "}
            {/* Changed text color to dark gray */}
            <p className="text-xs">Description</p>{" "}
            {/* Fixed typo in "Description" */}
          </div>
        </div>
        {/* Chat Box */}
        <div
          className="flex flex-col w-full relative bg-gray-100 shadow-lg"
          style={{ height: "90%" }}
        >
          {/* Chat Messages */}
          <div
            ref={chatMessagesRef}
            className="p-2 bg-gray-100 flex-1 w-full rounded-lg overflow-y-auto"
          >
            {/* Mapping through received messages */}
            {receivedMessages.map((data, key) => (
              <div key={key}>
                {sender === data.senderId ? ( // Check if sender is the user
                  <div className="flex justify-end mb-3 mr-10">
                    <div className="max-w-xs px-4 py-2 bg-green-400 text-gray-100 rounded-lg shadow-md">
                      <div>{data.text}</div>{" "}
                    
                      <span style={{ fontSize: "0.8rem" }}>
                        {format(data.createdAt)}
                      </span>{" "}
                     
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-start mb-3 ml-10">
                    <div className="max-w-xs px-4 py-2 bg-blue-400 text-white rounded-lg shadow-md">
                    <div>{data.text}</div>{" "}
                    
                      <span style={{ fontSize: "0.8rem" }}>
                        {format(data.createdAt)}
                      </span>{" "}
                     
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Message Input Box */}
          <div className="flex items-center py-2 px-4 bg-gray-100 z-20">
            <input
              className="flex-1 border-none outline-none mr-2 p-4  rounded-full bg-gray-200 text-black"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white hover:bg-blue-600"
              onClick={handleOnSubmit}
            >
              <FaRegPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
