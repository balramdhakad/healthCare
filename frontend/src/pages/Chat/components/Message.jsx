import React from "react";

const Message = ({ message, currentUserId }) => {
  const isSender = message.senderId === currentUserId;

  return (
    <div className={`flex ${isSender ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`p-2 rounded-lg max-w-xs ${
          isSender ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"
        }`}
      >
        {message.text && <p>{message.text}</p>}
        {message.image && (
          <img
            src={message.image}
            alt="message"
            className="max-w-full max-h-60 mt-1 rounded"
          />
        )}
      </div>
    </div>
  );
};

export default Message;
