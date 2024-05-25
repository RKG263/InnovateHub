import React, { useState } from 'react';

import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Paper,
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Select,
    MenuItem,

    InputLabel,
    FormControl,
  } from '@mui/material';
 
const ProfileForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    profilePic: '',
    email: '',
    contact: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profilePic: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log(formData);
  };

  return (

    <>         
    <div style={{backgroundColor:'lightgrey'  }}>
     <Typography variant="h5" gutterBottom style={{ textAlign: 'center', margin: '20px 0',color:'blue' }}>
        EDIT PROFILE
      </Typography>
    <div ></div>
       
      <div style={{ maxWidth: '500px', margin: 'auto',backgroundColor:'#bdbcc6', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <form onSubmit={handleSubmit}>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Profile Picture
              </Typography>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ marginBottom: '16px' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="fullName"
                name="fullName"
                label="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
         
            <Grid item xs={12}>
              <TextField
                id="contact"
                name="contact"
                label="Contact"
                value={formData.contact}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>
                Change Password
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="newPassword"
                name="newPassword"
                label="New Password"
                type="password"
                value={formData.newPassword}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      </div>
      </>
  );
};

export default ProfileForm;