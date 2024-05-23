import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Register from "./Register";
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { useDispatch } from 'react-redux';
import { login } from "../../redux/actions/user";
import { Link } from "react-router-dom";



const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const dispatch =  useDispatch() ;

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(login(email, password , role));

  };


  return (
    <>
     <Header/>
      <div className="container form-component login-form">
        <h1>Sign In</h1>
        <p>Please Login To Continue</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            onChange={e => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            required
          />
          <div>
            <select
              name="role"
              required
              onChange={e => setRole(e.target.value)}
            >
              <option value="">Select Role</option>
              <option value="Mentor">Mentor</option>
              <option value="Investor">Investor</option>
              <option value="Entreprenaur">Entreprenaur</option>
            </select>
          </div>
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
           
            <Link
              to={"/register"}
              style={{ textDecoration: "none", color: "#271776ca" }}
            >
             Not Registered? Register Now
            </Link>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
      <Footer/>
    </>
  );
};

export default Login;