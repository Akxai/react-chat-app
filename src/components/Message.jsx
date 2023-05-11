import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

function Message({ message }) {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const isOwner = message.senderId === currentUser.uid;

  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [message]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`flex gap-[20px] mb-[20px] box-content ${
        isOwner ? "owner" : ""
      }`}
    >
      <div className="flex flex-col font-light text-gray-500">
        <img
          src={isOwner ? currentUser.photoURL : data.user.photoURL}
          className="w-[40px] h-[40px] rounded-full object-cover"
        />
        <span>just now</span>
      </div>
      <div className="max-w-[80%] flex flex-col gap-[10px] items-end">
        <p
          className={`bg-white p-[10px] rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px] max-w-max ${
            isOwner ? "" : "mr-auto"
          }`}
        >
          {message.text}
        </p>
        {message.img && (
          <img
            src={message.img}
            className={`w-[50%] rounded-md ${isOwner ? "" : "mr-auto"}`}
            id="message-img"
          />
        )}
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
}

export default Message;
