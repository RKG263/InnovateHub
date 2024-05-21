import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Button, Stack } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { ExitToApp, Person } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Header = () => {
         
    const [user ,setUser] = useState(1) ;
    const flip = () =>{
          setUser((prev) => !prev) ;
    }
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
           INNOVATORS_HUB
  
        </Typography>
        <Box>
          <Link  to = "/">
          <Button  sx={{
            color: 'white',
            '&:hover': {
              backgroundColor: '#303f9f', 
            },
          }} >
             FUCK YOU
          </Button>
           </Link>
          
            <Link to = '/about'>
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
        
           <Link to = '/contact'>
          <Button  sx={{
            color: 'white',
            '&:hover': {
              backgroundColor: '#303f9f', 
            },
          }} >
             ContactUs
          </Button>
           </Link>
          
        </Box>

      {
            user ? (<Toolbar
            sx = {{
                  letterSpacing  : '5px' 
            }}
            >
              <Link to = '/profile'>
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
            </Toolbar>)
          : (

            <Link to = '/login'>
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
           
          )
       }
             </Toolbar>
    </AppBar>
  );
};

export default Header;