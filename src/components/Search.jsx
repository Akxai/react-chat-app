import React, { useContext, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { FiSearch } from "react-icons/fi";

function Search() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] }); // Corrected line
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}
    setUser(null);
    setUsername("");
  };
  return (
    <div className="">
      <div className="p-[10px] border-b-[0.5px] border-b-solid border-b-gray flex justify-between content-center">
        <input
          className="bg-transparent text-white outline-none w-[90%]"
          type="text"
          name="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <FiSearch className="font-bold text-[25px] text-white mt-1" />
      </div>
      {err && (
        <span className="font-bold text-red-600 text-center z-3">
          User not FOUND!
        </span>
      )}
      {user && (
        <div
          className="p-[10px] flex items-center gap-[10px] text-white cursor-pointer hover:bg-[#2f2d52]"
          onClick={handleSelect}
        >
          <img
            src={user.photoURL}
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
          <div id="chat-name">
            <span className="text-[18px] font-bold">{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
