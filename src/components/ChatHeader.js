import React from "react";
import picMale from "../assets/images/avatars/pic-1-m.png";
import picFemale from "../assets/images/avatars/pic-2-m.png";

function ChatHeader(props) {
  return (
    <div class="row mx-0 py-2 bg-gray-400">
      <div class="col-md-2 col-sm-3 col-3">
        <div class="w-16 h-16 rounded-full inline-flex items-center justify-center bg-blue-500 text-gray-600">
          <img
            src={props.user.gender === "male" ? picMale : picFemale}
            alt="profile"
          />
        </div>
      </div>
      <div class="col-md-8 col-sm-7 col-7 flex">
        <h2 class="font-medium title-font text-gray-900 text-2xl self-center">
          {props.user.name}
        </h2>
      </div>
      <div class="col-md-2 col-sm-2 col-2 flex justify-center">
        <div class="row mx-0 self-center">
          <div class="col-md-6 col-sm-6 col-6 px-0">
            <i
              onClick={() => {
                props.toggle(true)
              }}
              class="fa fa-ellipsis-v text-xl m-display px-2"
              aria-hidden="true"
            ></i>
          </div>
          <div class="col-md-6 col-sm-6 col-6 px-0">
            <i
              class="fa fa-times-circle text-xl px-2"
              onClick={props.logout}
              aria-hidden="true"
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
