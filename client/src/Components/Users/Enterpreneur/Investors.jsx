import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react'

const Investors = () => {

  const [investors, setInvestors] = useState([1,2,3]);


  useEffect(()=>{

      // ideas fatched from backend


  },[]);



  return (
    <>
    <div className='flex flex-col justify-evenly'>
      {investors?.map(investor=>genrateInvestor(investor))}
      

    </div>

  </>
  )
}

export default Investors;


const genrateInvestor = (investor)=>{
  
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
