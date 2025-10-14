import React from "react";
import { IoIosChatboxes } from "react-icons/io";

import { Link } from "react-router-dom";

const ChatButton = ({ id }) => {
  return (
    <>
      <Link to={`/chat/${id}`}>
        <IoIosChatboxes size={25} color="blue" />
      </Link>
    </>
  );
};

export default ChatButton;
