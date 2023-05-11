import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="flex items-center bg-[#2f2d52] h-[50px] p-[10px] justify-between text-[#ddddf7]">
      <span className="font-bold" id="logo">
        Chat App
      </span>
      <div className="gap-[10px] flex">
        <img
          className="w-[24px] h-[24px] bg-white rounded-full object-cover"
          src={currentUser.photoURL}
        />
        <span className="">{currentUser.displayName}</span>
        <button
          className="bg-[#5d5d8d] text-[#ddddf7] text-xs p-[4px] rounded-md"
          id="logout"
          onClick={() => signOut(auth)}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
