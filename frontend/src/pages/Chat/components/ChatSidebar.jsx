import React from "react";

const ChatSidebar = ({ users, onlineUsers, selectedUser, onSelectUser }) => {
  console.log(users)
  return (
    <div className="w-1/4 bg-white border-r border-gray-300 overflow-y-auto">
      <div className="p-4 font-semibold text-lg border-b bg-blue-600 text-white">
        USERs
      </div>

      {users?.length > 0 ? (
        users.map((user) => {
          const isOnline = onlineUsers.includes(user._id);
          return (
            <div
              key={user?._id}
              className={`flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-100 transition ${
                selectedUser?._id === user._id ? "bg-blue-50" : ""
              }`}
              onClick={() => onSelectUser(user)}
            >
              <div>
                <div className="font-medium">{user?.name || user?.role}</div>
                <div className="text-sm text-gray-500">
                  {isOnline ? "Online" : "Offline"}
                </div>
              </div>
              <div
                className={`w-3 h-3 rounded-full ${
                  isOnline ? "bg-green-500" : "bg-gray-400"
                }`}
              ></div>
            </div>
          );
        })
      ) : (
        <div className="p-4 text-gray-400 text-sm">No users found</div>
      )}
    </div>
  );
};

export default ChatSidebar;
