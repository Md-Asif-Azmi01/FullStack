import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Ragister = () => {

  const navigate = useNavigate();

  const [Value, setValue] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange  = (e) => {
    // e.preventDefault();
    const {name, value} = e.target;
    setValue({...Value, [name]: value});
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const res = await axios.post('http://localhost:3000/api/v1/register', Value);
        alert(res.data.message);   
        navigate('/login');   
    } catch (error) {
        alert(error.response.data.error);        
    }
  }

//   console.log(Value);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="w-[50vw] p-5">
        <div className="p-2">
          <h1 className="text-3xl font-bold mb-1 text-center text-blue-500">
            Task Manager
          </h1>
          <h3 className="text-center font-bold text-zinc-700">
            Register with Task Manager
          </h3>
        </div>
        <div className="w-[50vw] p-5 border border-gray-300 rounded-lg shadow-lg mt-3">
          <form className="flex flex-col gap-2"
          onSubmit={handleSubmit}>
            <input
              type="text"
              required
              placeholder="username"
              name="username"
              className="py-2 px-4 border rounded border-zinc-400 outline-none"
              value={Value.username}
              onChange={handleChange}
            />
            <input
              type="email"
              required
              placeholder="email"
              name="email"
              className="py-2 px-4 border rounded border-zinc-400 outline-none"
              value={Value.email}
              onChange={handleChange}
            />
            <input
              type="password"
              required
              placeholder="password"
              name="password"
              className="py-2 px-4 border rounded border-zinc-400 outline-none"
              value={Value.password}
              onChange={handleChange}
            />
            <button className="bg-blue-700 hover:bg-blue-600 text-white rounded py-2 px-4 cursor-pointer">
              submit
            </button>
            <p className="mt-4 text-center font-semibold text-gray-800">
              Already have an account <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Ragister;
