import React from 'react';
import { Container, Box, Typography, IconButton,  Grid } from '@mui/material';
import { Facebook, Instagram, LinkedIn } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 1, // Decreased the vertical padding
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[900],
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent="space-between" alignItems="center">
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Innovators Hub
            </Typography>
            <Typography variant="body2" color="white">
              Designed and built with all the love of Prashant Rahul Shwet Abhay Ronit.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Link to="/" color="inherit" underline="none" sx={{ mr: 2 }}>
                <Typography variant="body2" sx={{ mr: 2 }}>
                  Home
                </Typography>
              </Link>
              <Link to="/about" color="inherit" underline="none" sx={{ mr: 2 }}>
                <Typography variant="body2" sx={{ mr: 2 }}>
                  About Us
                </Typography>
              </Link>
              <Link to ="/contact" color="inherit" underline="none" sx={{ mr: 2 }}>
                <Typography variant="body2" sx={{ mr: 2 }}>
                  Contact Us
                </Typography>
              </Link>
              <Link to="/termsandconditions" color="inherit" underline="none"> {/* Added Terms and Conditions link */}
                <Typography variant="body2">
                  Terms & Conditions
                </Typography>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography
              variant="body2"
              align="right"
              color="white"
              component="p"
            >
              © {new Date().getFullYear()} Innovators Hub. All rights reserved.
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}> {/* Adjusted margin-top */}
          <Link to="https://www.facebook.com" target="_blank" rel="noopener" color="inherit" sx={{ mr: 1 }}>
            <IconButton aria-label="Facebook" color="inherit">
              <Facebook />
            </IconButton>
          </Link>
          <Link to="https://www.instagram.com" target="_blank" rel="noopener" color="inherit" sx={{ mr: 1 }}>
            <IconButton aria-label="Instagram" color="inherit">
              <Instagram />
            </IconButton>
          </Link>
          <Link to="https://www.linkedin.com" target="_blank" rel="noopener" color="inherit">
            <IconButton aria-label="LinkedIn" color="inherit">
              <LinkedIn />
            </IconButton>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
