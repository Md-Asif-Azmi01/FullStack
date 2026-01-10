import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [Value, setValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    // e.preventDefault();
    const { name, value } = e.target;
    setValue({ ...Value, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://fullstack-dhix.onrender.com/api/v1/login', Value, { withCredentials: true });
      alert(res.data.message);
      localStorage.setItem("userLoggedin", "yes");
      navigate("/home");
    } catch (error) {
      alert("User not found, please signup");
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="w-[50vw] p-5">
        <div className="p-2">
          <h1 className="text-3xl font-bold mb-1 text-center text-blue-500">
            Task Manager
          </h1>
          <h3 className="text-center font-bold text-zinc-700">
            Login with Task Manager
          </h3>
        </div>
        <div className="w-[50vw] p-5 border border-gray-300 rounded-lg shadow-lg mt-3">
          <form className="flex flex-col gap-2"
          >
            {/* <input type="text" required placeholder="username" className="py-2 px-4 border rounded border-zinc-400 outline-none"/> */}
            <input
              type="email"
              required
              placeholder="email"
              name="email"
              value={Value.email}
              className="py-2 px-4 border rounded border-zinc-400 outline-none"
              onChange={handleChange}
            />
            <input
              type="password"
              required
              placeholder="password"
              name="password"
              value={Value.password}
              className="py-2 px-4 border rounded border-zinc-400 outline-none"
              onChange={handleChange}
            />
            <button onClick={handleSubmit} className="bg-blue-700 hover:bg-blue-600 text-white rounded py-2 px-4 cursor-pointer">
              Login
            </button>
            <p className="mt-4 text-center font-semibold text-gray-800">
              Don't have an account <Link to="/">Signup</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
