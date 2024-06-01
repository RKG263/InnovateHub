import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, styled } from '@mui/material';
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

const EditProfilePic = () => {




  const handleProfilePicChange = async (e) => {

    console.log(e.target.files[0]);
    


    try {

      const data = new FormData();
      data.append("file", e.target.files[0]);

      console.log(data);

      const res = await axios.post(`${import.meta.env.VITE_URL}/api/v1/auth/editProfilePic`,
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
      {/* <EditIcon className="bg-white text-[rgb(79,87,168)] relative top-[-35px] left-[55px] border rounded-3xl cursor-pointer"
        fontSize='large'

      /> */}


      <IconButton
        component="label"
        variant="contained"
        className="bg-white text-[rgb(79,87,168)] relative top-[-35px] left-[55px] border rounded-3xl cursor-pointer "

      >
        <EditIcon
        // fontSize='medium'
        />
        <VisuallyHiddenInput
          type="file"
          // multiple
          name="file"
          // accept=".jpg, .jpeg, .png"
          onChange={handleProfilePicChange}
        />
      </IconButton>

    </>
  )
}

export default EditProfilePic
