import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../../utilus/axiosInstance";
import MessageBubble from "./MessageBubble";
import { MdCancel } from "react-icons/md";
import { IoMdVideocam } from "react-icons/io";
import { RiAttachmentLine } from "react-icons/ri";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ChatWindow = ({
  selectedUser,
  messages,
  socket,
  currentUserId,
  token,
  chatUserId
}) => {
  const [newMessage, setNewMessage] = useState("");
  const [image, setImage] = useState(null);
  const [localMessages, setLocalMessages] = useState(messages);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setLocalMessages(messages);
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [localMessages]);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const sendMessage = async () => {
    if (!newMessage.trim() && !image) return;
    if (!selectedUser) return;

    const tempMessage = {
      senderId: currentUserId,
      receiverId: selectedUser._id,
      text: newMessage.trim(),
      image: image ? URL.createObjectURL(image) : null,
      temp: true,
    };

    setLocalMessages((prev) => [...prev, tempMessage]);
    setNewMessage("");
    setImage(null);

    try {
      const formData = new FormData();
      formData.append("text", newMessage);
      if (image) formData.append("image", image);

      const res = await axiosInstance.post(
        `/chats/${selectedUser._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const savedMessage = res.data?.message;

      setLocalMessages((prev) =>
        prev.map((msg) =>
          msg.temp && msg.text === tempMessage.text ? savedMessage : msg
        )
      );

      socket?.emit("sendMessage", savedMessage);
    } catch (error) {
      toast.error("Failed to send message:", error);
    }
  };

  if (!selectedUser && !chatUserId)
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Select a user to start chatting 💬
      </div>
    );

  return (
    <div className="flex flex-col flex-1">
      <div className="px-4 py-3 bg-white flex text-blue-800 border-b font-semibold text-lg shadow-sm">
        {selectedUser?.name || "User"}

        <Link to={`/room`} target="_blank" className="ml-auto">
          <IoMdVideocam size={20} />
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {localMessages?.length > 0 ? (
          localMessages.map((msg, i) => (
            <MessageBubble
              key={msg._id}
              message={msg}
              isOwn={msg.senderId === currentUserId}
            />
          ))
        ) : (
          <div className="text-center text-gray-400 mt-10">
            No messages yet. Say hi 👋
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 bg-white border-t flex items-center gap-2">
        {image && (
          <div className="relative">
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              className="w-14 h-14 object-cover rounded-lg border"
            />
            <button
              onClick={() => setImage(null)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
            >
              <MdCancel />
            </button>
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageSelect}
        />

        <button
          onClick={() => fileInputRef.current.click()}
          className="bg-gray-200 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          <RiAttachmentLine />
        </button>

        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
