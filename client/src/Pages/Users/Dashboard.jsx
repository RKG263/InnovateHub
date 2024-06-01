import React from 'react'
import { useSelector } from 'react-redux'
import EnterpreneurDashboard from './Firm/EnterpreneurDashboard';
import MentorDashboard from './Mentor/MentorDashboard';
import InvestorDashboard from './Investor/InvestorDashboard';

const Dashboard = () => {

    const {user} =  useSelector((state) => state.user) ;
  return (
    <>
       {
          user.role == 'Entrepreneur' ? (<EnterpreneurDashboard/>)
           : user.role == 'Mentor' ? (
               <MentorDashboard/>
          ):(
            <InvestorDashboard/>
          )
       }
    </>
  )
}

export default Dashboard
