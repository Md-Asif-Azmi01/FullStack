import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditTask = () => {

    const {id} = useParams();

  const [Value, setValue] = useState({
    title: "",
    priority: "low",
    status: "yetToStart",
    description: "",
  });

  const change = (e) => {
    setValue({ ...Value, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchTaskDetail = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/v1/gettask/`+id,{
                withCredentials: true
            });
            console.log(res.data.taskDetails);
            setValue(res.data.taskDetails);
        } catch (error) {
            console.log(error,"error in getting one userdata");
        }    
    };
    fetchTaskDetail();
  }, []);

  const edittask = async (e) => {
    e.preventDefault();
    console.log("Sending data:", Value);
    try {
      const res = await axios.put("http://localhost:3000/api/v1/edittask/"+id, Value,{
        withCredentials: true
      });
      console.log("Response:", res.data);
      alert("Task Updated successfully!");
      Navigate("/home");
    } catch (error) {
      console.log("Error:", error);
      alert(error.response?.data?.error || "An error occurred");
    }
  };

  const deleteTask = async (e) => {
    e.preventDefault();
    console.log("Deleting task with id:", Value._id);
    try {
      const res = await axios.delete("http://localhost:3000/api/v1/deletetask/"+Value._id);
      console.log("Response:", res.data);
      alert("Task Deleted successfully!");
      Navigate("/home");
    } catch (error) {
      console.log("Error:", error);
      alert(error.response?.data?.error || "An error occurred");
    }
  };

  const Navigate = useNavigate();
  const cancel = () => {
    Navigate("/home");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-zinc-100">
      <div className="bg-white rounded-xl px-4 py-4 w-[40%] border-zinc-500 shadow-2xl">
        <h1 className="text-center font-semibold text-xl">Edit Task</h1>
        <hr className="mb-4 mt-2" />
        <form method="POST" className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={Value.title}
            onChange={(e) => change(e)}
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
              onClick={edittask}
              className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-500 transition-all duration-300 rounded cursor-pointer"
            >
              Update Task
            </button>
             <button
              type="delete"
              onClick={deleteTask}
              className="ml-2 bg-red-600 text-white px-4 py-2 hover:bg-red-500 transition-all duration-300 rounded cursor-pointer"
            >
              Delete Task
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

export default EditTask;
