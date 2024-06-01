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
import { StyledEngineProvider, styled } from '@mui/material/styles';
import axios from 'axios';
import { useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';

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
  const [profileImage, setProfileImage] = useState(null);
  const { user } = useSelector(
    (state) => state.user
  );
  const [userData, setUserData] = useState({
    fullName: user.name,
    profilePic: '',
    email: '',
    aboutMe: user.aboutMe,
    contact: user.contact,
    newPassword: '',
    confirmPassword: '',
  });

  const [disable, setDisable] = useState({
    name: false,
    aboutMe: false,
    contact: true,
  });


  console.log(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target, name, value);
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  console.log(userData);

  const handleProfilePicChange = (e) => {

    console.log(e.target.files[0]);
    setProfileImage(e.target.files[0]);

  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {

    
      

        const data = {
          fullName : userData.fullName,
          aboutMe : userData.aboutMe,
          newPassword : userData.newPassword,
          contact : userData.contact,
        }

        console.log(data);
      const res = await axios.post(`${import.meta.env.VITE_URL}/api/v1/auth/editProfile`,
        data,
        {
       
          withCredentials: true,
        }
      );

      console.log(res);

    } catch (err) {
      console.error(err);
    }




  };

  const handleDisable = (e) => {
    const { name } = e.target;
    console.log(e.target)
    console.log("id : ", name, disable);
    let cdisable = disable;
    if (name == "name")
      cdisable.name = !disable.name;
    else if (name == "aboutMe")
      cdisable.aboutMe = !disable.aboutMe;
    else if (name == "contact")
      cdisable.contact = !disable.contact;


    setDisable(cdisable);
    // setUserData([])
    // console.log(disable); 

  }
  console.log(disable);
  console.log("disable");


  return (

    <>
      {/* <StyledEngineProvider injectFirst> */}

      <div style={{ backgroundColor: 'lightgrey' }}>
        <Typography variant="h5" gutterBottom style={{ textAlign: 'center', margin: '20px 0', color: 'blue' }}>
          EDIT PROFILE
        </Typography>


        <div style={{ maxWidth: '500px', margin: 'auto', backgroundColor: '#bdbcc6', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>

          <form onSubmit={handleSubmit}>

            <Grid container spacing={2}>
             
             
              <Grid item xs={12}>
                <div className='flex'>

                  <TextField
                    id="fullName"
                    name="fullName"
                    label="Full Name"
                    // type="text"
                    disabled={disable.name}
                    value={userData.fullName}
                    onChange={handleChange}
                    fullWidth
                  />
                  <IconButton name="name" className='bg-white  rounded-none border border-black cursor-pointer' onClick={handleDisable} >

                    <EditIcon
                      name="name"
                      className="bg-white text-[rgb(79,87,168)] cursor-pointer "
                      fontSize='large'
                      onClick={handleDisable}
                    />
                  </IconButton>
                </div>
              </Grid>

              <Grid item xs={12}>
                <div className="flex">

                  <TextField
                    id="aboutMe"
                    name="aboutMe"
                    label="About Me"
                    // disabled={disable.aboutMe}
                    multiline
                    value={userData.aboutMe}
                    onChange={handleChange}
                    fullWidth
                  />
                  <IconButton name="aboutMe" className='bg-white  rounded-none border border-black cursor-pointer' onClick={handleDisable}>

                    <EditIcon className="bg-white text-[rgb(79,87,168)] cursor-pointer " fontSize='large' />
                  </IconButton>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className="flex">
                  <TextField
                    id="contact"
                    name="contact"
                    label="Contact"
                    type="number"
                    // disabled={true}
                    value={userData.contact}
                    onChange={handleChange}
                    fullWidth
                  />

                  <IconButton className='bg-white  rounded-none border border-black cursor-pointer'  >

                    <EditIcon className="bg-white text-[rgb(79,87,168)] cursor-pointer " fontSize='large' />
                  </IconButton>
                </div>
              </Grid>
              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom>
                  Change Password
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="newPassword"
                  name="newPassword"
                  label="New Password"
                  type="password"
                  value={userData.newPassword}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  value={userData.confirmPassword}
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
      {/* </StyledEngineProvider> */}
    </>
  );
};

export default EditProfile;