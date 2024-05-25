import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react'

const Mentors = () => {

  const [mentors, setMentors] = useState([1,2,3]);


  useEffect(()=>{

      // ideas fatched from backend


  },[]);



  return (
    <>
    <div className='flex flex-col justify-evenly'>
      {mentors?.map(mentor=>genrateMentor(mentor))}
      

    </div>

  </>
  )
}

export default Mentors;


const genrateMentor = (mentor)=>{
  
  return (
    <>
    <div className='flex flex-col mb-4 border border-black'>

      <div className='flex  '>

        <div className='flex flex-col w-[50%]'>
          <div>Title</div>
          <div>Idea</div>
        </div>

        <div className='flex flex-col w-[48%]'>

          <div className='flex justify-center items-center'>
            <Avatar/>
          </div>

          <div className='flex flex-col'>
            <div>Mentor Name</div>
            <div>Email</div>
            <div>Contact</div>
          </div>
        </div>
      </div>

        <div>
          Status : Pending / Success
        </div>
    </div>

    </>
  )

}