import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useHistory, useLocation } from "react-router-dom";
import { socket } from "../serverConfig";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatListMob from "./ChatListMob";
import ChatListWeb from "./ChatListWeb";
import "./ChatMain.scss";
import ChatMessage from "./ChatMessage";

function ChatMain(props) {
  const location = useLocation();
  const history = useHistory();
  const [users, setusers] = useState([]);
  const [typingUser, settypingUser] = useState(null);
  if (!(location && location.state && location.state.user)) {
    history.push("/");
  }
  const { user } = location && location.state;

  const sendMessage = (message) => {
    if (!message) return;
    addMessage({ message: `You : ${message}`, pos: "right", notice: true });
    socket.emit("send", message);
    return true;
  };

  const logout = () => {
    history.push("/");
  };

  const typing = (isTyping) => {
    console.log("object", isTyping);
    socket.emit("typing", isTyping);
  };
  const addMessage = (message) => {
    const chatContainer = document.querySelector(".chatContainer");
    let ele = document.createElement("div");
    ReactDOM.render(<ChatMessage message={message} />, ele);
    chatContainer.append(ele);
    if (message.pos === "left") {
      var audio = new Audio("../assets/tones/Notification.mp3");
      audio.play();
    }
    chatContainer.scrollTop = chatContainer.scrollHeight;
  };
  const toggle = (cond) => {
    const ele = document.getElementById("chatlistmob");
    if (ele.classList.contains("-m-margin-screen")) {
      ele.classList.remove("-m-margin-screen");
      ele.classList.add("m-margin-screen");
    } else {
      ele.classList.add("-m-margin-screen");
      ele.classList.remove("m-margin-screen");
    }
  };

  useEffect(() => {
    let USERID;
    socket.emit("new-user-joined", user);
    socket.on("get-users-list", (userId, allUsers) => {
      delete allUsers[userId];
      USERID = userId;
      setusers(allUsers);
    });
    socket.on("user-joined", (userId, allUsers) => {
      delete allUsers[USERID];
      setusers(allUsers);
      allUsers[userId] &&
        addMessage({
          message: `${allUsers[userId].name} joined the chat`,
          pos: "left",
          notice: true,
        });
    });

    socket.on("left", (userId, allUsers) => {
      delete allUsers[USERID];
      setusers(allUsers);
      allUsers[userId] &&
        addMessage({
          message: `${allUsers[userId].name} left the chat`,
          pos: "left",
          notice: true,
        });
    });

    socket.on("receive", (data) => {
      addMessage({
        message: `${data.user.name} : ${data.message}`,
        pos: "left",
        notice: true,
      });
    });

    socket.on("typing-Waiting", (user) => {
      console.log("typing-user", user);
      settypingUser(user);
    });

    return () => {};
  }, []);
  return (
    <div class="row h-screen mx-0 bg-gray-400 overflow-hidden">
      <div
        id="chatList"
        class="col-md-4 col-12 col-sm-4 none md:block px-0 border-gray-700 border-r-1 border-blue-700 md:border-r-2 xl:border-r-2 lg:border-r-2">
        <ChatListWeb toggle={toggle} users={users} />
      </div>
      <div id="chatContainer" class="col-md-8 col-12 col-sm-8 px-0">
        <ChatHeader
          user={user}
          logout={logout}
          toggle={toggle}
          typingUser={typingUser}
        />
        <div class="row mx-0 rounded-lg">
          <div class="col-12 py-2 bg-gray-200  overflow-auto chatContainer"></div>
        </div>
        <ChatInput sendMessage={sendMessage} typing={typing} />
      </div>
      <div class="col-12 block md:none px-0 border-gray-700 border-r-1 border-blue-700 md:border-r-2 xl:border-r-2 lg:border-r-2">
        <ChatListMob toggle={toggle} users={users} />
      </div>
    </div>
  );
}

export default ChatMain;
