import React from 'react';
import { CircularProgress, Typography } from '@mui/material';

const SpinningLoader = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <CircularProgress color="primary" size={60} thickness={4} />
      <Typography variant="h6" style={{ marginTop: '20px' }}>Loading...</Typography>
    </div>
  );
};

export default SpinningLoader;