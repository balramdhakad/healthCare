import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import axiosInstance from "../../utilus/axiosInstance";
import ChatSidebar from "./components/ChatSidebar";
import ChatWindow from "./components/ChatWindow";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ChatApp = () => {
  const { userdata } = useSelector((state) => state.auth);
  const token = userdata?.token;
  const userId = userdata?.user?._id;

  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const { id: chatUserId } = useParams();

  useEffect(() => {
    if (!token) return;

    const newSocket = io("http://localhost:8080", {
      auth: { token },
      transports: ["websocket"],
    });

    setSocket(newSocket);

    newSocket.on("getOnlineUser", (online) => setOnlineUsers(online));

    newSocket.on("receiveMessage", (message) => {
      if (
        selectedUser &&
        (message.senderId === selectedUser._id ||
          message.receiverId === selectedUser._id)
      ) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => newSocket.disconnect();
  }, [token, selectedUser]);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/chats/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data) setUsers(res.data);
    } catch (error) {
      toast.error("Failed to fetch users:", error);
    }
  }, [token]);

  const fetchMessages = async (receiverId) => {
    try {
      const res = await axiosInstance.get(`/chats/${receiverId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data || []);
    } catch (error) {
      toast.error("Failed to fetch messages:", error);
    }
  };

  const fetchUserById = async (userId) => {
    try {
      const res = await axiosInstance.get(`/chats/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data);

      setSelectedUser(res.data);
    } catch (error) {
      toast.error("Failed to fetch user by ID:", error);
    }
  };

  useEffect(() => {
    if (token) fetchUsers();
  }, [fetchUsers, token]);

  useEffect(() => {
    if (chatUserId) {
      fetchUserById(chatUserId);
      fetchMessages(chatUserId);
    }
  }, [chatUserId]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    fetchMessages(user?._id);
  };

  return (
    <div className="flex h-[calc(100vh-70px)] bg-gray-100 rounded-lg shadow-lg overflow-hidden">
      <ChatSidebar
        users={users}
        onlineUsers={onlineUsers}
        selectedUser={selectedUser}
        onSelectUser={handleUserSelect}
      />
      <ChatWindow
        selectedUser={selectedUser}
        messages={messages}
        socket={socket}
        currentUserId={userId}
        token={token}
      />
    </div>
  );
};

export default ChatApp;
