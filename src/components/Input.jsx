import React, { useContext, useState } from "react";
import { IoMdAttach } from "react-icons/io";
import { BiImageAdd } from "react-icons/bi";
import { IoMdSend } from "react-icons/io";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

function Input() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          // setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
  return (
    <div className="h-[50px] bg-white p-[15px] flex justify-between items-center">
      <input
        type="text"
        name="text"
        id=""
        placeholder="Type Something..."
        className="outline-none w-[100%] pr-[10px] text-[#2f2d52] text-[18px]"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="flex justify-end gap-[10px] items-center cursor-pointer">
        <IoMdAttach className="w-[24px] h-[24px] text-slate-400" />
        <input
          type="file"
          name="file"
          id="file"
          className="hidden"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <BiImageAdd className="w-[24px] h-[24px] cursor-pointer text-slate-400" />
        </label>
        <button
          className="bg-[#2f2d52] text-white p-[10px] rounded-full"
          onClick={handleSend}
        >
          <IoMdSend />
        </button>
      </div>
    </div>
  );
}

export default Input;
