import React, { useContext } from "react";
import { BsFillCameraVideoFill, BsPersonFillAdd } from "react-icons/bs";
import { FiMoreVertical } from "react-icons/fi";
import { TiUserAdd } from "react-icons/ti";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

function Chat() {
  const { data } = useContext(ChatContext);

  return (
    <div style={{ flex: "2" }} className="" id="Chatbar">
      <div className="h-[60px] bg-[#5d5d8d] flex items-center justify-between p-[15px] text-gray-300">
        <span>{data.user.displayName}</span>
        <div className="flex gap-[10px] items-center">
          <BsFillCameraVideoFill className="w-[26px] h-[26px] cursor-pointer" />
          <TiUserAdd className="w-[26px] h-[26px] ml-[10px] cursor-pointer" />
          <FiMoreVertical className="w-[26px] h-[26px] cursor-pointer" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}

export default Chat;
