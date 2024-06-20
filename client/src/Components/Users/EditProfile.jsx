import React, { useState } from 'react';
import {

  Button,
  TextField,
  Typography,
  Grid,
  IconButton,
  styled,
} from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import toast, { Toaster } from "react-hot-toast";

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
    intrest: ''
  });



  const [isVisible, setIsVisble] = useState(true);



  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(e.target, name, value);
    setUserData({
      ...userData,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();


    try {


      if (userData.newPassword !== userData.confirmPassword) {
        toast.error("New password and confirm password must be equal");

        throw new Error("new password and confirm password must be equal");
      }

      const data = {
        fullName: userData.fullName,
        aboutMe: userData.aboutMe,
        newPassword: userData.newPassword,
        contact: userData.contact,
        intrest : userData.intrest,
      }


      const res = await axios.post(`${import.meta.env.VITE_URL}/api/v1/auth/editProfile`,
        data,
        {

          withCredentials: true,
        }
      );

      // console.log(res);

    } catch (err) {
      console.error(err);
    }


  };





  const handleChangePasswordButton = () => {
    setIsVisble(false);
  }

  return (

    <>


      <div className=' inset-0 bg-[rgba(105,154,244,0.4)] rounded-md shadow-lg shadow-slate-700 ' >
        <div className=''>

        </div>
        <Typography
          variant="h5"
          gutterBottom
          style={{ textAlign: 'center', margin: '20px 0' }}
          className='text-[rgb(65,86,143)] font-bold font-serif text-3xl'
        >
          EDIT PROFILE
        </Typography>


        <div
          style={{
            maxWidth: '500px', margin: 'auto',
            padding: '20px', border: '1px solid #ccc', borderRadius: '5px'
          }}
          className='relative p-8  '
        >

          <form onSubmit={handleSubmit}>

            <Grid container spacing={2}>


              <Grid item xs={12}>
                <div className='flex'>

                  <TextField
                    id="fullName"
                    name="fullName"
                    label="Full Name"
                    // type="text"
                    // disabled={disable.name}
                    value={userData.fullName}
                    onChange={handleChange}
                    fullWidth
                  />

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



                </div>
              </Grid>

               <Grid item xs={12}>
                <div className="flex">
                  <TextField
                    id="intrest"
                    name="intrest"
                    label="Intrest"
                    type="text"
                    multiline
                    // disabled={true}
                    value={userData.intrest}
                    onChange={handleChange}
                    fullWidth
                  />



                </div>
              </Grid>

              {isVisible ?

                <Grid item xs={12}
                  style={{ textAlign: 'center' }}
                  className='mb-4 mt-4'

                >
                  <Button

                    className='text-white-500 font-bold'
                    variant='contained'
                    onClick={handleChangePasswordButton}
                  >
                    Change Password
                  </Button>
                </Grid> :
                <>


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
                </>
              }








              <Grid item xs={12} className='justify-center flex'>
                <Button variant="contained" color="primary" type="submit" >
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