import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

import ChatSidebar from "./components/ChatSidebar";
import ChatWindow from "./components/ChatWindow";
import axiosInstance from "../../utilus/axiosInstance";

const ChatApp = () => {
  const { userdata } = useSelector((state) => state.auth);
  const token = userdata?.token;
  const userId = userdata?.user._id;

  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (userId) {
      const newSocket = io("http://localhost:8080", {
        query: { userId },
      });
      setSocket(newSocket);

      newSocket.on("getOnlineUser", (online) => {
        setOnlineUsers(online);
      });

      newSocket.on("newMessage", (message) => {
        if (
          selectedUser &&
          (message.senderId === selectedUser._id ||
            message.receiverId === selectedUser._id)
        ) {
          setMessages((prev) => [...prev, message]);
        }
      });

      return () => newSocket.disconnect();
    }
  }, [userId, selectedUser]);

  const fetchUsers = async () => {
    try {
      const { data } = await axiosInstance.get("/chats/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch chat users:", err);
    }
  };

  const fetchMessages = async (id) => {
    try {
      const { data } = await axiosInstance.get(`/chats/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(data);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex h-screen">
      <ChatSidebar
        users={users}
        onlineUsers={onlineUsers}
        selectedUser={selectedUser}
        onSelectUser={(user) => {
          setSelectedUser(user);
          fetchMessages(user._id);
        }}
      />
      <ChatWindow
        messages={messages}
        selectedUser={selectedUser}
        socket={socket}
        currentUserId={userId}
        token={token}
      />
    </div>
  );
};

export default ChatApp;
