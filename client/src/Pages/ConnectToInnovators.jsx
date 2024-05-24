import React, { useState } from 'react';
import { Container, Typography, Grid, Paper, Avatar, Button, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { Person, BusinessCenter, AccountBalance, LiveHelp } from '@mui/icons-material';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';

const UserListPage = () => {
  const [roleFilter, setRoleFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleUsers, setVisibleUsers] = useState(15);

  const users = [
    { id: 1, name: 'John Doe', role: 'Entrepreneur', bio: 'Passionate about technology startups.', avatar: <Person /> },
    { id: 2, name: 'Jane Smith', role: 'Investor', bio: 'Experienced investor looking for new opportunities.', avatar: <AccountBalance /> },
    { id: 3, name: 'Bob Johnson', role: 'Mentor', bio: 'Helping aspiring entrepreneurs succeed in their ventures.', avatar: <LiveHelp /> },
    // ... more users
  ];
  for (let index = 0; index <50; index++) {
    users.push(users[0]) ;
    
  }
  const handleViewProfile = (userId) => {
    console.log(`View profile clicked for user with ID ${userId}`);
  };

  const handleFindMore = () => {
    setVisibleUsers((prevVisibleUsers) => prevVisibleUsers + 15);
  };

  const filteredUsers = users.filter(user => {
    if (!roleFilter && !searchQuery) return true;
    if (roleFilter && searchQuery) {
      return user.role === roleFilter && user.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    if (roleFilter) return user.role === roleFilter;
    if (searchQuery) return user.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const usersToDisplay = filteredUsers.slice(0, visibleUsers);

  return (
    <>
      <Header />
      <Container>
        <Typography variant="h4" align="center" gutterBottom sx={{ marginTop: '20px' }}>
          Connect to Innovators
        </Typography>
        <Typography variant="h5" align="center" gutterBottom sx={{ marginBottom: '20px' }}>
          Find Amazing Innovators Like You
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ padding: '20px' }}>
              <FormControl fullWidth sx={{ marginBottom: '20px' }}>
                <InputLabel>Filter by Role</InputLabel>
                <Select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <MenuItem value="">All Roles</MenuItem>
                  <MenuItem value="Entrepreneur">Entrepreneur</MenuItem>
                  <MenuItem value="Investor">Investor</MenuItem>
                  <MenuItem value="Mentor">Mentor</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Search by Name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ marginBottom: '20px' }}
              />
            </Paper>
          </Grid>
          {usersToDisplay.map((user) => (
            <Grid item key={user.id} xs={12} sm={6} md={4}>
              <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center' }}>
                <Avatar sx={{ width: 100, height: 100, margin: '0 auto', marginBottom: '10px' }}>
                  {user.avatar}
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  {user.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                  {user.role}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {user.bio}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleViewProfile(user.id)}
                >
                  View Full Profile
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
        {visibleUsers < filteredUsers.length && (
          <Grid container justifyContent="center" sx={{ marginTop: '20px' }}>
            <Button variant="contained" color="primary" onClick={handleFindMore}>
              Find More
            </Button>
          </Grid>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default UserListPage;
