import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";

function Sidebar() {
  return (
    <div style={{ flex: "1" }} className="bg-[#3e3c61] relative" id="side-bar">
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
}

export default Sidebar;
