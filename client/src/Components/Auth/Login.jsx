import axios from "axios";
import React, { useState } from "react";
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

    // try {
    //   const loginData = new FormData(event.currentTarget);

    //   if (loginData.get('password') !== loginData.get('confirmPassword')) {
    //     // toast("Password and Confirm Password should be same");
    //     throw new Error("password not match");
    //   }


    //   const response = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/api/v1/auth/login`, {

    //     email: loginData.get('email'),
    //     password: loginData.get('password'),
    //     role: loginData.get('role'),

    //   });
    //   console.log(response);

    // } catch (err) {
    //   console.error(err);
    // }
        

  };


  return (
    <>
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
<<<<<<< HEAD
          <input
            type="text"
            placeholder="Role"
            name="role"
            onChange={e => setRole(e.target.value)}
          />
=======
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
>>>>>>> ec3eaf697ca65d6cb675f4417f2e72fac9ca442a
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
    </>
  );
};

export default Login;