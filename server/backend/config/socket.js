import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});
const userSocketMap = {};


const getReceiverId = (userId) => {
    return userSocketMap[userId]
}


io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;
  io.emit("getOnlineUser", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUser", Object.keys(userSocketMap));
  });
});


const socketExports  = { io, app, server,getReceiverId };
export default socketExports