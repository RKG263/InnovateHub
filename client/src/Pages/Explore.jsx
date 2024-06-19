import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Paper, Card, CardContent, CardMedia, Button, CircularProgress, Box } from '@mui/material';
import { Event, LibraryBooks, Star } from '@mui/icons-material';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import eventurl from '/events.jpg';
import resource from '/resources.png';
import success from '/Success-stories.webp';
import logo from '../assets/logo.png';
import { format } from 'date-fns';
import { server } from '../redux/store';


const categories = [
  {
    id: 2,
    title: 'Networking Events',
    description: 'Connect with other entrepreneurs and investors.',
    icon: <Event />,
    image: eventurl,
  },
  {
    id: 3,
    title: 'Resources',
    description: 'Access valuable resources to help grow your business.',
    icon: <LibraryBooks />,
    image: resource,
  },
  {
    id: 4,
    title: 'Success Stories',
    description: 'Get inspired by the success stories of other entrepreneurs.',
    icon: <Star />,
    image: success,
  },
];

const Explore = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [ongoingEvents, setOngoingEvents] = useState([]);

  useEffect(() => {
    axios.get(`${server}/events`, { withCredentials: true })
      .then(response => {
        setLoading(false);
        if (Array.isArray(response.data)) {
          const now = new Date();
          const ongoing = response.data.filter(event => {
            const startDateTime = new Date(event.startDate);
            startDateTime.setHours(new Date(event.startTime).getHours());
            startDateTime.setMinutes(new Date(event.startTime).getMinutes());

            const endDateTime = new Date(event.endDate);
            endDateTime.setHours(new Date(event.endTime).getHours());
            endDateTime.setMinutes(new Date(event.endTime).getMinutes());

            return now >= startDateTime && now <= endDateTime;
          });
          setOngoingEvents(ongoing);
        }
      })
      .catch(error => {
        setLoading(false);
        console.error('Error fetching events:', error);
        toast.error('Failed to fetch ongoing events');
      });
  }, []);

  const handleCategoryClick = (categoryId) => {
    if (categoryId === 2) {
      navigate('/events');
    } else if (categoryId === 3) {
      navigate('/all-admin-resource');
    } else if (categoryId === 4) {
      navigate('/successstorypage');
    }
  };

  const handleConnectClick = (type, id) => {
    navigate(`/mentor/${id}`);
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
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="20vh">
            <CircularProgress />
          </Box>
        ) : ongoingEvents.length === 0 ? (
          <Typography variant="body1" align="center" color="textSecondary">
            No ongoing events available.
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {ongoingEvents.map((event) => {
              const startDateTime = new Date(event.startDate);
              startDateTime.setHours(new Date(event.startTime).getHours());
              startDateTime.setMinutes(new Date(event.startTime).getMinutes());

              const endDateTime = new Date(event.endDate);
              endDateTime.setHours(new Date(event.endTime).getHours());
              endDateTime.setMinutes(new Date(event.endTime).getMinutes());

              return (
                <Grid item key={event._id} xs={12} sm={6} md={4}>
                  <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Box display="flex">
                      <CardMedia
                        component="img"
                        sx={{ width: 150, height: 150, objectFit: 'cover' }}
                        image={event.wallpaper || logo}
                        alt={event.topic}
                      />
                      <CardContent sx={{ flex: 1 }}>
                        <Typography variant="h6">{event.topic}</Typography>
                        <Typography variant="body2" color="textSecondary">{event.description}</Typography>
                        <Typography variant="body2" color="textSecondary">{`Ends ${format(endDateTime, 'dd-MM-yyyy HH:mm')}`}</Typography>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => window.open(event.webinarLink, '_blank', 'noopener,noreferrer')}
                          sx={{ marginTop: '10px' }}
                        >
                          Join Webinar
                        </Button>
                      </CardContent>
                    </Box>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Explore;
