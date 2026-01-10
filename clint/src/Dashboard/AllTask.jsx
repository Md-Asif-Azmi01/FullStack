import React, { useEffect, useState } from 'react'
import Settitle from './Settitle'
import YetToStart from './YetToStart'
import InProgress from './InProgress'
import Completed from './Completed'
import axios from 'axios'

const Alltask = () => {
    // const [tasksyet, settasksyet] = useState();
    // const [tasksin, settasksin] = useState();
    const [task, settask] = useState();

    useEffect(() => {

        const fetchUserdata = async() => {
            try {  
                  
                const res = await axios.get("http://localhost:3000/api/v1/userdetails", {
                    withCredentials:true
                });
                settask(res.data.tasks);
                console.log(res.data.tasks)                       
            } catch (error) {
                console.log(error)
            }
        };
        fetchUserdata();
        

    }, [])
    

    // useEffect(() => {
    //     const fetchdata = async() => {
    //         try {
    //             const res = await axios.get('http://localhost:3000/api/v1/userdetails',{
    //                 withCredentials: true
    //                 });
    //             // console.log(res.data.completed) 
    //             settasksyet(res.data.yetToStart);
    //             settasksin(res.data.inprogress);
    //             settasksc(res.data.completed);               
    //         } catch (error) {
    //              alert(error, 'error in useeffect in alltask');   
    //              console.log("error in alltask useeffect", error);                             
    //         }
    //     }
    //     fetchdata();
    // }, [])
    // console.log(tasksyet);
    // console.log(tasksin);
    // console.log(tasksc);

    // console.log(task[0].yetToStart);

    
  return (
    <div>
        <div className='flex flex-col text-center items-center justify-center text-blue-400 text-5xl'><h1> All Task </h1></div>
        <div className='flex gap-4 px-12 py-4 bg-blue-50 min-h-[80.6vh] max-h-auto'>
            <div className='w-1/3'>
            <Settitle title="Yet To Start"/>
            <div className='pt-2'>
               {task && <YetToStart data={task[0].yetToStart}/>}
            </div>
            </div>
            <div className='w-1/3'>
            <Settitle title="In Progress"/>
            <div className='pt-2'>
                {task && <InProgress data={task[0].inProgress}/>}
            </div>
            </div>
            <div className='w-1/3'>
            <Settitle title="Completed"/>
            <div className='pt-2'>
                {task && <Completed data={task[0].completed}/>}
            </div>
            </div>
            
        </div>
    </div>
  )
}

export default Alltask