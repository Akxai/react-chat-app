import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="bg-[#a7bcff] h-[100vh] flex items-center justify-center">
      <div className="bg-white py-[20px] px-[60px] rounded-[10px] flex flex-col gap-[10px] items-center">
        <span className="text-[#5d5d8d] font-bold text-2xl">Chat App</span>
        <span className="text-[#5d5d8d] text-sm">Login</span>
        <form className="flex flex-col gap-[15px]" onSubmit={handleSubmit}>
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

          <button
            className="bg-[#7b96ec] text-white p-[10px] font-bold rounded-md"
            type="submit"
          >
            Sign In
          </button>
          {err && (
            <span className="font-bold text-red-600 text-center ">
              Something went WRONG!
            </span>
          )}
        </form>
        <p className="text-sm text-[#5d5d8d] m-[10px]">
          Don't have an account!? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
