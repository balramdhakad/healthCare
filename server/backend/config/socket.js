import { log } from "console";
import express from "express";
import http from "http";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";


const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return decoded.userId;
  } catch {
    return null;
  }
};


const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const userSocketMap = {};

const getReceiverId = (userId) => {
  return userSocketMap[userId];
};

io.on("connection", (socket) => {
  const token = socket.handshake.auth?.token;
  console.log(`token : ${token}`)
  const userId = verifyToken(token);

  console.log(`user is connected ${userId} :: ${socket.id}`)

  if (!userId) {
    socket.disconnect(true);
    return;
  }

  socket.join(userId);
  userSocketMap[userId] = socket.id;
  io.emit("getOnlineUser", Object.keys(userSocketMap));

  socket.on("sendMessage", (msg) => {
    io.to(msg.receiverId).emit("receiveMessage", msg);
  });

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUser", Object.keys(userSocketMap));
  });
});


const socketExports = { io, app, server, getReceiverId };
export default socketExports;
