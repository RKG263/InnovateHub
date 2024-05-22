import React from 'react';
import { Container, Box, Typography, IconButton, Link, Grid } from '@mui/material';
import { Facebook, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
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
              <Link href="https://www.facebook.com" target="_blank" rel="noopener" color="inherit">
                <IconButton aria-label="Facebook" color="inherit">
                  <Facebook />
                </IconButton>
              </Link>
              <Link href="https://www.instagram.com" target="_blank" rel="noopener" color="inherit">
                <IconButton aria-label="Instagram" color="inherit">
                  <Instagram />
                </IconButton>
              </Link>
              <Link href="https://www.linkedin.com" target="_blank" rel="noopener" color="inherit">
                <IconButton aria-label="LinkedIn" color="inherit">
                  <LinkedIn />
                </IconButton>
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
      </Container>
    </Box>
  );
};

export default Footer;