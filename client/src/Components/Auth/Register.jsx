
import React, { useEffect, useState } from "react";
import { Container, Typography, TextField, Button, MenuItem, Select, FormControl, InputLabel, Box, Link as MuiLink } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { register } from "../../redux/actions/user";


const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate() ;
  const { error, message } = useSelector((state) => state.user);

  const handleRegistration = async (event) => {
    event.preventDefault();
    try{

      if(password !== confirmPassword)
       {
         toast.error("Password and confirm password not match");
         throw new Error("Password and confirm password not match");
         
       }
      else
      {
        dispatch(register(name, email, password, role));
        navigate('/login');
      }
      
    }catch(err)
    {
      console.log(err);
    }
  };

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
    <>
      <Header />
      <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
        <Box
          component="form"
          onSubmit={handleRegistration}
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
            Sign Up
          </Typography>
          <Typography variant="body1" align="center" gutterBottom sx={{ gridColumn: 'span 2' }}>
            Please Sign Up To Continue
          </Typography>
          <TextField
            label="Name"
            type="text"
            name="name"
            required
            fullWidth
            onChange={e => setName(e.target.value)}
            sx={{ gridColumn: 'span 2' }}
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            required
            fullWidth
            onChange={e => setEmail(e.target.value)}
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
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gridColumn: 'span 2' }}>
            <MuiLink component={Link} to="/login" variant="body2" sx={{ textDecoration: 'none', color: '#271776ca' }}>
              Already Registered? Login Now
            </MuiLink>
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ gridColumn: 'span 2' }}>
            Register
          </Button>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Register;

// import axios from "axios";
// import React, {  useEffect, useState } from "react";
// import Header from "../Header/Header";
// import Footer from "../Footer/Footer";
// import { register } from "../../redux/actions/user";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";

// const Register = () => {

//   const [email, setEmail] = useState('');
//   const [name, setName] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('');
//   const dispatch = useDispatch() ;
//   const {error , message} = useSelector((state) => state.user) ;

//   const handleRegistration = async (event) => {
//     event.preventDefault();
//     //  const myForm = new FormData(); 
//     //  myForm.append('name', name);
//     //  myForm.append('email', email);
//     //  myForm.append('password', password);
//     // myForm.append('file', image);
//      dispatch(register(name , email , password , role));
//   };
//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch({ type: 'clearError' });
//     }
//     if (message) {
//       toast.success(message);
//       dispatch({ type: 'clearMessage' });
//     }
//   }, [dispatch, error, message]);


//   return (
//     <>
//     <Header/>
//       <div className="container form-component register-form">
//         <h1>Sign Up</h1>
//         <p>Please Sign Up To Continue</p>

//         <form onSubmit={handleRegistration}>
//           <div>
//             <input
//               type="text"
//               placeholder="Name"
//               name="name"
//               required
//               onChange={e => setName(e.target.value)}
//             />
//           </div>
//           <div>
//             <input
//               type="email"
//               placeholder="Email"
//               name="email"
//               required
//               onChange={e => setEmail(e.target.value)}
//             />

//           </div>


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
//           <div>

//             <input
//               type="password"
//               placeholder="Password"
//               name="password"
//               required
//               onChange={e => setPassword(e.target.value)}
//             />

//           </div>
//           <div
//             style={{
//               gap: "10px",
//               justifyContent: "flex-end",
//               flexDirection: "row",
//             }}
//           >
            
//             <Link
//               to={"/login"}
//               style={{ textDecoration: "none", color: "#271776ca" }}
//             >
//               Already Registered? Login Now
//             </Link>
//           </div>
//           <div style={{ justifyContent: "center", alignItems: "center" }}>
//             <button type="submit">Register</button>
//           </div>
//         </form>
//       </div>
//       <Footer/>
//     </>
//   );
// };

// export default Register;