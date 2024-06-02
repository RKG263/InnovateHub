import React, { useEffect, useState, useRef } from "react";
import ChatNavBar from "../../Components/Chat/ChatNavBar";
import { FaUserCircle, FaRegPaperPlane } from "react-icons/fa";
import axios from "axios";
import { URL } from "../../url";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";

import EmojiPicker from "emoji-picker-react";
import MapMessage from "../../Components/Chat/MapMessage";
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
// drop down menu for edit and delete
  const [isMenuOpen, setIsMenuOpen] = useState(false);

 
  const socket = useRef(null); 

  useEffect(() => {
    
    socket.current = io(`${import.meta.env.VITE_SOCKET_URL}`);
  
    socket.current.on("connect", () => {
      console.log("Connected to Socket.io server");
    });

   
    socket.current.on("disconnect", () => {
      console.log("Disconnected from Socket.io server");
    });

   
    return () => {
      socket.current.disconnect();
    };
  }, []);

  const chatCreate=async()=>{
    try {
      if(receiverId!=null &&  sender!=null){
        const rsp=await axios.post(URL+'/api/v1/chat',{
          senderId:sender,
          receiverId
        })
        console.log(rsp)
      }
   
    } catch (error) {
     console.log(error)
    }
}
  useEffect(()=>{
      
      chatCreate()
  },[sender,receiverId])
 
  useEffect(() => {
    socket.current.emit("join", sender);

   
    socket.current.on("private_message", (msg) => {
      setReceivedMessages((prevMessages) => [...prevMessages, msg]);
    });

   
    return () => {
      socket.current.off("private_message");
    };
  }, [sender]);

 
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

  
  useEffect(() => {
    receiverData();
  }, [receiverId]);

 
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

 
  useEffect(() => {
    getChatId();
  }, [sender, receiverId,chatCreate]);

 
  const getChats = async () => {
    try {
      const res = await axios.get(URL + "/api/v1/message/" + chatId);
      setChat(res.data);
      setReceivedMessages(res.data);
    } catch (error) {
      console.log("error in finding chat", error);
    }
  };

 
  useEffect(() => {
    getChats();
  }, [chatId]);

 
  const chatMessagesRef = useRef(null);

 
  const scrollToBottom = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);
// handle on msg dlt
const handleOnDelete=async(id)=>{
  try {
    const del=await axios.delete(URL+'/api/v1/message/delete/'+ id)
    
  } catch (error) {
    console.log(error,"error on deltion")
  }
}
 
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const msg = {
        text: message,
        senderId: sender,
      };
    
      socket.current.emit("private_message", { recipientId: receiverId, msg });
     
      const res = await axios.post(URL + "/api/v1/message", {
        text: message,
        senderId: sender,
        chatId,
      });
      
      setMessage("");
      // console.log(res);
      
      setReceivedMessages((prevMessages) => [...prevMessages, msg]);
    } catch (error) {
      console.log("error in submit handler", error);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white text-black relative">
      {" "}
     
      <ChatNavBar />
      {/* Side by Side Container */}
      <div className="flex justify-between h-full relative">
        {/* Profile Box */}
        <div className="p-2 bg-gray-200 w-1/4 min-w-300px shadow-md z-10">
          {" "}
         
          <div className="flex flex-col items-center justify-center text-center">
            <div style={{ position: "relative", width: 200, height: 200 }}>
              <img
                src={receiver?.profile_pic?.url || "https://picsum.photos/200/300"}
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
           
            <p className="text-xs">Description</p>{" "}
           
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
            <MapMessage receivedMessages={receivedMessages} OnDelete={handleOnDelete} sender={sender} />
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
