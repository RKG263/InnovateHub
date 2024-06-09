import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { URL } from '../../url';

const UserProfile = ({id}) => {
   const [user,setUser]=useState();

   useEffect(()=>{
      
    const handle=async()=>{
      try {
        const result=await axios.get(URL+'/api/v1/other/user/'+id);
        setUser(result.data.newUser);
        
      } catch (error) {
        console.log(error)
      }
    }
    handle();
   },[])
  

  return (
    <div className="flex items-center justify-start p-4">
      <img className="w-12 h-12 rounded-full mr-4" src={user?.profile_pic?.url} alt="User Profile" />
      <div>
        <h3 className="text-lg font-semibold">{user?.name}</h3>
        <p className="text-gray-600">{user?.email}</p>
      </div>
    </div>
  );
}

export default UserProfile;
