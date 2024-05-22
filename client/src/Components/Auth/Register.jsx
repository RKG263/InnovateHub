import axios from "axios";
import React, {  useState } from "react";
import { register } from "../../redux/actions/user";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";


const Register = () => {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const dispatch = useDispatch() ;

  const handleRegistration = async (event) => {

    event.preventDefault();
    dispatch(register(role, name, email, password)) ;
    
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
              name="name"
              required
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              required
              onChange={e => setEmail(e.target.value)}
            />

          </div>


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
          <div>

            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              onChange={e => setPassword(e.target.value)}
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