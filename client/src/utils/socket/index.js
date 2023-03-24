import SocketIOClient, { io } from "socket.io-client";
let socket;
export const initializeSocket = (url) => {
  console.log("Initializing socket...", url);
  socket = io(url);
};

export const getSocketFunctions = () => {
  if (socket.connected) {
    console.log("Socket connected, returning funtions...");
    return { on: socket.on, emit: socket.emit, id: socket.id };
  } else {
    console.log("Socket not connected, returning null...");
    return null;
  }
};

export const socketConnection = {
  socket,
  initializeSocket(url) {
    this.socket = io(url);
  },
  getSocketFunctions() {
    return this.socket;
  },
};
