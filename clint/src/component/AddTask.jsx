import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("userLoggedin")) {
      navigate('/login');
    }
  }, [navigate]);
  const [Value, setValue] = useState({
    title: "",
    status: "yetToStart",
    priority: "low",
    description: "",
  });

  const change = (e) => {
    setValue({ ...Value, [e.target.name]: e.target.value });
  };

  const addtask = async(e) => {
    e.preventDefault();
    console.log('Sending data:', Value);
    try {
       const res = await axios.post('http://localhost:3000/api/v1/addtask', Value,{
        withCredentials: true
       });
       console.log('Response:', res.data);
       alert('Task added successfully!');
       Navigate('/home');
    } catch (error) {
        console.log('Error:', error.response);
        alert(error.response?.data?.error || 'An error occurred');
    }
  }

  const Navigate = useNavigate();
  const cancel = () => {
    Navigate("/home");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-zinc-100">
      <div className="bg-white rounded-xl px-4 py-4 w-[40%] border-zinc-500 shadow-2xl">
        <h1 className="text-center font-semibold text-xl">Add Task</h1>
        <hr className="mb-4 mt-2" />
        <form method="POST" className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={Value.title}
            onChange={change}
            className="border px-2 py-1 rounded border-zinc-300 outline-none"
          />
          <div className="flex items-center justify-between gap-3">
            <div className="w-full">
              <h3 className="mb-2">Select Priority</h3>
              <select
                name="priority"
                onChange={change}
                id=""
                className="border px-2 py-1 rounded border-zinc-300 outline-none w-full"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="w-full">
              <h3 className="mb-2">Select Status</h3>
              <select
                name="status"
                onChange={change}
                id=""
                className="border px-2 py-1 rounded border-zinc-300 outline-none w-full"
              >
                <option value="yetToStart">Yet to Start</option>
                <option value="inprogress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          <textarea
            name="description"
            value={Value.description}
            onChange={change}
            id=""
            placeholder="Description"
            className="border px-2 py-1 rounded border-zinc-300 outline-none w-full"
          ></textarea>
          <div className="flex items-center justify-end">
            <button
              type="submit"
              onClick={addtask}
              className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-450 transition-all duration-300 rounded cursor-pointer"
            >
              Add Task
            </button>
            <button
              onClick={cancel}
              type="reset"
              className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-450 transition-all duration-300 rounded ml-3 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
