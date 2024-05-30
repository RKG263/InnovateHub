// import React, { useState, useEffect } from 'react';
// import {
//   Container, Paper, Typography, List, ListItem, ListItemText, ListItemIcon, Badge, Divider, Button, Dialog,
//   DialogTitle, DialogContent, DialogContentText, DialogActions, TextField
// } from '@mui/material';
// import { styled } from '@mui/system';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
// import UndoIcon from '@mui/icons-material/Undo';

// const Root = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(3),
//   marginTop: theme.spacing(3),
// }));

// const NotificationPage = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [selectedNotification, setSelectedNotification] = useState(null);
//   const [responseDescription, setResponseDescription] = useState('');

//   useEffect(() => {
//     // Fetch notifications from the server
//     fetch('/api/notifications')
//       .then(response => response.json())
//       .then(data => setNotifications(data));
//   }, []);

//   const handleOpen = (notification) => {
//     setSelectedNotification(notification);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedNotification(null);
//     setResponseDescription('');
//   };

//   const handleResponse = (notification, response) => {
//     // Handle accept/reject logic here, e.g., update notification status in the backend
//     fetch(`/api/notifications/${notification.id}/${response}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ description: responseDescription }),
//     })
//       .then(response => response.json())
//       .then(updatedNotification => {
//         setNotifications(notifications.map(notif => notif.id === updatedNotification.id ? updatedNotification : notif));
//         setSelectedNotification(updatedNotification);
//       });

//     handleClose();
//   };

//   const handleUndo = (notification) => {
//     // Handle undo logic here, e.g., update notification status in the backend
//     fetch(`/api/notifications/${notification.id}/undo`, {
//       method: 'POST'
//     })
//       .then(response => response.json())
//       .then(updatedNotification => {
//         setNotifications(notifications.map(notif => notif.id === updatedNotification.id ? updatedNotification : notif));
//         setSelectedNotification(updatedNotification);
//       });
//   };

//   return (
//     <Container maxWidth="sm">
//       <Root elevation={3}>
//         <Typography variant="h5" gutterBottom>
//           Notifications
//         </Typography>
//         <List>
//           {notifications.map((notification) => (
//             <div key={notification.id}>
//               <ListItem>
//                 <ListItemIcon>
//                   <Badge
//                     color="secondary"
//                     variant="dot"
//                     invisible={notification.read}
//                   >
//                     <NotificationsIcon />
//                   </Badge>
//                 </ListItemIcon>
//                 <ListItemText
//                   primary={notification.title}
//                   secondary={`${notification.description} - ${new Date(notification.timestamp).toLocaleString()}`}
//                 />
//                 {notification.read ? (
//                   <CheckCircleIcon color="primary" />
//                 ) : (
//                   <RadioButtonUncheckedIcon color="secondary" />
//                 )}
//                 {notification.type === 'request' ? (
//                   notification.status ? (
//                     <>
//                       <Typography variant="body2" color="textSecondary">
//                         {notification.status === 'accepted' ? 'You accepted this request' : 'You rejected this request'}
//                       </Typography>
//                       <Button
//                         variant="contained"
//                         color="secondary"
//                         startIcon={<UndoIcon />}
//                         onClick={() => handleUndo(notification)}
//                       >
//                         Undo
//                       </Button>
//                     </>
//                   ) : (
//                     <Button variant="contained" color="primary" onClick={() => handleOpen(notification)}>
//                       {notification.read ? 'View Details' : 'Respond'}
//                     </Button>
//                   )
//                 ) : (
//                   <Button variant="contained" color="primary" onClick={() => handleOpen(notification)}>
//                     View Response
//                   </Button>
//                 )}
//               </ListItem>
//               <Divider />
//             </div>
//           ))}
//         </List>
//       </Root>

//       {selectedNotification && (
//         <Dialog open={open} onClose={handleClose}>
//           <DialogTitle>Notification Details</DialogTitle>
//           <DialogContent>
//             <DialogContentText>
//               Name: {selectedNotification.name}
//             </DialogContentText>
//             <DialogContentText>
//               Email: {selectedNotification.email}
//             </DialogContentText>
//             <DialogContentText>
//               Description: {selectedNotification.description}
//             </DialogContentText>
//             {selectedNotification.type === 'request' && (
//               <TextField
//                 label="Response Description (optional)"
//                 value={responseDescription}
//                 onChange={(e) => setResponseDescription(e.target.value)}
//                 multiline
//                 rows={4}
//                 fullWidth
//                 margin="normal"
//               />
//             )}
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleClose} color="primary">
//               Close
//             </Button>
//             {selectedNotification.type === 'request' && !selectedNotification.status && (
//               <>
//                 <Button onClick={() => handleResponse(selectedNotification, 'accept')} color="primary">
//                   Accept
//                 </Button>
//                 <Button onClick={() => handleResponse(selectedNotification, 'reject')} color="secondary">
//                   Reject
//                 </Button>
//               </>
//             )}
//           </DialogActions>
//         </Dialog>
//       )}
//     </Container>
//   );
// };

