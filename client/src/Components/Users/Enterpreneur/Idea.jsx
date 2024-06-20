import { Avatar, Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


const Idea = () => {

  const [ideas, setIdeas] = useState([]);


    useEffect(()=>{

        // ideas fatched from backend
        axios.get(`${import.meta.env.VITE_URL}/api/v1/entrepreneur/`, { withCredentials: true })
        .then(res => {

          console.log(res.data);
          setIdeas(res.data);});

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
  // const navigate = useNavigate();

  console.log(idea, "form genrate")
    return (
      <>
      <div key={idea._id} className='flex flex-col mb-4 rounded-lg shadow-lg  bg-gradient-to-r from-blue-500 to-green-500 p-4 text-white max-w-[35vw]'>

        <div className='flex m-4 justify-evenly'>

          <div className='flex flex-col w-[50%] '>
            <h1 className='mb-2 font-extrabold text-3xl text-center'> {idea.title}</h1>
            <div className='text-justify p-2'>
              {idea.idea}
            </div>
          </div>

          <div className='flex flex-col w-[48%]  p-2'>

            {/* <div className='flex justify-center items-center mb-8'>
              <Avatar
                sx={{ width: 96, height: 96 }}
                className='border-[3px] border-white '
              />
            </div> */}

            {/* <div className='flex flex-col text-right'>
              <div>Investor Name</div>
              <div>Email</div>
              <div>Contact</div>
            </div> */}
          </div>
        </div>

          <div className='mb-2 pl-2 font-semibold'>
          <Link to = {idea.url}>
            <Button variant='contained' >
          
              View Idea
           
            </Button>
          
          </Link>
          </div>
      </div>

      </>
    )

}