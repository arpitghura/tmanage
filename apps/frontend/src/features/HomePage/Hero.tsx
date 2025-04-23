// src/components/Hero.js
import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';

const Hero = () => {
  return (
    <Box className="py-20" sx={{ backgroundColor: '#FFFFFF', textAlign: 'center' }}>
      <Container maxWidth="md">
        {/* Hero Title */}
        <Typography variant="h2" className="font-bold mb-4" sx={{ color: '#060606' }}>
          Welcome to TManage
        </Typography>
        {/* Hero Subtitle */}
        <Typography variant="h5" className="mb-8" sx={{ color: '#6D6D6D' }}>
          Streamline your team's tasks and manage projects effortlessly.
        </Typography>
        {/* CTA Button */}
        <Button 
          variant="contained" 
          size="large" 
          sx={{ 
            backgroundColor: '#5BA978', 
            color: '#FFFFFF', 
            '&:hover': { backgroundColor: '#4A9A6D' } 
          }}>
          Get Started
        </Button>
      </Container>
    </Box>
  );
};

export default Hero;
