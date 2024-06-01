
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
