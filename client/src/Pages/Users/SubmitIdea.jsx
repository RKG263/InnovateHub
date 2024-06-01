import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper, Grid } from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';

const SubmitIdea = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    description: '',
    document: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} style={{ padding: '32px', marginTop: '32px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Submit Your Idea
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="name"
                label="Your Name"
                variant="outlined"
                
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="email"
                label="Your Email"
                type="email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="businessName"
                label="Business Name"
                variant="outlined"
                value={formData.businessName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="description"
                label="Business Description"
                variant="outlined"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center">
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Document
                  <input
                    type="file"
                    hidden
                    name="document"
                    onChange={handleChange}
                  />
                </Button>
                {formData.document && (
                  <Typography variant="body1" style={{ marginLeft: '16px' }}>
                    {formData.document.name}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ width: '200px' }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SubmitIdea;
