// import { useState } from 'react'
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Register from "./pages/Ragister";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useEffect } from "react";
import AddTask from "./component/AddTask";
import EditTask from "./component/EditTask";

function App() {
  const Navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userLoggedin")) {
      Navigate("/home");
    } else {
      Navigate("/");
    }
  }, []);

 

  return (
    <>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/addtask" element={<AddTask />} />
          <Route path="/gettask/:id" element={<EditTask />} />
        </Routes>
    </>
  );
}

export default App;
