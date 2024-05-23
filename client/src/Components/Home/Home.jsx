
import React from 'react';
import { Container, Typography, Button, AppBar, Grid, Paper, Box } from '@mui/material';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useSelector } from 'react-redux';

 

const Home = () => {
      const {isAuthenticated} = useSelector((state) => state.user) ;
  return (
    <>
      <AppBar position="static" style={{ marginBottom: '32px' }}>
        <Header isAuthenticated = {isAuthenticated}/>
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
                      <Button variant="contained" color="primary">
                        Get Started
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="outlined" color="primary">
                        Connect to Innovators
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <img
                  src="https://unchartedcreative.com/wp-content/uploads/2020/01/25.jpg" // Replace with an actual image URL
                  alt="Entrepreneurship Growth"
                  style={{ width: '100%', height: 'auto', maxHeight: '400px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} // Adjusted maxHeight to decrease image height
                />
              </Grid>
            </Grid>
          </Container>
        </div>
        <Container style={{ paddingTop: '48px', paddingBottom: '48px' }} maxWidth="md"> {/* Adjusted padding for the container */}
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
    </>
  );
};

export default Home;
