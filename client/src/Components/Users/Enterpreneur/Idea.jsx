import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react'

const Idea = () => {

  const [ideas, setIdeas] = useState([1,2,3]);


    useEffect(()=>{

        // ideas fatched from backend


    },[]);


  return (
    <>
      <div className='flex flex-col justify-evenly'>
        {ideas?.map(idea=>genrateIdea(idea))}
        

      </div>

    </>
  )
}

export default Idea


const genrateIdea = (idea)=>{


    

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
              <div>Investor Name</div>
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