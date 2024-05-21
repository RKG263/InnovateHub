import axios from "axios";
import React, { useContext, useState } from "react";
// import { toast } from "react-toastify";

import { Link, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login";


const Register = () => {
 
  const [email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [Role, setRole] = useState("");
  
  const navigateTo = useNavigate();

  const handleRegistration = async (e) => {
  
 
  };

  return (
    <>
      <div className="container form-component register-form">
        <h2>Sign Up</h2>
        <p>Please Sign Up To Continue</p>
    
        <form onSubmit={handleRegistration}>
          <div>
           <input
              type="text"
              placeholder="Name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />  

          </div>
       
           
           <div>
            <select value={Role} onChange={(e) => setRole(e.target.value)}>
              <option value="">Select Role</option>
              <option value="Mentor">Mentor</option>
              <option value="Investor">Investor</option>
              <option value="Entreprenaur">Entreprenaur</option>
            </select>
           </div>
            <div>

           <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            </div>
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Already Registered?</p>
            <Link
              to={"/login"}
              style={{ textDecoration: "none", color: "#271776ca" }}
            >
              Login Now
            </Link>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;