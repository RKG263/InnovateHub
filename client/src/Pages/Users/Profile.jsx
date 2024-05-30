import React, { useState, useEffect } from 'react';
import { Container, Paper, Avatar, Typography, Button, TextField, Grid, Dialog, DialogTitle, DialogContent, DialogActions, Card, CardContent, CardMedia, List, ListItem, ListItemText, Box } from '@mui/material';
import { styled } from '@mui/system';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { useParams } from 'react-router-dom';
import axios from 'axios'; 
import { useDispatch, useSelector } from 'react-redux';
import { Approach } from '../../redux/actions/other';
import { server } from '../../redux/store';



const Root = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  textAlign: 'center',
  backgroundColor: 'rgba(243, 229, 245, 0.8)', // Light purple background color with increased opacity
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
  backgroundColor: 'rgba(249, 249, 249, 0.8)', // Light background color with increased opacity
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));

const ScrollableCardContent = styled(CardContent)(({ theme }) => ({
  maxHeight: '100px',
  overflowY: 'auto',
}));

const ProfilePage = () => {
  const [User, setUser] = useState({});
  const [connections, setConnections] = useState([]);
  const [interests, setInterests] = useState([]);
  const [open, setOpen] = useState(false);
  const [chatEnabled, setChatEnabled] = useState(true); // Replace this with actual consent status from the server
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessFile: null,
  });
  const { user } = useSelector((state) => state.user);
  const { userId } = useParams();
  const _id = user._id; 
  const dispatch = useDispatch() ;

  useEffect(() => {
    axios.get(`${server}/auth/getmyprofile?userId=${userId}`)
      .then(response => {
        const userData = response.data;
        setUser(userData.User || {}); 
        setConnections(userData.Connections || []);
        setInterests(userData.User?.interests || []);
        setChatEnabled((userData.Connections && userData.Connections.includes(_id)) || false);
      })
      .catch(error => {
        console.error('Error fetching profile data:', error);
      });
  }, []);

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

  const handleSubmit = async( event) => {
    // Handle form submission logic here
    event.preventDefault() ;
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('businessFile', formData.businessFile);
    dispatch(Approach(_id , userId )) ;
  };

  return (
    <>
      <Header />
      <Container maxWidth="md">
        <Root elevation={3}>
          <Grid container direction="column" alignItems="center">
            <StyledAvatar alt="Profile Picture" src={User?.image || "/path/to/image.jpg"} />
            <Typography variant="h5">{User?.name || 'John Doe'}</Typography>
            <Typography variant="subtitle1">{User?.role || 'Investor / Mentor / Entrepreneur'}</Typography>
          </Grid>

          <Section>
            <Typography variant="h6">About</Typography>
            <Typography variant="body1">
              {User?.aboutMe || 'Experienced investor with a strong background in tech startups. Looking to mentor and invest in innovative ideas.'}
            </Typography>
          </Section>

          <Section>
            <Typography variant="h6">Approach</Typography>
            {!chatEnabled ? (
              <Button variant="contained" color="primary" onClick={handleOpen}>
                Approach
              </Button>
            ) : (
              <Button variant="contained" color="secondary">
                Chat
              </Button>
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
            <Typography variant="h6">My Connections</Typography>
            <ScrollableSection>
              <Grid container spacing={2}>
                {connections.map((connection, index) => (
                  <Grid item xs={12} key={index}>
                    <Card>
                      <CardMedia
                        component="img"
                        alt={connection?.name || "John Doe"}
                        height="140"
                        image={connection?.image || "/path/to/default.jpg"}
                      />
                      <ScrollableCardContent>
                        <Typography variant="h6">{connection?.name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {connection?.role || "Role"}
                        </Typography>
                      </ScrollableCardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </ScrollableSection>
          </Section>

          <Section>
            <Typography variant="h6">My Interests</Typography>
            <ScrollableSection>
              <List>
                {interests.map((interest, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={interest} />
                  </ListItem>
                ))}
              </List>
            </ScrollableSection>
          </Section>
        </Root>
      </Container>
      <Footer />
    </>
  );
};

export default ProfilePage;
