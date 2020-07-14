import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useHistory, useLocation } from "react-router-dom";
import { socket } from "../serverConfig";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import "./ChatMain.scss";
import ChatMessage from "./ChatMessage";

var audio = new Audio("../assets/tones/Notification.mp3");

function ChatMain(props) {
  console.log("audio", audio);
  const location = useLocation();
  const history = useHistory();
  const [users, setusers] = useState([]);
  if (!(location && location.state && location.state.user)) {
    history.push("/");
  }
  const { user } = location.state;


  const sendMessage = (message) => {
    if (!message) return;
    addMessage({ message: `You : ${message}`, pos: "right", notice: true });
    socket.emit("send", message);
    return true;
  };

  const addMessage = (message) => {
    const chatContainer = document.querySelector(".chatContainer");
    let ele = document.createElement("div");
    ReactDOM.render(<ChatMessage message={message} />, ele);
    chatContainer.append(ele);
    if (message.pos === "left") audio.play();
    chatContainer.scrollTop = chatContainer.scrollHeight;
  };

  useEffect(() => {
    console.log('user', user)
    socket.emit("new-user-joined", user);
    socket.on("user-joined", (user) => {
      setusers([...users, { name: user.name, gender: user.gender }]);
      addMessage({
        message: `${user.name} joined the chat`,
        pos: "left",
        notice: true,
      });
    });
  
    socket.on("left", (user) => {
      setusers(users.filter((tempUser) => tempUser.name !== user.name)); 
      addMessage({ message: `${user.name} left the chat`, pos: "left", notice: true });
    });
  
    socket.on("receive", (data) => {
      console.log("data", data);
      addMessage({
        message: `${data.user.name} : ${data.message}`,
        pos: "left",
        notice: true,
      });
    });
  
    return () => {};
  }, []);

  return (
    <div class="row h-screen w-screen bg-gray-200 ">
      <div class="col-md-4 col-12 col-sm-12 px-0 bg-gray-400"></div>
      <div class="col-md-8 col-12 col-sm-12 px-0">
        <ChatHeader user={user} />
        <div class="row bg-gray-200 rounded-lg">
          <div class="col-md-12 py-2 overflow-auto chatContainer"></div>
        </div>
        <ChatInput sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default ChatMain;
