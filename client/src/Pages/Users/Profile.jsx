import React from 'react'
import EnterpreneurProfile from './Firm/EnterpreneurProfile.jsx';
import AdminProfile from '../AdminPages/AdminProfile.jsx';
import MentorProfile from './Mentor/MentorProfile.jsx';
import InvestorProfile from './Investor/InvestorProfile.jsx';
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