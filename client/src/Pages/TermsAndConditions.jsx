import React, { useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import data from '../assets/termsAndconditions';

const TermsAndConditions = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Terms & Conditions
        </Typography>
        <Box sx={{ backgroundColor: '#f5f5f5', p: 2, borderRadius: '8px' }}>
          <Typography variant="body1">
            {expanded ? data : `${data.slice(0, 1050)}...`}
          </Typography>
          {!expanded && (
            <Button onClick={toggleExpanded} color="primary">
              Read More
            </Button>
          )}
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
