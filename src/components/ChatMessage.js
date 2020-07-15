import React from "react";

function ChatMessage(props) {
  const left = " rounded-b-lg rounded-tr-lg clear-both float-left ";
  const right = " rounded-b-lg rounded-tl-lg clear-both float-right ";
  const { message } = props;
  return (
    <div
      class={`bg-blue-700 text-white p-2 my-2 max-w-message ${
        message.pos === "left" ? left : right
      }`}>
      {message.message}
    </div>
  );
}

export default ChatMessage;
