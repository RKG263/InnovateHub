import React from 'react';
import { Container, Typography, Grid, Paper, Card, CardContent, CardMedia, Button, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { BusinessCenter, Event, LibraryBooks, Star, Person, AccountBalance } from '@mui/icons-material';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';

const categories = [
  {
    id: 1,
    title: 'Funding Opportunities',
    description: 'Find the best funding opportunities for your startup.',
    icon: <BusinessCenter />,
    image: 'path/to/funding-image.jpg', // Replace with actual image path
  },
  {
    id: 2,
    title: 'Networking Events',
    description: 'Connect with other entrepreneurs and investors.',
    icon: <Event />,
    image: 'path/to/networking-image.jpg', // Replace with actual image path
  },
  {
    id: 3,
    title: 'Resources',
    description: 'Access valuable resources to help grow your business.',
    icon: <LibraryBooks />,
    image: 'path/to/resources-image.jpg', // Replace with actual image path
  },
  {
    id: 4,
    title: 'Success Stories',
    description: 'Get inspired by the success stories of other entrepreneurs.',
    icon: <Star />,
    image: 'path/to/success-stories-image.jpg', // Replace with actual image path
  },
];

const ongoingEvents = [
  { id: 1, name: 'Tech Startup Conference', date: '2023-06-25', location: 'San Francisco' },
  { id: 2, name: 'Investor Meetup', date: '2023-07-10', location: 'New York' },
];

const mentors = [
  { id: 1, name: 'John Doe', role: 'Tech Mentor', avatar: <Person /> },
  { id: 2, name: 'Jane Smith', role: 'Business Mentor', avatar: <Person /> },
];

const investors = [
  { id: 1, name: 'Robert Johnson', role: 'Venture Capitalist', avatar: <AccountBalance /> },
  { id: 2, name: 'Emily Davis', role: 'Angel Investor', avatar: <AccountBalance /> },
];

const entrepreneurs = [
  { id: 1, name: 'Alice Brown', role: 'Startup Founder', avatar: <Person /> },
  { id: 2, name: 'Michael White', role: 'Serial Entrepreneur', avatar: <Person /> },
];

const Explore = () => {
  const handleCategoryClick = (categoryId) => {
    console.log(`Category clicked: ${categoryId}`);
    // Implement navigation to category details page or relevant action here
  };

  const handleConnectClick = (type, id) => {
    console.log(`Connect clicked: ${type} ID ${id}`);
    // Implement connect logic here
  };

  return (
    <>
      <Header />
      <Container sx={{ marginTop: '20px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Explore Opportunities
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          Discover various opportunities and resources to help you on your entrepreneurial journey.
        </Typography>
        <Grid container spacing={4}>
          {categories.map((category) => (
            <Grid item key={category.id} xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  image={category.image}
                  alt={category.title}
                  sx={{ height: 140 }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {category.icon} {category.title}
                  </Typography>
                  <Typography>
                    {category.description}
                  </Typography>
                </CardContent>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleCategoryClick(category.id)}
                  sx={{ margin: '10px' }}
                >
                  Explore
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h5" align="left" gutterBottom sx={{ marginTop: '40px' }}>
          Ongoing Events
        </Typography>
        <Grid container spacing={4}>
          {ongoingEvents.map((event) => (
            <Grid item key={event.id} xs={12} sm={6} md={4}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{event.name}</Typography>
                  <Typography variant="body2" color="textSecondary">{event.date}</Typography>
                  <Typography variant="body2" color="textSecondary">{event.location}</Typography>
                </CardContent>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleConnectClick('event', event.id)}
                  sx={{ margin: '10px' }}
                >
                  Join Event
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h5" align="left" gutterBottom sx={{ marginTop: '40px' }}>
          Connect with Mentors
        </Typography>
        <List>
          {mentors.map((mentor) => (
            <ListItem key={mentor.id}>
              <ListItemAvatar>
                <Avatar>
                  {mentor.avatar}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={mentor.name} secondary={mentor.role} />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleConnectClick('mentor', mentor.id)}
              >
                Connect
              </Button>
            </ListItem>
          ))}
        </List>

        <Typography variant="h5" align="left" gutterBottom sx={{ marginTop: '40px' }}>
          Connect with Investors
        </Typography>
        <List>
          {investors.map((investor) => (
            <ListItem key={investor.id}>
              <ListItemAvatar>
                <Avatar>
                  {investor.avatar}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={investor.name} secondary={investor.role} />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleConnectClick('investor', investor.id)}
              >
                Connect
              </Button>
            </ListItem>
          ))}
        </List>

        <Typography variant="h5" align="left" gutterBottom sx={{ marginTop: '40px' }}>
          Connect with Entrepreneurs
        </Typography>
        <List>
          {entrepreneurs.map((entrepreneur) => (
            <ListItem key={entrepreneur.id}>
              <ListItemAvatar>
                <Avatar>
                  {entrepreneur.avatar}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={entrepreneur.name} secondary={entrepreneur.role} />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleConnectClick('entrepreneur', entrepreneur.id)}
              >
                Connect
              </Button>
            </ListItem>
          ))}
        </List>
      </Container>
      <Footer />
    </>
  );
};

export default Explore;
