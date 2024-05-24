import React from 'react'
import EnterpreneurProfile from './Firm/EnterpreneurProfile.jsx';
import AdminProfile from '../AdminPages/AdminProfile.jsx';
import MentorProfile from './Mentor/MentorProfile.jsx';
import InvestorProfile from './Investor/InvestorProfile.jsx';
import { useDispatch, useSelector } from 'react-redux';
import Header from "../../Components/Header/Header.jsx"
import Footer from "../../Components/Footer/Footer.jsx"



const Profile = () => {

  const { user } = useSelector(state => state.user);

  return (
    <>


      <Header />
      <div className='flex justify-center items-center pt-4 pb-4  bg-[rgb(240,242,245)]' >
        

        {
          user.role === 'Mentor' ? (
            <MentorProfile />
          ) : user.role === 'Investor' ? (
            <InvestorProfile />
          ) : (
            <EnterpreneurProfile />
          )
        }
      </div>
      <Footer />
    </>
  )
}

export default Profile