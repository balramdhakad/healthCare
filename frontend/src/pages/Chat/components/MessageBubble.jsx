import { Link } from "react-router-dom";

const MessageBubble = ({ message, isOwn }) => {
  const renderTextWithLinks = (text, isOwn) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      const linkColor = isOwn ? 'text-blue-800' : 'text-blue-700';

      return (
        <Link to={part}
          key={index} 
          target="_blank" 
          className={`${linkColor} underline hover:text-opacity-80 transition-opacity`}
        >
          {part}
        </Link>
      );
    }

    return part;
  });
};
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`px-4 py-2 rounded-2xl max-w-xs break-words ${
          isOwn
            ? "bg-blue-200 text-black rounded-br-none"
            : "bg-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        {message.text && 
        <p className="m-0 p-0">
            {renderTextWithLinks(message.text, isOwn)}
          </p>
        
        // <p>{message.text}</p>
        
        }
        {message.image && (
          <img
            src={message.image}
            alt="sent"
            className="rounded-lg mt-2 max-h-60 object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
