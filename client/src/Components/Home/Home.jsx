
import React, { useState } from 'react';
import { Container, Typography, Button, AppBar, Grid, Paper, Box, Fab } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import NotificationDialog from '../Users/Notification';
import { Notifications } from '@mui/icons-material'; 

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const [isNotificationOpen, setNotificationOpen] = useState(false);

  const handleNotificationOpen = () => setNotificationOpen(true);
  const handleNotificationClose = () => setNotificationOpen(false);

  return (
    <>
      <AppBar position="static" style={{ marginBottom: '32px' }}>
        <Header isAuthenticated={isAuthenticated} />
      </AppBar>
      <main> 
        <div style={{ padding: '48px 0 32px' }}>
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h2" align="left" color="textPrimary" gutterBottom>
                  Welcome to The Hub of Innovators
                </Typography>
                <Typography variant="h5" align="left" color="textSecondary" paragraph>
                  Your one-stop resource for all things entrepreneurship. Get tips, tools, and resources to start and grow your business.
                </Typography>
                <div style={{ marginTop: '32px' }}>
                  <Grid container spacing={2} justifyContent="flex-start">
                    <Grid item>
                      <Link to={'/explore'}>
                        <Button variant="contained" color="primary">
                          Explore
                        </Button>
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link to={'/connecttoinnovators'}>
                        <Button variant="outlined" color="primary">
                          Connect to Innovators
                        </Button>
                      </Link>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <img
                  src="https://unchartedcreative.com/wp-content/uploads/2020/01/25.jpg"
                  alt="Entrepreneurship Growth"
                  style={{ width: '100%', height: 'auto', maxHeight: '400px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                />
              </Grid>
            </Grid>
          </Container>
        </div>
        <Container style={{ paddingTop: '48px', paddingBottom: '48px' }} maxWidth="md">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Paper style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '16px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <Box padding={2}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Resources
                  </Typography>
                  <Typography>
                    Access a curated list of resources to help you with your entrepreneurial journey.
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '16px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <Box padding={2}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Tools
                  </Typography>
                  <Typography>
                    Discover the best tools to manage your business efficiently.
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '16px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <Box padding={2}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Community
                  </Typography>
                  <Typography>
                    Join our community of entrepreneurs to network and grow together.
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
      <Footer />
      <Box sx={{ position: 'fixed', bottom: 60, right: 20 }}>
  <Fab
    component={Link}
    to="/ask"
    color="secondary"
    aria-label="ask"
    variant="extended"
    sx={{
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      '&:hover': {
        background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
      },
      mr: 2, // Margin right to separate the buttons
    }}
  >
    Ask Ai
  </Fab>
  { isAuthenticated && 
  <Fab
    color="primary"
    aria-label="notifications"
    onClick={handleNotificationOpen}
    sx={{
      background: 'linear-gradient(45deg, #6a1b9a 30%, #ab47bc 90%)',
      '&:hover': {
        background: 'linear-gradient(45deg, #ab47bc 30%, #6a1b9a 90%)',
      },
    }}
  >
  
    <Notifications /> 
  </Fab>
}
</Box>       
      <NotificationDialog open={isNotificationOpen} onClose={handleNotificationClose} />
       
    </>
  );
};

export default Home;
