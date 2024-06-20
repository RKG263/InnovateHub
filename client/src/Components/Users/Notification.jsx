import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Paper, Box, Avatar, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../redux/store';

const NotificationDialog = ({ open, onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user, loading: userLoading } = useSelector((state) => state.user);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        setLoading(true);
        const userId = user?._id;
        const { data } = await axios.post(`${server}/other/fetchnotifications`, { userId }, {
          withCredentials: true,
        });
        if (data.notifications) {
          const sortedNotifications = data.notifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setNotifications(sortedNotifications);
        } else {
          console.error('Invalid response structure:', data);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      getNotifications();
    }
  }, [user]);

  const handleResponse = async (notificationId, action, sendId) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/other/handlenotification`,
        { notificationId, action, senderId: user._id, receiverId: sendId },
        { withCredentials: true }
      );
      if (data.success) {
        // Update the status locally
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification._id === notificationId
              ? { ...notification, status: action === 'accepted' ? 'accepted' : 'rejected' }
              : notification
          )
        );
      } else {
        console.error('Failed to update notification status:', data.error);
      }
    } catch (error) {
      console.error('Error updating notification status:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Notifications</DialogTitle>
      <DialogContent dividers style={{ backgroundColor: '#e0f7fa' }}>
        {userLoading || loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <CircularProgress />
          </Box>
        ) : notifications.length === 0 ? (
          <Typography variant="body1">No notifications</Typography>
        ) : (
          notifications.map((notification) => (
            <Paper key={notification._id} style={{ padding: '16px', marginBottom: '8px', backgroundColor: '#ffffff' }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Link to={`/profile/${notification.sender?._id}`} style={{ textDecoration: 'none' }}>
                    <Avatar src={notification.sender?.profile_pic?.url} alt={notification.sender?.name} />
                  </Link>
                  <Box ml={2}>
                    <Typography variant="body1" style={{ color: '#333' }}>{notification.message}</Typography>
                    <Typography variant="body2" color="textSecondary" style={{ color: '#666' }}>
                      {notification.description || "No description"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" style={{ color: '#888' }}>
                      Sent by: {notification.sender?.name} ({notification.sender?.role})
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="caption" color="textSecondary" style={{ color: '#888' }}>
                  {formatDate(notification.createdAt)}
                </Typography>
              </Box>
              <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="caption"
                  style={{
                    color:
                      notification.status === 'accepted'
                        ? '#4CAF50'
                        : notification.status === 'rejected'
                          ? '#F44336'
                          : '#F57323',
                  }}
                >Status: {notification.status}</Typography>
                {notification.status === 'pending' && (
                  <Box>
                    <Button
                      size="small"
                      onClick={() => handleResponse(notification._id, 'accepted', notification.sender._id)}
                      style={{ backgroundColor: '#4caf50', color: '#fff', marginRight: '8px' }}
                    >
                      Accept
                    </Button>
                    <Button
                      size="small"
                      onClick={() => handleResponse(notification._id, 'rejected', notification.sender._id)}
                      style={{ backgroundColor: '#f44336', color: '#fff' }}
                    >
                      Reject
                    </Button>
                  </Box>
                )}
              </Box>
            </Paper>
          ))
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NotificationDialog;
