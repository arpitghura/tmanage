// src/components/Features.js
import React from 'react';
import { Container, Typography, Box, Grid, Paper, CardMedia } from '@mui/material';

const features = [
  { 
    title: 'Team Management', 
    description: 'Create teams, assign roles, and manage collaborations.',
    imgSrc: 'https://via.placeholder.com/300x200?text=Team+Management' // Dummy image URL
  },
  { 
    title: 'Task Assignment', 
    description: 'Assign tasks with deadlines and track completion.',
    imgSrc: 'https://via.placeholder.com/300x200?text=Task+Assignment' // Dummy image URL
  },
  { 
    title: 'Role-based Access', 
    description: 'Admins and collaborators have specific permissions for better control.',
    imgSrc: 'https://via.placeholder.com/300x200?text=Role-based+Access' // Dummy image URL
  },
  { 
    title: 'Task Filtering', 
    description: 'Filter tasks by labels, priority, or completion status.',
    imgSrc: 'https://via.placeholder.com/300x200?text=Task+Filtering' // Dummy image URL
  },
];

const Features = () => {
  return (
    <Box className="py-16" sx={{ backgroundColor: '#EDEDED' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" className="text-center font-bold mb-8" sx={{ color: '#060606' }}>
          Key Features of TManage
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper 
                className="p-6 rounded-lg shadow-md" 
                sx={{ backgroundColor: '#FFFFFF', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
                {/* Image */}
                <CardMedia
                  component="img"
                  height="200"
                  image={feature.imgSrc}
                  alt={feature.title}
                  className="rounded mb-4"
                />
                {/* Feature Title */}
                <Typography variant="h6" className="font-semibold mb-2" sx={{ color: '#5BA978' }}>
                  {feature.title}
                </Typography>
                {/* Feature Description */}
                <Typography sx={{ color: '#6D6D6D' }}>{feature.description}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Features;
