import React, { useState } from 'react';
import { Button, Container, Typography, Grid, TextField, TextareaAutosize, Box} from '@mui/material';
import axios from "axios";
import toast from "react-hot-toast";


import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Header from '../Header/Header';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

const PostResources = () => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [pdfFileName, setpdfFileName] = useState('');
  const [videoFileName, setvideoFileName] = useState('');
  const [pdfFileType, setpdfFileType] = useState('');
  const [videoFileType, setvideoFileType] = useState('');
  const [pdfUploadprogress, setpdfUploadprogress] = useState(0);
  const [videoUploadprogress, setvideoUploadprogress] = useState(0);
  const [pdfTitle, setPdfTitle] = useState('');
  const [pdfDescription, setPdfDescription] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');

  const handlePdfUpload = (event) => {
    const file = event.target.files[0];
    const storageRef = ref(storage, 'pdfs/' + file.name);
    setpdfFileName(file.name);
    setpdfFileType(file.type);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setpdfUploadprogress(progress);
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error('Error uploading PDF:', error);
      },
      () => {
        console.log('PDF uploaded successfully');
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('PDF available at', downloadURL);
          setPdfUrl(downloadURL);
          const viewUrl = downloadURL + '?alt=media';
          console.log('PDF viewable at', viewUrl);
          toast.success('PDF uploaded successfully');
        }).catch((error) => {
          toast.error(error.response.data.message);
        });
      }
    );
  };

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];  
    setvideoFileName(file.name);
    setvideoFileType(file.type);
    const storageRef = ref(storage, 'videos/' + file.name);
  
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
        setvideoUploadprogress(progress);
      },
      (error) => {
        console.error('Error uploading video:', error);
      },
      () => {
        console.log('Video uploaded successfully');
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('Video available at', downloadURL);
          setVideoUrl(downloadURL);
          toast.success("Video Uploaded Successfully");
        }).catch((error) => {
          console.error('Error getting download URL for video:', error);
        });
      }
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post(
        "http://localhost:8000/api/v1/resource/postResources",
        {
          pdfUrl,
          videoUrl,
          pdfFileName,
          pdfFileType,
          videoFileType,
          videoFileName,
          pdfTitle,
          pdfDescription,
          videoTitle,
          videoDescription
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setPdfUrl(null);
        setVideoUrl(null);
        setpdfFileName('');
        setpdfUploadprogress(0);
        setvideoFileName('');
        setvideoFileType('');
        setvideoUploadprogress(0);
        setPdfTitle('');
        setPdfDescription('');
        setVideoTitle('');
        setVideoDescription('');
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return ( 
    <>
    
    <Header/>
    <Typography variant="h5" gutterBottom style={{ textAlign: 'center', fontWeight: 'bold', color: 'blue', marginBottom: '20px' }}>
          UPLOAD RESOURCES
        </Typography>
    <Grid container spacing={3}>
    {/* Left Column: Form */}
    <Grid item xs={12} md={8}>
      <Box
        sx={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '20px',
          backgroundColor: '#f2f2f2',
          marginBottom: '20px',
          width: '100%', // Adjust width as per your design
          maxWidth: '500px', // Limit maximum width
          margin: '0 auto', // Center align horizontally
        }}
      >
      
        <form onSubmit={handleSubmit}>
          <Box sx={{ marginBottom: '20px' }}>
            <TextField
              fullWidth
              id="pdfTitle"
              label="PDF Title"
              value={pdfTitle}
              onChange={(e) => setPdfTitle(e.target.value)}
            />
          </Box>
          <Box sx={{ marginBottom: '20px' }}>
            <TextareaAutosize
              rowsMin={3}
              placeholder="PDF Description"
              style={{ width: '100%' }}
              value={pdfDescription}
              onChange={(e) => setPdfDescription(e.target.value)}
            />
          </Box>
          <Box sx={{ marginBottom: '20px' }}>
            <input type="file" id="pdfUpload" onChange={handlePdfUpload} accept=".pdf" />
            {pdfUploadprogress > 0 && pdfUploadprogress !== 100 && (
              <p style={{ color: 'yellow' }}>PDF Upload Progress: {pdfUploadprogress}%</p>
            )}
          </Box>
          <Box sx={{ marginBottom: '20px' }}>
            <TextField
              fullWidth
              id="videoTitle"
              label="Video Title"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
            />
          </Box>
          <Box sx={{ marginBottom: '20px' }}>
            <TextareaAutosize
              rowsMin={3}
              placeholder="Video Description"
              style={{ width: '100%' }}
              value={videoDescription}
              onChange={(e) => setVideoDescription(e.target.value)}
            />
          </Box>
          <Box sx={{ marginBottom: '20px' }}>
            <input type="file" id="videoUpload" onChange={handleVideoUpload} accept="video/*" />
            {videoUploadprogress > 0 && videoUploadprogress !== 100 && (
              <p style={{ color: 'blue' }}>Video Upload Progress: {videoUploadprogress}%</p>
            )}
          </Box>
          <Button type="submit" variant="contained" color="primary">Submit</Button>
        </form>
      </Box>
    </Grid>

    {/* Right Column: Image */}
    <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
      {/* Replace 'imageSrc' with your image URL */}
      <img src="/top-view-businesspeople-working-with-icons-painted-table.jpg" alt="Image" style={{ maxWidth: '100%', height: 'auto' ,textAlign:'center'}} />
    </Grid>
  </Grid>
  
            <Footer/>
  </>
  );
};

export default PostResources;