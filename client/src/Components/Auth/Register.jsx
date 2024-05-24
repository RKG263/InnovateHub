import axios from "axios";
import React, { useContext, useState } from "react";
// import { toast } from "react-toastify";

import { Link, Navigate, useNavigate } from "react-router-dom";


const Register = () => {



  const navigateTo = useNavigate();


  const handleRegistration = async (event) => {

    event.preventDefault();

    try {
      const registerData = new FormData(event.currentTarget);

      const response = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/api/v1/auth/register`, {
        name : registerData.get('name'),
        email: registerData.get('email'),
        password: registerData.get('password'),
        role: registerData.get('role'),

      });


    } catch (err) {
      console.error(err);
    }

  };
  
  return (
    <>
      <div className="container form-component register-form">
        <h1>Sign Up</h1>
        <p>Please Sign Up To Continue</p>

        <form onSubmit={handleRegistration}>
          <div>
            <input
              type="text"
              placeholder="Name"
              name="name"
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              required
            />

          </div>


          <div>
            <select
              name="role"
              required

            >
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
              name="password"
              required
            />

          </div>
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            
            <Link
              to={"/login"}
              style={{ textDecoration: "none", color: "#271776ca" }}
            >
              Already Registered? Login Now
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