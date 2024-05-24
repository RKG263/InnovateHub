// import axios from "axios";
// import React, { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import Register from "./Register";
// import Header from '../Header/Header'
// import Footer from '../Footer/Footer'
// import { useDispatch } from 'react-redux';
// import { login } from "../../redux/actions/user";
// import { Link } from "react-router-dom";



// const Login = () => {

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [role, setRole] = useState('');
//     const dispatch =  useDispatch() ;

//   const handleLogin = async (event) => {
//     event.preventDefault();
//     dispatch(login(email, password , role));
//   };


//   return (
//     <>
//      <Header/>
//       <div className="container form-component login-form">
//         <h1>Sign In</h1>
//         <p>Please Login To Continue</p>

//         <form onSubmit={handleLogin}>
//           <input
//             type="email"
//             placeholder="Email"
//             name="email"
//             required
//             onChange={e => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             name="password"
//             required
//             onChange={e => setPassword(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Confirm Password"
//             name="confirmPassword"
//             required
//           />
//           <div>
//             <select
//               name="role"
//               required
//               onChange={e => setRole(e.target.value)}
//             >
//               <option value="">Select Role</option>
//               <option value="Mentor">Mentor</option>
//               <option value="Investor">Investor</option>
//               <option value="Entreprenaur">Entreprenaur</option>
//             </select>
//           </div>
//           <div
//             style={{
//               gap: "10px",
//               justifyContent: "flex-end",
//               flexDirection: "row",
//             }}
//           >
           
//             <Link
//               to={"/register"}
//               style={{ textDecoration: "none", color: "#271776ca" }}
//             >
//              Not Registered? Register Now
//             </Link>
//           </div>
//           <div style={{ justifyContent: "center", alignItems: "center" }}>
//             <button type="submit">Login</button>
//           </div>
//         </form>
//       </div>
//       <Footer/>
//     </>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { Container, Typography, TextField, Button, MenuItem, Select, FormControl, InputLabel, Box, Link as MuiLink } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { login } from "../../redux/actions/user";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(login(email, password, role));
  };

  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{
            display: 'grid',
            gap: 2,
            backgroundColor: 'background.paper',
            padding: 3,
            borderRadius: 1,
            boxShadow: 3,
            gridTemplateColumns: '1fr',
            '@media (min-width: 600px)': {
              gridTemplateColumns: '1fr 1fr',
            },
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ gridColumn: 'span 2' }}>
            Sign In
          </Typography>
          <Typography variant="body1" align="center" gutterBottom sx={{ gridColumn: 'span 2' }}>
            Please Login To Continue
          </Typography>
          <TextField
            label="Email"
            type="email"
            name="email"
            required
            fullWidth
            onChange={e => setEmail(e.target.value)}
            sx={{ gridColumn: 'span 2' }}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            required
            fullWidth
            onChange={e => setPassword(e.target.value)}
            sx={{ gridColumn: 'span 2' }}
          />
          <TextField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            required
            fullWidth
            sx={{ gridColumn: 'span 2' }}
          />
          <FormControl fullWidth sx={{ gridColumn: 'span 2' }}>
            <InputLabel id="role-label">Select Role</InputLabel>
            <Select
              labelId="role-label"
              value={role}
              label="Select Role"
              onChange={e => setRole(e.target.value)}
              required
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Mentor">Mentor</MenuItem>
              <MenuItem value="Investor">Investor</MenuItem>
              <MenuItem value="Entrepreneur">Entrepreneur</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gridColumn: 'span 2' }}>
            <MuiLink component={Link} to="/register" variant="body2" sx={{ textDecoration: 'none', color: '#271776ca' }}>
              Not Registered? Register Now
            </MuiLink>
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ gridColumn: 'span 2' }}>
            Login
          </Button>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Login;
