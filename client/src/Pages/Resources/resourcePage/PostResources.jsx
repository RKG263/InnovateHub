import React, { useState } from 'react';
import { Button, Container, Typography, Grid, TextField, TextareaAutosize, Box, LinearProgress } from '@mui/material';
import axios from "axios";
import toast from "react-hot-toast";

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Header from '../../../Components/Header/Header';
import Footer from '../../../Components/Footer/Footer';

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
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom align="center" style={{ fontWeight: 'bold', color: '#3f51b5', marginBottom: '30px' }}>
          Upload Resources
        </Typography>
        <Grid container spacing={4}>
          {/* Left Column: Form */}
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '20px',
                backgroundColor: '#fff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                marginBottom: '20px',
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
                    style={{ width: '100%', padding: '10px', borderRadius: '4px', borderColor: '#ccc' }}
                    value={pdfDescription}
                    onChange={(e) => setPdfDescription(e.target.value)}
                  />
                </Box>
                <Box sx={{ marginBottom: '20px' }}>
                  <input type="file" id="pdfUpload" onChange={handlePdfUpload} accept=".pdf" style={{ display: 'none' }} />
                  <label htmlFor="pdfUpload">
                    <Button variant="outlined" component="span" fullWidth>
                      Upload PDF
                    </Button>
                  </label>
                  {pdfUploadprogress > 0 && (
                    <Box sx={{ width: '100%', mt: 2 }}>
                      <LinearProgress variant="determinate" value={pdfUploadprogress} />
                      <Typography variant="body2" color="textSecondary">{`PDF Upload Progress: ${pdfUploadprogress}%`}</Typography>
                    </Box>
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
                    style={{ width: '100%', padding: '10px', borderRadius: '4px', borderColor: '#ccc' }}
                    value={videoDescription}
                    onChange={(e) => setVideoDescription(e.target.value)}
                  />
                </Box>
                <Box sx={{ marginBottom: '20px' }}>
                  <input type="file" id="videoUpload" onChange={handleVideoUpload} accept="video/*" style={{ display: 'none' }} />
                  <label htmlFor="videoUpload">
                    <Button variant="outlined" component="span" fullWidth>
                      Upload Video
                    </Button>
                  </label>
                  {videoUploadprogress > 0 && (
                    <Box sx={{ width: '100%', mt: 2 }}>
                      <LinearProgress variant="determinate" value={videoUploadprogress} />
                      <Typography variant="body2" color="textSecondary">{`Video Upload Progress: ${videoUploadprogress}%`}</Typography>
                    </Box>
                  )}
                </Box>
                <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
              </form>
            </Box>
          </Grid>
          {/* Right Column: Image */}
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src="/top-view-businesspeople-working-with-icons-painted-table.jpg" alt="Upload" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />
          </Grid>
        </Grid>
      </Container>
      <Footer/>
    </>
  );
};

export default PostResources;
