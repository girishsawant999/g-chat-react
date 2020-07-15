import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useHistory, useLocation } from "react-router-dom";
import { socket } from "../serverConfig";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import "./ChatMain.scss";
import ChatMessage from "./ChatMessage";
import picMale from "../assets/images/avatars/pic-1-m.png";
import picFemale from "../assets/images/avatars/pic-2-m.png";

function ChatMain(props) {
  const location = useLocation();
  const history = useHistory();
  const [users, setusers] = useState([]);
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
    const chatList = document.getElementById("chatList");
    const chatContainer = document.getElementById("chatContainer");
    if (!(chatList && chatContainer)) return;
    if (cond) {
      chatList.style.display = "block";
      chatContainer.style.display = "none";
    } else {
      chatList.style.display = "none";
      chatContainer.style.display = "block";
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

    return () => {};
  }, []);
  return (
      <div class="row h-screen mx-0 bg-gray-400 overflow-hidden">
        <div
          id="chatList"
          class="col-md-4 col-12 col-sm-4 px-0 m-hidden border-gray-700 border-r-1 border-blue-700 md:border-r-2 xl:border-r-2 lg:border-r-2"
        >
          <div class="bg-blue-700 text-white text-center py-4">
            <h2>G-Chat</h2>
          </div>
          <div class="row mx-0 py-2">
            <div class="col-md-12 col-sm-12 col-12 text-right">
              <div
                onClick={() => {
                  toggle(false);
                }}
                class="font-medium"
              >
                Start Chat{" "}
                <i class="fa fa-align-justify px-2" aria-hidden="true"></i>
              </div>
            </div>
          </div>
          <div class="row mx-0">
            <div class="col-md-12 col-12 col-sm-12 px-1">
              {Object.values(users).map((user) => (
                <div class="row mx-0 py-2 my-1 bg-gray-200 rounded-lg">
                  <div class="col-md-2 col-sm-2 col-2 self-center">
                    <img
                      src={user.gender === "male" ? picMale : picFemale}
                      alt="profile"
                    />
                  </div>
                  <div class="col-md-10 col-sm-10 col-10 self-center">
                    {user.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div id="chatContainer" class="col-md-8 col-12 col-sm-8 px-0">
          <ChatHeader user={user} logout={logout} toggle={toggle} />
          <div class="row mx-0 rounded-lg">
            <div class="col-md-12 col-12 col-sm-12 py-2 bg-gray-200  overflow-auto chatContainer"></div>
          </div>
          <ChatInput sendMessage={sendMessage} />
        </div>
      </div>
  );
}

export default ChatMain;
