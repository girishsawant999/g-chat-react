import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useHistory, useLocation } from "react-router-dom";
import { socket } from "../serverConfig";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import "./ChatMain.scss";
import ChatMessage from "./ChatMessage";

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
  
  const logout = () =>{
    history.push("/");
  }

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
    const chatList = document.getElementById("chatList")
    const chatContainer = document.getElementById("chatContainer")
    if (! (chatList && chatContainer)) return;
    if(cond) {
      chatList.style.display = "block"
      chatContainer.style.display = "none"
    } else {
      chatList.style.display = "none"
      chatContainer.style.display = "block"
    }

  }

  useEffect(() => {
    socket.emit("new-user-joined", user);
    socket.on("user-joined", (user) => {
      setusers([...users,user])
      addMessage({
        message: `${user.name} joined the chat`,
        pos: "left",
        notice: true,
      });
    });

    socket.on("left", (user) => {
      user && setusers(users.filter((tempUser) => tempUser.name !== user.name));
      user &&
        addMessage({
          message: `${user.name} left the chat`,
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
    <div class="h-screen w-screen">
      
    {console.log('users', users)}
      <div class="row mx-0 bg-gray-400 ">
        <div id="chatList" class="col-md-4 col-12 h-screen col-sm-4 m-hidden border-gray-700 border-r-1 border-blue-700 md:border-r-2 xl:border-r-2 lg:border-r-2">
          <div class="text-white text-center py-3">
            <div class="rounded-full bg-blue-700 py-3">
              <h2>G-Chat</h2>
            </div>
          </div>
          <hr class="mt-0"/>
          <div class="row mx-0 py-2">
            <div class="col-md-12 col-sm-12 col-12 text-right">
              <div onClick={()=>{toggle(false)}}>
                Start Chat <i class="fa fa-align-justify px-2" aria-hidden="true"></i>
              </div>
            </div>
          </div>
          <div class="row mx-0">
            {users.map(user => 
              <div class="py-2">
                {user.name} &nbsp;&nbsp; {user.gender}
              </div>
            )}
          </div>
        </div>
        <div id="chatContainer" class="col-md-8 col-12 col-sm-8 px-0">
          <ChatHeader user={user} logout={logout} toggle={toggle}/>
          <div class="row mx-0 rounded-lg">
            <div class="col-md-12 col-12 col-sm-12 py-2 bg-gray-200  overflow-auto chatContainer"></div>
          </div>
          <ChatInput sendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
}

export default ChatMain;
