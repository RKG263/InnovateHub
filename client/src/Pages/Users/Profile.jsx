import React, { useState, useEffect } from 'react';
import { Container, Paper, Avatar, Typography, Button, TextField, Grid, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, Box, IconButton } from '@mui/material';
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
import RequestIcon from '@mui/icons-material/AssignmentTurnedIn';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Root = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  textAlign: 'center',
  backgroundColor: 'rgba(243, 229, 245, 0.8)',
  boxShadow: '0px 3px 6px rgba(0,0,0,0.16)',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(15),
  height: theme.spacing(15),
  marginBottom: theme.spacing(2),
}));

const Section = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(3),
  textAlign: 'left',
}));

const ScrollableSection = styled(Box)(({ theme }) => ({
  maxHeight: '200px',
  overflowY: 'auto',
  backgroundColor: 'rgba(249, 249, 249, 0.8)',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0px 3px 6px rgba(0,0,0,0.12)',
}));

const ProfilePage = () => {
  const [User, setUser] = useState();
  const [connections, setConnections] = useState([]);
  const [interests, setInterests] = useState([]);
  const [approachedMessage, setApproachedMessage] = useState('');
  const [chatEnabled, setChatEnabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessFile: null,
    description: '',
  });
  const { user } = useSelector((state) => state.user);
  const { userId } = useParams();
  const _id = user._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${server}/auth/getmyprofile?userId=${userId}`)
      .then(response => {
        const userData = response.data;
        setUser(userData.User || {});
        setConnections(userData.Connections || []);
        setInterests(userData.User?.interests || []);
        checkChatStatus(_id, userId);
      })
      .catch(error => {
        console.error('Error fetching profile data:', error);
      });
  }, [userId, _id]);

  const checkChatStatus = (Id1, Id2) => {
    axios.post(`${server}/other/checkchatstatus`, { Id1, Id2 })
      .then(response => {
        const { chatEnabled, message } = response.data;
        setChatEnabled(chatEnabled);
        setApproachedMessage(message);
      })
      .catch(error => {
        console.error('Error checking chat status:', error);
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


  console.log(User, "sssssssssss")
  const handleChatClick = () => {
    navigate(`/chat/${userId}`);
  };

  return (
    <>
      <Header />
      {User ? (
        <Container maxWidth="md">
          <Root elevation={3}>
            <Grid container direction="column" alignItems="center">



              <StyledAvatar alt="Profile Picture" src={User?.profile_pic?.url || "/path/to/image.jpg"} />



              <Typography variant="h5" gutterBottom>{User?.name || 'John Doe'}</Typography>
              <Typography variant="subtitle1" color="textSecondary">{User?.role || 'Investor / Mentor / Entrepreneur'}</Typography>
            </Grid>

            <Section>
              <Typography variant="h6" gutterBottom>About</Typography>
              <Typography variant="body1" color="textSecondary">
                {User?.aboutMe || 'Experienced investor with a strong background in tech startups. Looking to mentor and invest in innovative ideas.'}
              </Typography>
            </Section>

            <Section>
              <Typography variant="h6" gutterBottom>Approach</Typography>
              {chatEnabled ? (
                <Button onClick={handleChatClick} variant="contained" color="secondary" startIcon={<ChatIcon />}>
      Chat
    </Button>
              ) : approachedMessage === 'Approach' ? (
                <Button variant="contained" color="primary" onClick={handleOpen} startIcon={<PersonAddIcon />}>
                  Approach
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
                    <input
                      accept=".ppt,.pptx,.pdf"
                      style={{ display: 'none' }}
                      id="business-file"
                      type="file"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="business-file">
                      <Button variant="contained" component="span" fullWidth margin="normal">
                        Upload Business PPT or PDF
                      </Button>
                    </label>
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
              <Typography variant="h6" gutterBottom>My Connections</Typography>
              <ScrollableSection>
                <List>
                  {connections.length === 0 ? (
                    <Typography variant="body1" color="textSecondary">This profile user has no connections</Typography>
                  ) : (
                    connections.map((connection, index) => (
                      <ListItem key={index} button onClick={() => { navigate(`/profile/${connection._id}`) }}>
                        <Avatar
                          alt={connection?.name || "John Doe"}
                          src={connection?.image || "/path/to/default.jpg"}
                          sx={{ width: '50px', height: '50px', marginRight: '10px' }}
                        />
                        <Box>
                          <Typography>{connection?.name}</Typography>
                          <Typography variant="body2" color="textSecondary">{connection?.role}</Typography>
                          <Typography variant="body2" color="textSecondary">{connection?.bio || "Bio"}</Typography>
                        </Box>
                      </ListItem>
                    ))
                  )}
                </List>
              </ScrollableSection>
            </Section>

            <Section>
              <Typography variant="h6" gutterBottom>My Interests</Typography>
              <ScrollableSection>
                {interests.length === 0 ? (
                  <Typography variant="body1" color="textSecondary">No interests mentioned</Typography>
                ) : (
                  <List>
                    {interests.map((interest, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={interest} />
                      </ListItem>
                    ))}
                  </List>
                )}
              </ScrollableSection>
            </Section>
          </Root>
        </Container>
      ) : <SpinningLoader />}
      <Footer />
    </>
  );
};

export default ProfilePage;
