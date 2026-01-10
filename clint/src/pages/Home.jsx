import React from 'react'
import Header from '../Dashboard/Header'
import Alltask from '../Dashboard/AllTask'

const Home = () => {
  return (
    <div className='w-full relative'>
      <div className='bg-white'>
        <Header/>
      </div>
      <div>
        <Alltask/>
      </div>
    </div>
  )
}

export default Home