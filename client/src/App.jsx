import React from "react";
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
import "./App.css";
import EnterpreneurProfile from "./Pages/Users/Firm/EnterpreneurProfile";

function App() {
  const isAuthenticated = false;
  return (
    <BrowserRouter>
    
      <Routes>
      
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <ProtectedRoute user={!isAuthenticated} redirect="/">
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute user={!isAuthenticated} redirect="/">
              <Register />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/contact"
          element={
            <ProtectedRoute user={isAuthenticated} redirect="/login">
              <Contact />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute user={isAuthenticated} redirect="/login">
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/spinload" element={<SpinningLoader />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/user/profile" element={<EnterpreneurProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
