import React from "react";
import picMale from "../assets/images/avatars/pic-1-m.png";
import picFemale from "../assets/images/avatars/pic-2-m.png";
import "./ChatMain.scss";

function ChatListWeb(props) {
  return (
    <div class="m-hidden">
      <div class="bg-blue-700 text-white text-center text-xl font-medium py-3">
        Online Buddies
      </div>
      <div class="row mx-0">
        <div class="col-12 px-1 h-screen overflow-y-auto">
          {Object.values(props.users).map((user) => (
            <div class="row mx-0 py-2 my-1 bg-gray-200 rounded-lg">
              <div class="col-3 self-center">
                <img
                  class="max-h-50"
                  src={user.gender === "male" ? picMale : picFemale}
                  alt="profile"
                />
              </div>
              <div class="col-9 self-center">{user.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatListWeb;
