import React from "react";

function ChatMessage(props) {
  const left = " rounded-b-lg rounded-tr-lg clear-both float-left ";
  const right = " rounded-b-lg rounded-tl-lg clear-both float-right ";
  const { message } = props;
  return (
    <div
      class={`relative bg-blue-700 text-white p-2 my-2 w-message ${
        message.pos === "left" ? left : right
      }`}>
      {message.message}
      <div
        class={`absolute text-xs text-gray-600 mt-1  ${
          message.pos === "left" ? "left-0 ml-1" : "right-0 mr-1"
        }`}>
        {message.time}
      </div>
    </div>
  );
}

export default ChatMessage;
