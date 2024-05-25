import React, { useEffect, useState } from 'react';
import { Typography, Grid, TextField, Button, Box } from '@mui/material';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { contactUs } from '../redux/actions/other';
import {  useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const ContactUs = () => {
    
   const [name  , setName] = useState('');
   const [email , setEmail] = useState('');
   const [message  , setMessage] = useState('');
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

  const {  message : mess, error, loading } = useSelector(
    state => state.other
  );
  const dispatch  = useDispatch() ;
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (mess) {
      toast.success(mess);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, mess , loading ]);

const handleSubmit = (e) => {
  e.preventDefault();
  dispatch(contactUs(name ,email , message)) ;
   navigate('/') ;
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
              label=" Name"
              variant="outlined"
              fullWidth
              required
              style={textFieldStyle}
              onChange={e => setName(e.target.value)}
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
              onChange={e => setName(e.target.value)}
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
              onChange={e => setMessage(e.target.value)}
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
