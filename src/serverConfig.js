import socketIOClient from "socket.io-client";

const BE_URL = "https://g-chat-v2.herokuapp.com/"

let socket;
socket = socketIOClient(BE_URL);

export {socket};