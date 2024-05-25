import React from 'react'
import EnterpreneurDashboard from './Firm/EnterpreneurDashboard.jsx';
import MentorDashboard from './Mentor/MentorDashboard.jsx';
import InvestorDashboard from './Investor/InvestorDashboard.jsx';
import { useDispatch, useSelector } from 'react-redux';
import Header from "../../Components/Header/Header.jsx"
import Footer from "../../Components/Footer/Footer.jsx"
import { useParams } from 'react-router-dom';
import EnterPreneurProfile from '../Profile/firm/EnterPreneurProfile.jsx';
import InvestorProfile from '../Profile/Investor/InvestorProfile.jsx';
import MentorProfile from '../Profile/Mentor/MentorProfile.jsx';




const Profile = () => {

  const { user } = useSelector(state => state.user);
  const {userId} = useParams() ;
 
  return (
    <>


      <Header />
      <div className='flex justify-center items-center pt-4 pb-4  bg-[rgb(240,242,245)]' >
        

        {
          user.role === 'Mentor' ? (
            userId == user._id ?  <MentorDashboard /> : <MentorPrfile/>             
          ) : user.role === 'Investor' ? (
            userId == user._id ?  <InvestorDashboard /> : <InvestorProfile/> 
          ) : (
            userId == user._id ?  <MentorDashboard /> : <MentorProfile/> 
          )
        }
      </div>
      <Footer />
    </>
  )
}

export default Profile