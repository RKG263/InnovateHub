
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Button, Stack } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { ExitToApp } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import logo from  '../../assets/logo.png'
import { logout } from '../../redux/actions/user';
import { useDispatch, useSelector } from 'react-redux';


const Header = () => {

  const { isAuthenticated, user  } = useSelector(
    state => state.user
  );
  const dispatch = useDispatch() ;

  const handleLogout = (event) =>{
    event.preventDefault();
    dispatch(logout()) ;
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            alt="Logo"
            style={{ width: "50px", marginRight: "10px" }}
          />

          <Stack>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              InnovatorsHub
            </Typography>
          </Stack>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button
              sx={{
                color: "white",
                "&:hover": {
                  backgroundColor: "#303f9f",
                },
              }}
            >
              HOME
            </Button>
          </Link>
          <Link to="/about" style={{ textDecoration: "none" }}>
            <Button
              sx={{
                color: "white",
                "&:hover": {
                  backgroundColor: "#303f9f",
                },
              }}
            >
              About Us
            </Button>
          </Link>
          <Link to="/contact" style={{ textDecoration: "none" }}>
            <Button
              sx={{
                color: "white",
                "&:hover": {
                  backgroundColor: "#303f9f",
                },
              }}
            >
              Contact Us
            </Button>
          </Link>
          {isAuthenticated ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Link to="/profile">
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="profile"
                  size="large"
                >
                  <AccountCircle />
                </IconButton>
              </Link>
              <IconButton color="inherit" aria-label="logout" onClick={handleLogout}>
                <ExitToApp />
              </IconButton>
            </Box>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#303f9f",
                  },
                }}
              >
                Log In
              </Button>
            </Link>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
