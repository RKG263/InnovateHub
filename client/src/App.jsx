import React from 'react'
import "./App.css"
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
   <>
     <Router>

    <Routes>
      
   <Route path="/Login" element={<Login/>}/>
   <Route path="/Register" element={<Register/>}/>

    </Routes>
    <ToastContainer  position="top-center"/>
     </Router>
   </>
  )
}

export default App