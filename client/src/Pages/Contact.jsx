import React from 'react';
import { Typography, Grid, TextField, Button, Box } from '@mui/material';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';

const ContactUs = () => {
  const formStyle = {
    padding: '24px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    maxWidth: '600px', // Increased maximum width for the form
    margin: '0 auto', // Center the form horizontally
    marginTop: '40px', // Add some top margin for spacing
  };

  const textFieldStyle = {
    marginBottom: '16px',
  };

  const buttonStyle = {
    marginTop: '16px',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your form submission logic here
  };

  return (
    <>
      <Header/>
      <Box style={formStyle} component="form" onSubmit={handleSubmit}>
        <Typography variant="h4" gutterBottom align="center">
          Contact Us
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              required
              style={textFieldStyle}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              required
              style={textFieldStyle}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              required
              type="email"
              style={textFieldStyle}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Message"
              variant="outlined"
              fullWidth
              multiline
              rows={4} // Decreased number of rows for a smaller height
              required
              style={textFieldStyle}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={buttonStyle}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Footer/>
    </>
  );
};

export default ContactUs;
