import React from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import Register from "./Register";

function Home() {
  return (
    <div className="bg-[#a7bcff] h-[100vh] flex items-center justify-center">
      <div className="border-[1px] border-white border-solid rounded-[10px] w-[65%] h-[80%] flex overflow-hidden" id="main">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default Home;
