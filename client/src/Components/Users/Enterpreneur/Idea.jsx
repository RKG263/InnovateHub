import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react'

const Idea = () => {

  const [ideas, setIdeas] = useState([1,2,3,5,5,5,5]);


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

export default Idea;


const genrateIdea = (idea)=>{

    return (
      <>
      <div className='flex flex-col mb-4 rounded-lg shadow-lg  bg-gradient-to-r from-blue-500 to-green-500 p-4 text-white max-w-[35vw]'>

        <div className='flex m-4 justify-evenly'>

          <div className='flex flex-col w-[50%] '>
            <h1 className='mb-2 font-extrabold text-3xl text-center'> Title</h1>
            <div className='text-justify p-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe perspiciatis eveniet quae asperiores, sint in doloremque perferendis praesentium unde, quis a temporibus quos earum? Et aperiam sequi accusamus necessitatibus harum.</div>
          </div>

          <div className='flex flex-col w-[48%]  p-2'>

            <div className='flex justify-center items-center mb-8'>
              <Avatar
                sx={{ width: 96, height: 96 }}
                className='border-[3px] border-white '
              />
            </div>

            <div className='flex flex-col text-right'>
              <div>Investor Name</div>
              <div>Email</div>
              <div>Contact</div>
            </div>
          </div>
        </div>

          <div className='mb-2 pl-2 font-semibold'>
            Status : Pending / Success
          </div>
      </div>

      </>
    )

}