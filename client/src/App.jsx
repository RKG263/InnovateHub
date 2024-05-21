
import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Login from "./Components/Auth/Login";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import ProtectedRoute from "./Utils/ProtectedRoute";
import Profile from "./Components/Profile";


function App() {
  
  const isAuthenticated = false;
  return (
     
     <BrowserRouter>
       
       <Routes>
        <Route path="/" element ={<Header/>}/>
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
       </Routes>
     </BrowserRouter>

  )
}

export default App