// export default NotificationPage;

import React, { useState } from 'react';
import {
  Container, Paper, Typography, List, ListItem, ListItemText, ListItemIcon, Badge, Divider, Button, Dialog,
  DialogTitle, DialogContent, DialogContentText, DialogActions, TextField
} from '@mui/material';
import { styled } from '@mui/system';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import UndoIcon from '@mui/icons-material/Undo';

const Root = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
}));

const rawData = [
  {
    id: 1,
    title: "New Approach Request",
    description: "You have a new approach request from John Doe.",
    timestamp: "2024-05-27T14:48:00.000Z",
    name: "John Doe",
    email: "john@example.com",
    detailedDescription: "Requesting a meeting to discuss investment opportunities.",
    type: "request",
    status: null,
    read: false
  },
  {
    id: 2,
    title: "Your Request Accepted",
    description: "Your request has been accepted by Jane Smith.",
    timestamp: "2024-05-26T12:34:00.000Z",
    name: "Jane Smith",
    email: "jane@example.com",
    detailedDescription: "I am interested in your proposal. Let's schedule a meeting.",
    type: "response",
    status: null,
    read: true
  }
];

const NotificationPage = () => {
  const [notifications, setNotifications] = useState(rawData);
  const [open, setOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [responseDescription, setResponseDescription] = useState('');

  const handleOpen = (notification) => {
    setSelectedNotification(notification);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedNotification(null);
    setResponseDescription('');
  };

  const handleResponse = (notification, response) => {
    setNotifications(notifications.map(notif => 
      notif.id === notification.id 
        ? { ...notif, status: response, read: true } 
        : notif
    ));
    handleClose();
  };

  const handleUndo = (notification) => {
    setNotifications(notifications.map(notif => 
      notif.id === notification.id 
        ? { ...notif, status: null } 
        : notif
    ));
  };

  return (
    <Container maxWidth="sm">
      <Root elevation={3}>
        <Typography variant="h5" gutterBottom>
          Notifications
        </Typography>
        <List>
          {notifications.map((notification) => (
            <div key={notification.id}>
              <ListItem>
                <ListItemIcon>
                  <Badge
                    color="secondary"
                    variant="dot"
                    invisible={notification.read}
                  >
                    <NotificationsIcon />
                  </Badge>
                </ListItemIcon>
                <ListItemText
                  primary={notification.title}
                  secondary={`${notification.description} - ${new Date(notification.timestamp).toLocaleString()}`}
                />
                {notification.read ? (
                  <CheckCircleIcon color="primary" />
                ) : (
                  <RadioButtonUncheckedIcon color="secondary" />
                )}
                {notification.type === 'request' ? (
                  notification.status ? (
                    <>
                      <Typography variant="body2" color="textSecondary">
                        {notification.status === 'accepted' ? 'You accepted this request' : 'You rejected this request'}
                      </Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<UndoIcon />}
                        onClick={() => handleUndo(notification)}
                      >
                        Undo
                      </Button>
                    </>
                  ) : (
                    <Button variant="contained" color="primary" onClick={() => handleOpen(notification)}>
                      {notification.read ? 'View Details' : 'Respond'}
                    </Button>
                  )
                ) : (
                  <Button variant="contained" color="primary" onClick={() => handleOpen(notification)}>
                    View Response
                  </Button>
                )}
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </Root>

      {selectedNotification && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Notification Details</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Name: {selectedNotification.name}
            </DialogContentText>
            <DialogContentText>
              Email: {selectedNotification.email}
            </DialogContentText>
            <DialogContentText>
              Description: {selectedNotification.detailedDescription}
            </DialogContentText>
            {selectedNotification.type === 'request' && (
              <TextField
                label="Response Description (optional)"
                value={responseDescription}
                onChange={(e) => setResponseDescription(e.target.value)}
                multiline
                rows={4}
                fullWidth
                margin="normal"
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
            {selectedNotification.type === 'request' && !selectedNotification.status && (
              <>
                <Button onClick={() => handleResponse(selectedNotification, 'accepted')} color="primary">
                  Accept
                </Button>
                <Button onClick={() => handleResponse(selectedNotification, 'rejected')} color="secondary">
                  Reject
                </Button>
              </>
            )}
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default NotificationPage;
