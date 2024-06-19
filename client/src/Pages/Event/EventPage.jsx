import React, { useEffect, useState } from 'react';
import {
  Container, Grid, Card, CardContent, CardMedia, Typography, Button, Avatar, Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField, CircularProgress, Snackbar, IconButton,
  Link
} from '@mui/material';
import { DatePicker, TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { server } from '../../redux/store';
import { de } from 'date-fns/locale/de';
import logo from '../../assets/logo.png';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';



const EventPage = () => {
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    topic: '', description: '', startDate: null, startTime: null, endDate: null, endTime: null, wallpaper: '', webinarLink: '', takerEmail: ''
  });
  const [wallpaper, setWallpaper] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    setLoading(true);
    axios.get(`${server}/events`, { withCredentials: true })
      .then(response => {
        setLoading(false);
        if (Array.isArray(response.data)) {
          setEvents(response.data);
        } else {
          setEvents([]);
        }
      })
      .catch(error => {
        setLoading(false);
        console.error('Error fetching events:', error);
        setEvents([]);
        handleSnackbarOpen('Failed to fetch events', 'error');
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleCreateEvent = () => {
    setLoading(true);
    const formData = new FormData();
    Object.keys(form).forEach(key => {
      if (form[key] !== null) {
        formData.append(key, form[key]);
      }
    });
    if (wallpaper) {
      formData.append('file', wallpaper);
    }

    axios.post(`${server}/events`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true,
    })
      .then(response => {
        setLoading(false);
        setEvents([...events, response.data]);
        setOpen(false);
        setForm({
          topic: '', description: '', startDate: null, startTime: null, endDate: null, endTime: null, wallpaper: '', webinarLink: '', takerEmail: ''
        });
        setWallpaper(null);
        handleSnackbarOpen('Event created successfully', 'success');
      })
      .catch(error => {
        setLoading(false);
        console.error('Error creating event:', error);
        handleSnackbarOpen('Failed to create event', 'error');
      });
  };

  const deleteEvent = (id) => {
    setLoading(true);
    axios.delete(`${server}/events/${id}`, { withCredentials: true })
      .then(() => {
        setLoading(false);
        setEvents(events.filter(event => event._id !== id));
        handleSnackbarOpen('Event deleted successfully', 'success');
      })
      .catch(error => {
        setLoading(false);
        console.error('Error deleting event:', error);
        handleSnackbarOpen('Failed to delete event', 'error');
      });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSnackbarOpen = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const renderEventCard = (event) => {
    const now = new Date();

    const startDateTime = new Date(event.startDate);
    startDateTime.setHours(new Date(event.startTime).getHours());
    startDateTime.setMinutes(new Date(event.startTime).getMinutes());

    const endDateTime = new Date(event.endDate);
    endDateTime.setHours(new Date(event.endTime).getHours());
    endDateTime.setMinutes(new Date(event.endTime).getMinutes());

    let status = 'Upcoming';
    if (now > endDateTime) status = 'Past';
    else if (now > startDateTime) status = 'Ongoing';

    let statusColor = '';
    if (status === 'Upcoming') {
      statusColor = 'green';
    } else if (status === 'Ongoing') {
      statusColor = 'blue';
    } else {
      statusColor = 'orange';
    }
    console.log(event);
    return (
      
      <Grid item xs={12} key={event._id}>
        
        <Card>
          
          <Box display="flex">
            <CardMedia
              component="img"
              sx={{ width: 150, height: 150, objectFit: 'cover' }}
              image={event.wallpaper || logo}
              alt={event.topic}
            />
            <CardContent sx={{ flex: 1 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography gutterBottom variant="h5" component="div">
                    {event.topic}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.description}
                  </Typography>
                  <Box mt={2} display="flex" alignItems="center">
                    <Avatar src={event.taker.profile_pic} alt={event.taker.name} />
                    <Box ml={2}>
                      <Typography variant="body2">
                        {event.taker.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {event.taker.aboutMe}
                      </Typography>
                    </Box>
                  </Box>
                  <Box mt={2}>
                    <Typography variant="body2" style={{ color: statusColor }}>
                      {status}
                    </Typography>
                    <Typography variant="body2" style={{ color: statusColor }}>
                      {status === 'Upcoming' && `Starts ${format(startDateTime, 'dd-MM-yyyy HH:mm')}`}
                      {status === 'Ongoing' && `Ends ${format(endDateTime, 'dd-MM-yyyy HH:mm')}`}
                      {status === 'Past' && `Ended ${format(endDateTime, 'dd-MM-yyyy HH:mm')}`}
                    </Typography>
                  </Box>
                </Box>
                <Box mt={2} display="flex" flexDirection="column" alignItems="flex-end">
                  <Link  href={event.webinarLink} target="_blank" rel="noopener">
                  { console.log(event.webinarLink)}
                  <Button
                    variant="contained"
                    color="primary"            
                    // onClick={() => window.open(event.webinarLink, '_blank', 'noopener,noreferrer')}
                  >
                    Join Webinar
                  </Button>
                  </Link>
                 
                  {user?.isAdmin && (
                    <>
                      <Button variant="outlined" color="secondary" onClick={() => deleteEvent(event._id)} style={{ marginTop: '10px' }}>
                        Delete
                      </Button>
                    </>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Box>
        </Card>
      </Grid>
    );
  };

  return (
    <>
      <Header />

      <Container style={{ backgroundColor: '#e0f7fa', padding: '20px', borderRadius: '8px' }}
        className='min-h-screen'
      >
        <Typography variant="h4" gutterBottom align="center">
          Events
        </Typography>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
            <CircularProgress />
          </Box>
        ) : (
          <>
            {events.length === 0 ? (
              <Typography variant="body1" style={{ color: 'orange', textAlign: 'center', marginTop: '20px' }}>
                No events available.
              </Typography>
            ) : (
              <Grid container spacing={3}>
                {events.map(renderEventCard)}
              </Grid>
            )}
            {user?.isAdmin && (
              <Box mt={4} textAlign="center">
                <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                  Create Event
                </Button>
                <Dialog open={open} onClose={() => setOpen(false)}>
                  <DialogTitle>Create Event</DialogTitle>
                  <DialogContent>
                    <TextField
                      margin="dense"
                      label="Topic"
                      name="topic"
                      value={form.topic}
                      onChange={handleChange}
                      fullWidth
                    />
                    <TextField
                      margin="dense"
                      label="Description"
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      fullWidth
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={de}>
                      <DatePicker
                        label="Start Date"
                        value={form.startDate}
                        onChange={(newValue) => handleDateChange('startDate', newValue)}
                        renderInput={(params) => <TextField {...params} fullWidth margin="dense" />}
                      />
                      <TimePicker
                        label="Start Time"
                        value={form.startTime}
                        onChange={(newValue) => handleDateChange('startTime', newValue)}
                        renderInput={(params) => <TextField {...params} fullWidth margin="dense" />}
                      />
                      <DatePicker
                        label="End Date"
                        value={form.endDate}
                        onChange={(newValue) => handleDateChange('endDate', newValue)}
                        renderInput={(params) => <TextField {...params} fullWidth margin="dense" />}
                      />
                      <TimePicker
                        label="End Time"
                        value={form.endTime}
                        onChange={(newValue) => handleDateChange('endTime', newValue)}
                        renderInput={(params) => <TextField {...params} fullWidth margin="dense" />}
                      />
                    </LocalizationProvider>
                    <TextField
                      margin="dense"
                      label="Webinar Link"
                      name="webinarLink"
                      value={form.webinarLink}
                      onChange={handleChange}
                      fullWidth
                    />
                    <TextField
                      margin="dense"
                      label="Taker Email"
                      name="takerEmail"
                      value={form.takerEmail}
                      onChange={handleChange}
                      fullWidth
                    />
                    <Box mt={2} textAlign="center">
                      {wallpaper && (
                        <img
                          src={URL.createObjectURL(wallpaper)}
                          alt="Wallpaper Preview"
                          style={{ width: '100%', maxHeight: '100px', objectFit: 'cover', marginBottom: '10px' }}
                        />
                      )}
                      <Button
                        variant="contained"
                        component="label"
                        startIcon={<PhotoCamera />}
                      >
                        Upload Thumbnail
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={(e) => setWallpaper(e.target.files[0])}
                        />
                      </Button>
                    </Box>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={handleCreateEvent} color="primary">
                      Create
                    </Button>
                  </DialogActions>
                </Dialog>
              </Box>
            )}
          </>
        )}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
          ContentProps={{
            style: {
              backgroundColor: snackbarSeverity === 'success' ? 'green' : 'red',
              color: '#fff',
            },
          }}
        />
      </Container>

      <Footer />
    </>
  );
};

export default EventPage;
