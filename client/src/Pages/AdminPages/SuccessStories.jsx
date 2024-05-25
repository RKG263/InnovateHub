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
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const SuccessStoryPage = () => {
  const [story, setStory] = useState({
    title: '',
    description: '',
    image: null,
    link: '',
  });
  const [stories, setStories] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setStory({ title: '', description: '', image: null, link: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStory({
      ...story,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setStory({
      ...story,
      image: e.target.files[0],
    });
  };

  const handleAddStory = () => {
    setStories([...stories, { ...story }]);
    handleClose();
  };

  const handleDeleteStory = (index) => {
    const updatedStories = [...stories];
    updatedStories.splice(index, 1);
    setStories(updatedStories);
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Success Stories
        </Typography>
        <Paper elevation={3} style={{ padding: '16px', maxWidth: '800px', margin: '0 auto' }}>
          <Box mt={4}>
            {stories.map((story, index) => (
              <Card key={index} style={{ marginBottom: '16px', position: 'relative' }}>
                <IconButton
                  onClick={() => handleDeleteStory(index)}
                  style={{ position: 'absolute', right: 8, top: 8, color: 'red' }}
                >
                  <DeleteIcon />
                </IconButton>
                {story.image && (
                  <CardMedia
                    component="img"
                    alt="Success story image"
                    height="200"
                    image={URL.createObjectURL(story.image)}
                    style={{ objectFit: 'cover' }}
                  />
                )}
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {story.title}
                  </Typography>
                  <Typography variant="body1" component="p">
                    {story.description}
                  </Typography>
                  {story.link && (
                    <Typography variant="body2" color="primary">
                      <a href={story.link} target="_blank" rel="noopener noreferrer">
                        Read more
                      </a>
                    </Typography>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>
        </Paper>
      </Box>
      <Box mt={4} display="flex" justifyContent="center">
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add Success Story
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Success Story</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                name="title"
                value={story.title}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={story.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <Typography variant="caption">Upload Image</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Link (optional)"
                name="link"
                value={story.link}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddStory} color="primary">
            Add Story
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SuccessStoryPage;
