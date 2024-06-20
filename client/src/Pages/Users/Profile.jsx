import React, { useState, useEffect } from 'react';
import {
  Container, Paper, Avatar, Typography, Button, TextField, Grid, Dialog, DialogTitle,
  DialogContent, DialogActions, List, ListItem, ListItemText, Box, CircularProgress
} from '@mui/material';
import { styled } from '@mui/system';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Approach } from '../../redux/actions/other';
import { server } from '../../redux/store';
import SpinningLoader from '../../Shared/SpinningLoader';
import ChatIcon from '@mui/icons-material/Chat';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PlanIcon from '@mui/icons-material/Assignment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingButton } from '@mui/lab';

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage, app } from '../../Utils/firebase';


const VisuallyHiddenInput = styled('input')({
  opacity: 0,
  // height: 1,
  position: 'absolute',
  bottom: 0,
  left: 0,
  // whiteSpace: 'nowrap',
  // width: 1,
});

const Root = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  textAlign: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  boxShadow: '0px 8px 16px rgba(0,0,0,0.2)',
  borderRadius: '15px',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(20),
  height: theme.spacing(20),
  marginBottom: theme.spacing(3),
  border: `4px solid ${theme.palette.primary.main}`,
}));

const Section = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(4),
  textAlign: 'left',
  padding: theme.spacing(2),
  backgroundColor: 'rgba(248, 248, 248, 0.8)',
  borderRadius: '10px',
  boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
}));

const ScrollableSection = styled(Box)(({ theme }) => ({
  maxHeight: '200px',
  overflowY: 'auto',
  padding: theme.spacing(2),
  borderRadius: '10px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
}));

