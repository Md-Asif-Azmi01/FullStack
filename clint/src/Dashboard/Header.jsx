import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom'
// import {IoLogOutOutLine} from 'react-icons/io5'

const Header = () => {
    const Navigate = useNavigate();
    const addtaskbutton = () => {
        Navigate('/addtask');
    }
    const logout = async() => {
        try {
            const res = await axios.post('/api/v1/logout',{});  
            alert(res.data.message);
            localStorage.clear("userLoggedin");
            Navigate('/login');
        } catch (err) {
            Navigate('/login');
            console.log(err);
        }
        
    }

  return (
    <div className='flex px-12 py-4 items-center justify-between border-b'>
        <div>
            <h1 className='text-2xl text-blue-800 font font-semibold'>Task Tracker</h1>
        </div>
        <div className='flex gap-8'>
            <button className='hover:text-blue-800 transition-all duration-300'
            onClick={addtaskbutton}>
                Add Task
            </button>
            <button className='px-3 py-2 text-white border rounded-md bg-red-700 text-2xl hover:bg-red-500 transition-all duration-300'
            onClick={logout}>
                Logout
            </button>
        </div>
    </div>
  )
}

export default Header