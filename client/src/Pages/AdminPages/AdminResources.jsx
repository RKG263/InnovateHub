import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminResources = () => {
  const [resourceType, setResourceType] = useState('');
  const [resource, setResource] = useState({
    name: '',
    url: '',
    category: '',
    file: null,
    wallpaper: null,
    message: '',
  });
  const [resources, setResources] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = (type) => {
    setResourceType(type);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setResourceType('');
    setResource({ name: '', url: '', category: '', file: null, wallpaper: null, message: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResource({
      ...resource,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setResource({
      ...resource,
      file: e.target.files[0],
    });
  };

  const handleWallpaperChange = (e) => {
    setResource({
      ...resource,
      wallpaper: e.target.files[0],
    });
  };

  const handleAddResource = () => {
    setResources([...resources, { ...resource, type: resourceType }]);
    handleClose();
  };

  const handleDeleteResource = (index) => {
    const updatedResources = [...resources];
    updatedResources.splice(index, 1);
    setResources(updatedResources);
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin - Add Resource
        </Typography>
        <Paper elevation={3} style={{ padding: '16px' }}>
          <Box mt={4}>
            <Typography variant="h5" component="h2">
              Resources List
            </Typography>
            <Paper elevation={3} style={{ padding: '16px', maxWidth: '600px', margin: '0 auto' }}>
              {resources.map((res, index) => (
                <Paper key={index} style={{ padding: '16px', marginBottom: '16px', position: 'relative' }}>
                  <IconButton
                    onClick={() => handleDeleteResource(index)}
                    style={{ position: 'absolute', right: 0, top: 0 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Typography variant="body1">
                    <strong>Name:</strong> {res.name}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Type:</strong> {res.type}
                  </Typography>
                  {res.type === 'link' || res.type === 'video' ? (
                    <Typography variant="body1">
                      <strong>URL:</strong> <a href={res.url}>{res.url}</a>
                    </Typography>
                  ) : (
                    <Typography variant="body1">
                      <strong>File:</strong> {res.file ? res.file.name : 'No file uploaded'}
                    </Typography>
                  )}
                  {res.type === 'message' && (
                    <Typography variant="body1">
                      <strong>Message:</strong> {res.message}
                    </Typography>
                  )}
                  <Typography variant="body1">
                    <strong>Category:</strong> {res.category}
                  </Typography>
                  {res.wallpaper && (
                    <Box mt={2}>
                      <Typography variant="body1">
                        <strong>Wallpaper:</strong>
                      </Typography>
                      <img
                        src={URL.createObjectURL(res.wallpaper)}
                        alt="wallpaper"
                        style={{ width: '100%', height: 'auto', maxHeight: '200px' }}
                      />
                    </Box>
                  )}
                </Paper>
              ))}
            </Paper>
          </Box>
        </Paper>
      </Box>
      <Box mt={4}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button variant="contained" color="primary" onClick={() => handleOpen('link')}>
              Add Link
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={() => handleOpen('video')}>
              Upload Video
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={() => handleOpen('pdf')}>
              Upload PDF
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={() => handleOpen('message')}>
              Send Message
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add {resourceType.charAt(0).toUpperCase() + resourceType.slice(1)}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Resource Name"
                name="name"
                value={resource.name}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            {resourceType === 'link' && (
              <Grid item xs={12}>
                <TextField
                  label="Resource URL"
                  name="url"
                  value={resource.url}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            )}
            {resourceType === 'video' && (
              <Grid item xs={12}>
                <TextField
                  label="Video URL"
                  name="url"
                  value={resource.url}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            )}
            {resourceType === 'pdf' && (
              <Grid item xs={12}>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                />
              </Grid>
            )}
            {resourceType === 'message' && (
              <Grid item xs={12}>
                <TextField
                  label="Message"
                  name="message"
                  value={resource.message}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                label="Category"
                name="category"
                value={resource.category}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                accept="image/*"
                onChange={handleWallpaperChange}
              />
              <Typography variant="caption">Upload Wallpaper</Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddResource} color="primary">
            Add Resource
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminResources;
