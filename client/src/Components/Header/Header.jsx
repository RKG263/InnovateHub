
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Button, Stack } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { ExitToApp } from '@mui/icons-material';
import { Link } from 'react-router-dom';


const Header = ({ isAuthenticated = false }) => {

  const flip = () => {
    setUser((prev) => !prev);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Stack>
            <Typography variant="h3">
              Innovators Hub
            </Typography>
            <Typography variant="h7">
              Empowering entrepreneurs to achieve their dreams.
            </Typography>
          </Stack>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button
              sx={{
                color: 'white',
                '&:hover': {
                  backgroundColor: '#303f9f',
                },
              }}
            >
              HOME
            </Button>
          </Link>
          <Link to="/about" style={{ textDecoration: 'none' }}>
            <Button
              sx={{
                color: 'white',
                '&:hover': {
                  backgroundColor: '#303f9f',
                },
              }}
            >
              About Us
            </Button>
          </Link>
          <Link to="/contact" style={{ textDecoration: 'none' }}>
            <Button
              sx={{
                color: 'white',
                '&:hover': {
                  backgroundColor: '#303f9f',
                },
              }}
            >
              Contact Us
            </Button>
          </Link>
          {isAuthenticated  ? (
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
              <IconButton
                color="inherit"
                aria-label="logout"
                onClick={flip}
              >
                <ExitToApp />
              </IconButton>
            </Box>
          ) : (
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button
                sx={{
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#303f9f',
                  },
                }}
                onClick={flip}
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
