import React, { useState } from "react";

function ChatInput(props) {
  const [message, setmessage] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.sendMessage(message) && setmessage('')
      }}
    >
      <div class="row py-2 bg-gray-400">
        <div class="col-md-10 px-0">
          <input
            onInput={(e) => setmessage(e.target.value)}
            value={message}
            class="justify-center w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2"
            placeholder="Enter your message"
            type="text"
            autoFocus
          />
        </div>
        <div class="col-md-2">
          <button
            type="submit"
            class="text-white w-full bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
          >
            Send
          </button>
        </div>
      </div>
    </form>
  );
}

export default ChatInput;
