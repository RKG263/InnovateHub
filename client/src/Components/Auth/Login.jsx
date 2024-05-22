import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate, Navigate } from "react-router-dom";
import Register from "./Register";

const Login = () => {



  const handleLogin = async (event) => {

    event.preventDefault();

    try {
      const loginData = new FormData(event.currentTarget);

      if (loginData.get('password') !== loginData.get('confirmPassword')) {
        // toast("Password and Confirm Password should be same");
        throw new Error("password not match");
      }


      const response = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/api/v1/auth/login`, {

        email: loginData.get('email'),
        password: loginData.get('password'),
        role: loginData.get('role'),

      });
      console.log(response);

    } catch (err) {
      console.error(err);
    }

  };


  return (
    <>
      <div className="container form-component login-form">
        <h2>Sign In</h2>
        <p>Please Login To Continue</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            required
          />
          <input
            type="text"
            placeholder="Role"
            name="role"

          />
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Not Registered?</p>
            <Link
              to={"/Register"}
              style={{ textDecoration: "none", color: "#271776ca" }}
            >
              Register Now
            </Link>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;