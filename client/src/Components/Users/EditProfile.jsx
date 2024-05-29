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
  Avatar,
} from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const VisuallyHiddenInput = styled('input')({
  opacity: 0,
  height: 1,
  position: 'absolute',
  bottom: 0,
  left: 0,
  // whiteSpace: 'nowrap',
  width: 1,
});


const EditProfile = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    profilePic: '',
    email: '',
    aboutMe: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [profileImage, setProfileImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target, name, type);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleProfilePicChange = (e) => {

    console.log(e.target.files[0]);
    setProfileImage(e.target.files[0]);

  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {

      const {fullName, file, aboutMe, newPassword, confirmPassword } = e.currentTarget;
      console.log(file.value, aboutMe.value, newPassword.value, confirmPassword.value)

      
      const data = new FormData(e.currentTarget);
      data.delete("file");
      data.append("file", profileImage  );
      

      const res = await axios.post(`${import.meta.env.VITE_URL}/api/v1/auth/editProfile`, 
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data", 
         
        },
        withCredentials: true, 
      }
    );

      console.log(res);

    } catch (err) {
      console.error(err);
    }



      
  };

  return (

    <>
      <div style={{ backgroundColor: 'lightgrey' }}>
        <Typography variant="h5" gutterBottom style={{ textAlign: 'center', margin: '20px 0', color: 'blue' }}>
          EDIT PROFILE
        </Typography>


        <div style={{ maxWidth: '500px', margin: 'auto', backgroundColor: '#bdbcc6', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>

          <form onSubmit={handleSubmit}>

            <Grid container spacing={2}>
              <Grid item xs={12}>

                <Avatar
                  alt="Profile Image"
                  src={profileImage ? URL.createObjectURL(profileImage) : null}
                  sx={{
                    width: 100, height: 100,
                  }}
                  className='border border-black'
                />

                <Typography variant="subtitle1" gutterBottom>
                  Profile Picture
                </Typography>



                  

                <Button component="label" variant="contained" startIcon={<AddAPhotoIcon />}>
                  Edit Profile Picture
                  <VisuallyHiddenInput
                    type="file"
                    // multiple
                    name="file"
                    // accept=".jpg, .jpeg, .png"
                    onChange={handleProfilePicChange}
                  />
                </Button>







              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="fullName"
                  name="fullName"
                  label="Full Name"
                  // value={formData.fullName}
                  // onChange={handleChange}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="aboutMe"
                  name="aboutMe"
                  label="About Me"
                  multiline
                  // value={formData.aboutMe}
                  // onChange={handleChange}
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
                  // value={formData.newPassword}
                  // onChange={handleChange}
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
                  // value={formData.confirmPassword}
                  // onChange={handleChange}
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

export default EditProfile;