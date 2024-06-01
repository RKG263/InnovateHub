import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper, Avatar, Button, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from '../redux/store';
import SpinningLoader from '../Shared/SpinningLoader';
import { useSelector } from 'react-redux';

const UserListPage = () => {
  const [roleFilter, setRoleFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleUsers, setVisibleUsers] = useState(15);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await axios.get(`${server}/other/allusers`, {
          withCredentials: true,
        });
        // console.log('Fetched Data:', data); // Debugging statement
        if (data.users) {
          const usersArray = Object.keys(data.users).map(key => ({
            id: key,
            ...data.users[key],
          }));
          // console.log('Users Array:', usersArray); // Debugging statement
          setUsers(usersArray);
        } else {
          console.error('Invalid response structure:', data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  const handleViewProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };

  const handleFindMore = () => {
    setVisibleUsers((prevVisibleUsers) => prevVisibleUsers + 15);
  };

  const filteredUsers = users.filter(user => {
    // if (user._id == currentUser._id) return false;

    const searchQueryLower = searchQuery.toLowerCase();
    const userNameLower = user.name ? user.name.toLowerCase() : '';
    const userRoleLower = user.role ? user.role.toLowerCase() : '';

    if (!roleFilter && !searchQuery) return true;
    if (roleFilter && searchQuery) {
      return userRoleLower === roleFilter.toLowerCase() && userNameLower.includes(searchQueryLower);
    }
    if (roleFilter) return userRoleLower === roleFilter.toLowerCase();
    if (searchQuery) return userNameLower.includes(searchQueryLower);
    return false;
  });

  const usersToDisplay = filteredUsers.slice(0, visibleUsers);

  console.log('Users:', users); // Debugging statement
  console.log('Filtered Users:', filteredUsers); // Debugging statement

  return (
    <>
      <Header />
      <Container sx={{ marginTop: '20px', marginBottom: '20px' }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ marginTop: '20px' }}>
          Connect to Innovators
        </Typography>
        <Typography variant="h5" align="center" gutterBottom sx={{ marginBottom: '20px' }}>
          Find Amazing Innovators Like You
        </Typography>
        {loading ? (
          <SpinningLoader />
        ) : (
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
            {filteredUsers.length === 0 ? (
              <Typography
                variant="h3"
                sx={{
                  color: 'red',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '40vh',
                  marginLeft: '30vh',
                  marginTop: '10vh',
                  marginBottom: '1px',
                }}
              >
                No User Available
              </Typography>
            ) : (
              usersToDisplay.map((user) => (
                <Grid item key={user.id} xs={12} sm={6} md={4}>
                  <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center' }}>
                    <Avatar
                      src = {user?.profile_pic?.url}
                      sx={{ width: 100, height: 100, margin: '0 auto', marginBottom: '10px' }}
                    />
              
           
                    <Typography variant="h6" gutterBottom>
                      {user.name || 'No Name'} {/* Use a fallback value */}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                      {user.role || 'No Role'} {/* Use a fallback value */}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {user.aboutMe || "Growing"}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleViewProfile(user._id)}
                    >
                      View Full Profile
                    </Button>
                  </Paper>
                </Grid>
              ))
            )}
          </Grid>
        )}
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
