import React from "react";

const ChatSidebar = ({ users, onlineUsers, onSelectUser, selectedUser }) => {
  return (
    <div className="w-64 border-r border-gray-200 overflow-y-auto">
      <h2 className="text-xl font-bold p-4">Chats</h2>
      <ul>
        {users.map((user) => {
          const isOnline = onlineUsers.includes(user._id);
          return (
            <li
              key={user._id}
              onClick={() => onSelectUser(user)}
              className={`p-3 cursor-pointer flex justify-between items-center ${
                selectedUser?._id === user._id ? "bg-gray-200" : ""
              }`}
            >
              <span>{user.name}</span>
              {isOnline && (
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatSidebar;