const ProfilePage = () => {
  const [User, setUser] = useState(null);
  const [connections, setConnections] = useState([]);
  const [interests, setInterests] = useState([]);
  const [approachedMessage, setApproachedMessage] = useState('');
  const [chatEnabled, setChatEnabled] = useState(false);
  const [approachEnabled, setApproachEnabled] = useState(true);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessFile: null,
    description: '',
  });
  const [loading, setLoading] = useState(true); // Set loading to true initially

  const [fileUploadprogress, setFileUploadprogress] = useState(0);
  const [fileUploading, setFileUploading] = useState(false);
  const [isUpload, setIsUpload] = useState(false);

  const { user } = useSelector((state) => state.user);
  const { userId } = useParams();
  const _id = user._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [userId, _id]);

  const fetchData = () => {
    setLoading(true); // Set loading to true before making the request
    axios.get(`${server}/auth/getmyprofile?userId=${userId}`)
      .then(response => {
        const userData = response.data;
        setUser(userData.User || {});
        setConnections(userData.Connections || []);
        setInterests(userData.User?.interests || []);
        checkChatStatus(_id, userId);
        setLoading(false); // Set loading to false after successful data fetch
      })
      .catch(error => {
        console.error('Error fetching profile data:', error);
        setLoading(false); // Set loading to false in case of an error
        toast.error('Failed to fetch profile data. Please try again.');
      });
  };

  const checkChatStatus = (Id1, Id2) => {
    axios.post(`${server}/other/checkchatstatus`, { Id1, Id2 })
      .then(response => {
        const { chatEnabled, message, approachEnabled } = response.data;
        console.log(response.data);
        setChatEnabled(chatEnabled);
        setApproachedMessage(message);
        setApproachEnabled(approachEnabled);
      })
      .catch(error => {
        console.error('Error checking chat status:', error);
        toast.error('Failed to check chat status. Please try again.');
      });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, businessFile: e.target.files[0] });
  };


  const handleFileUpload = async (event) => {

    try {
      const file = event.target.files[0];  
      const storageRef = ref(storage, 'pdfs/' + file.name);
      // setFileName(file.name);
      // setFileType(file.type);
      const uploadTask = uploadBytesResumable(storageRef, file);

      let fileUrl = null;

      setFileUploading(true);
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFileUploadprogress(progress);
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error('Error uploading file:', error);
        },
        () => {
          console.log('File uploaded successfully');
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            fileUrl = downloadURL
            const viewUrl = downloadURL + '?alt=media';
            console.log('File viewable at', viewUrl);
            
            axios
            .post(
              `http://localhost:8000/api/v1/resource/postResources`,
                {
                  pdfUrl: fileUrl,
                  pdfFileName: file.name,
                  pdfFileType: file.type,
                  pdfDescription: "File from approch form",
                  pdfTitle: file.name
                  
                },
                {
                  withCredentials: true,
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              ).then(data=>{
                console.log(data)
                
              });
              
              toast.success('File uploaded successfully');
              setFileUploading(false);
              setIsUpload(true);
              
            }).catch((error) => {
              toast.error(error.response.data.message);
            });
        }
      );
      
      


    } catch (err) {
      console.log(err);
    }

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('businessFile', formData.businessFile);
    formDataToSend.append('description', formData.description);
    dispatch(Approach(user._id, userId, user.name, user.email, formData.description));
    setApproachedMessage('Request Pending'); // Set approached message to pending after form submission
    setOpen(false);
  };

  const handleChatClick = () => {
    navigate(`/chat/${userId}`);
  };

  const handlePlanClick = () => {
    navigate(`/plan/${userId}`);
  };



  return (
    <>
      <Header />
      {loading ? (
        <SpinningLoader />
      ) : (
        <Container maxWidth="md">
          <Root elevation={3}>
            <Grid container direction="column" alignItems="center">
              <StyledAvatar alt="Profile Picture" src={User?.profile_pic?.url || "/path/to/image.jpg"} />
              <Typography variant="h4" gutterBottom>{User?.name || 'John Doe'}</Typography>
              <Typography variant="subtitle1" color="textSecondary">{User?.role || 'Investor / Mentor / Entrepreneur'}</Typography>
            </Grid>

            <Section>
              <Typography variant="h5" gutterBottom>About</Typography>
              <Typography variant="body1" color="textSecondary">
                {User?.aboutMe || 'Experienced investor with a strong background in tech startups. Looking to mentor and invest in innovative ideas.'}
              </Typography>
            </Section>

            <Section>
              <Typography variant="h5" gutterBottom>Approach</Typography>
              {chatEnabled ? (
                <Button onClick={handleChatClick} variant="contained" color="secondary" startIcon={<ChatIcon />}>
                  Chat
                </Button>
              ) : approachedMessage === 'Approach' && approachEnabled ? (
                <Button variant="contained" color="primary" onClick={handleOpen} startIcon={<PersonAddIcon />}>
                  Approach
                </Button>
              ) : approachedMessage === 'Take My Plan' ? (
                <Button onClick={handlePlanClick} variant="contained" color="primary" startIcon={<PlanIcon />}>
                  Take My Plan
                </Button>
              ) : (
                <Typography variant='h6' color='#F57323'>{approachedMessage}</Typography>
              )}
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Approach Form</DialogTitle>
                <DialogContent>
                  <form>
                    <TextField
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                    />
                 
                 
                      <LoadingButton
                        variant="contained"
                        component="span"
                        // fullWidth
                        margin="normal"
                        
                        
                        loading={fileUploading}
                        disabled={isUpload}
                        className=' m-10'
                      >
                        Upload Business PPT or PDF
                        <VisuallyHiddenInput
                          type="file"
                          // multiple
                          accept=".ppt,.pptx,.pdf"
                          name="file"
                          // accept=".jpg, .jpeg, .png"
                          onChange={(e) => {
                            // handleFileChange(e);
                            handleFileUpload(e);
                          }}
                        />
                      </LoadingButton>
             
                 
                  </form>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit} color="primary">
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
            </Section>

            <Section>
              <Typography variant="h5" gutterBottom>My Connections</Typography>
              <ScrollableSection>
                <List>
                  {connections.length === 0 ? (
                    <Typography variant="body1" color="textSecondary">This profile user has no connections</Typography>
                  ) : (
                    connections.map((connection, index) => (
                      <ListItem key={index} onClick={() => { navigate(`/profile/${connection._id}`) }}>
                        <Avatar
                          alt={connection?.name || "John Doe"}
                          src={connection?.image || "/path/to/default.jpg"}
                          sx={{ width: '50px', height: '50px', marginRight: '10px' }}
                        />
                        <Box>
                          <ListItemText primary={connection?.name || "John Doe"} secondary={connection?.role || "Investor / Mentor / Entrepreneur"} />
                        </Box>
                      </ListItem>
                    ))
                  )}
                </List>
              </ScrollableSection>
            </Section>

            <Section>
              <Typography variant="h5" gutterBottom>My Interests</Typography>
              <Grid container spacing={2}>
                {interests.length === 0 ? (
                  <Typography variant="body1" color="textSecondary">This profile user has no interests</Typography>
                ) : (
                  interests.map((interest, index) => (
                    <Grid item key={index}>
                      <Button variant="outlined" color="primary" style={{ borderRadius: '20px' }}>{interest}</Button>
                    </Grid>
                  ))
                )}
              </Grid>
            </Section>
          </Root>
        </Container>
      )}
      <Footer />
      <ToastContainer /> {/* Toast container for displaying notifications */}
    </>
  );
};

export default ProfilePage;



