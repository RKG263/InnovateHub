import React from 'react';
import { Container, Typography, Grid, Paper, Avatar, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';


const AboutUs = () => {
  const containerStyle = {
    padding: '24px',
    marginTop: '40px',
  };

  const paperStyle = {
    padding: '24px',
  };

  const avatarStyle = {
    backgroundColor: '#1976d2',
    width: '56px',
    height: '56px',
    marginBottom: '8px',
  };

  const teamMemberStyle = {
    textAlign: 'center',
  };

  const sectionStyle = {
    marginTop: '32px',
  };

  const sectionHeaderStyle = {
    marginBottom: '16px',
    borderBottom: '2px solid #1976d2',
    paddingBottom: '8px',
  };

  const iconStyle = {
    marginRight: '8px',
    verticalAlign: 'middle',
  };

  return (
    <>
    <Header />
    <Container style={containerStyle}>
      
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
        About Us
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper style={paperStyle}>
            <Typography variant="h5" gutterBottom style={sectionHeaderStyle}>
              Welcome to Innovators Hub
            </Typography>
            <Typography variant="body1" paragraph>
              We are dedicated to providing the best resources and support for budding entrepreneurs. Our mission is to empower individuals to turn their business ideas into successful ventures.
            </Typography>
            <Typography variant="body1" paragraph>
              Our platform offers a variety of tools, articles, and community support to help you at every stage of your entrepreneurial journey.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper style={paperStyle}>
            <Typography variant="h5" gutterBottom style={sectionHeaderStyle}>
              Mission Statement
            </Typography>
            <Typography variant="body1" paragraph>
              Our mission is to inspire and equip the next generation of entrepreneurs with the knowledge, skills, and resources they need to build successful and sustainable businesses.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper style={paperStyle}>
            <Typography variant="h5" gutterBottom style={sectionHeaderStyle}>
              Our History
            </Typography>
            <Typography variant="body1" paragraph>
              Founded in 2024, Innovators Hub started as a small blog dedicated to providing practical advice for new business owners. Since then, we have grown into a comprehensive platform offering a wide range of resources, including mentorship programs, online courses, and a vibrant community of like-minded individuals.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper style={paperStyle}>
            <Typography variant="h5" gutterBottom style={sectionHeaderStyle}>
              Our Team
            </Typography>
            <Grid container spacing={3}>
              {teamMembers.map((member, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box style={teamMemberStyle}>
                    <Avatar style={avatarStyle}>
                      <PersonIcon />
                    </Avatar>
                    <Typography variant="h6">{member.name}</Typography>
                    <Typography variant="body2">{member.role}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper style={paperStyle}>
            <Typography variant="h5" gutterBottom style={sectionHeaderStyle}>
              Contact Us
            </Typography>
            <Typography variant="body1" paragraph>
              <EmailIcon style={iconStyle} /> Email: contact@innovatorshub.com
            </Typography>
            <Typography variant="body1" paragraph>
              <PhoneIcon style={iconStyle} /> Phone: +1 (123) 456-7890
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      
    </Container>
    <Footer />
    </>
  );
};

const teamMembers = [
  { name: 'Prashant', role: 'Founder & CEO' },
  { name: 'Shwet Sagar', role: 'Chief Marketing Officer' },
  { name: 'Rahul Kumar', role: 'Chief Technology Officer' },
  { name: 'Abhay Singh', role: 'Chief  Financial Officer' },
  { name: 'Ronit Raj', role: 'Chief Manager' },
];

export default AboutUs;
