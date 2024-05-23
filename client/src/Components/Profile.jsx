import React from 'react'
import EnterpreneurProfile from '../Pages/Users/Firm/EnterpreneurProfile.jsx';
import AdminProfile from '../Pages/AdminPages/AdminProfile.jsx';
import MentorProfile from '../Pages/Users/Mentor/MentorProfile.jsx';
import InvestorProfile from '../Pages/Users/Investor/InvestorProfile.jsx';
import { useDispatch, useSelector } from 'react-redux';




const Profile = () => {

     const {user } = useSelector(state => state.user) ;

  return (
    <> 
    {
       user.role === 'Mentor' ? (
              <MentorProfile/>
       ) : user.role === 'Investor' ? (
         <InvestorProfile/>
       ) :(
            <EnterpreneurProfile/>
       )
    }
    </>
  )
}

export default Profile