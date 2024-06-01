import React from 'react'
import { useSelector } from 'react-redux'
import EnterpreneurDashboard from './Firm/EnterpreneurDashboard';
import MentorDashboard from './Mentor/MentorDashboard';
import InvestorDashboard from './Investor/InvestorDashboard';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

const Dashboard = () => {

    const {user} =  useSelector((state) => state.user) ;
  return (
    <>
    <Header/>
    <div  className='flex justify-center items-center mt-4 mb-4'>

       {
          user.role == 'Entrepreneur' ? (<EnterpreneurDashboard/>)
           : user.role == 'Mentor' ? (
               <MentorDashboard/>
          ):(
            <InvestorDashboard/>
          )
       }
    </div>
       <Footer/>

    </>
  )
}

export default Dashboard
