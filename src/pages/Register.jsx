import React, { useState } from "react";
import Add from "../Images/fox.png";
import { FcAddImage } from "react-icons/fc";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            console.log("File available at", downloadURL);
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          });
        }
      );
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="bg-[#a7bcff] h-[100vh] flex items-center justify-center">
      <div className="bg-white py-[20px] px-[60px] rounded-[10px] flex flex-col gap-[10px] items-center">
        <span className="text-[#5d5d8d] font-bold text-2xl">Chat App</span>
        <span className="text-[#5d5d8d] text-sm">Register</span>
        <form className="flex flex-col gap-[15px]" onSubmit={handleSubmit}>
          <input
            className="p-[15px] border-b-[1px] border-b-solid border-b-[#a7bcff] w-[250px]"
            type="text"
            name="text"
            placeholder="Display Name"
          />
          <input
            className="p-[15px] border-b-[1px] border-b-solid border-b-[#a7bcff] w-[250px]"
            type="email"
            name="email"
            placeholder="Email"
          />
          <input
            className="p-[15px] border-b-[1px] border-b-solid border-b-[#a7bcff] w-[250px]"
            type="password"
            name="password"
            placeholder="Password"
          />
          <input
            className="p-[15px] border-b-[1px] border-b-solid border-b-[#a7bcff] w-[250px] hidden"
            type="file"
            name="file"
            id="file"
          />
          <label
            htmlFor="file"
            className="flex items-center gap-[10px] text-[#8da4f1] text-sm cursor-pointer"
          >
            <FcAddImage className="w-[32px] h-[32px]" />
            <span>Add an Avatar</span>
          </label>
          <button
            className="bg-[#7b96ec] text-white p-[10px] font-bold rounded-md"
            type="submit"
          >
            Sign Up
          </button>
          {err && (
            <span className="font-bold text-red-600 text-center ">
              Something went WRONG!
            </span>
          )}
        </form>
        <p className="text-sm text-[#5d5d8d] m-[10px]">
          Have an account!? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
