import React from 'react'
import TaskCard from './TaskCard'

const InProgress = ({data}) => {
  return (
    <div className='flex flex-col gap-2'>
        {data && data.map((item,i) => <TaskCard key={i} data={item}/>)}
    </div>
  )
}

export default InProgress