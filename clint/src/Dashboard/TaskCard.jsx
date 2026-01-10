import React from "react";
import { useNavigate } from "react-router-dom";

const TaskCard = ({data}) => {

  const Navigate = useNavigate();
  const navigate = () => {
    
    Navigate(`/gettask/${data._id}`);
  };

  return (
    <button
    onClick={navigate}
     className="bg-white rounded w-full px-4 py-2 hover:shadow transition-all duration-300 ">
      <div className="flex items-center justify-between">
        <h1 className="">{data.title}</h1>
        <div className={`text-sm ${data.priority ==='low' ?  'text-green-500 bg-green-100' : data.priority ==='medium' ? 'bg-yellow-100 text-yellow-500' : 'bg-red-100 text-red-500'}  px-3 py-1 rounded`}>
          <p>{data.priority}</p>
        </div>
      </div>
      <hr className="my-2" />
      <p className="text-sm text-zinc-500 text-start">
        {data.description}
      </p>
    </button>
  );
};

export default TaskCard;
