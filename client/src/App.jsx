import React, { useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Auth/Login";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import ProtectedRoute from "./Utils/ProtectedRoute";
import Profile from "./Components/Profile";
import Register from "./Components/Auth/Register";
import Home from "./Components/Home/Home";
import NotFound from "./Shared/NotFound";
import SpinningLoader from "./Shared/SpinningLoader";
import './App.css' ;
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from 'react-hot-toast';
import SubmitIdea from "./Pages/Users/SubmitIdea";

function App() {
  
  const { isAuthenticated, user, message, error, loading } = useSelector(
    state => state.user
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  return (
     
     <BrowserRouter>
      { loading ? (<SpinningLoader/>):
      (<>
       <Routes>
        <Route path="/" element ={<Home/>}/>
       <Route 
              path="/login"
              element={
                <ProtectedRoute
                  user={!isAuthenticated}
                  redirect="/"
                >
                  <Login/>
               </ProtectedRoute>
              }
            />
       <Route 
              path="/register"
              element={
                <ProtectedRoute
                  user={!isAuthenticated}
                  redirect="/"
                >
                  <Register/>
               </ProtectedRoute>
              }
            />
          <Route
              path="/about"
              element={
                <About/>
              }
            />
             <Route
              path="/contact"
              element={
                <ProtectedRoute
                  user={isAuthenticated}
                  redirect="/login"
                >
                  <Contact/>
               </ProtectedRoute>
              }
            />
             <Route
              path="/profile"
              element={
                <ProtectedRoute
                  user={isAuthenticated}
                  redirect="/login"
                >
                  <Profile/>
               </ProtectedRoute>
              }
            />

             <Route path="/ideasubmit" element={<SubmitIdea/>} />
             <Route path="*" element={<NotFound/>} />
       </Routes>
       <Toaster />
       </>) }
     </BrowserRouter>
      
  )
}

export default App