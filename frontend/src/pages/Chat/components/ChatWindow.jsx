import React, { useState, useRef, useEffect } from "react";
import Message from "./Message";
import axiosInstance from "../../../utilus/axiosInstance";

const ChatWindow = ({ messages, selectedUser, socket, currentUserId ,token}) => {
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedUser) return;

    const { data } = await axiosInstance.post(
      `/chats/${selectedUser._id}`,
      { text: newMessage },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setNewMessage("");
    socket.emit("newMessage", data.message);
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p>Select a user to start chat</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col justify-between">
      <div className="p-4 overflow-y-auto h-full">
        {messages.map((msg) => (
          <div ref={scrollRef} key={msg._id}>
            <Message message={msg} currentUserId={currentUserId} />
          </div>
        ))}
      </div>

      <div className="p-4 border-t flex space-x-2">
        <input
          type="text"
          className="flex-1 border rounded px-3 py-2"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
