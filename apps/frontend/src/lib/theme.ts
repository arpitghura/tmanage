// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#5BA978', // Green - Used for primary actions (buttons, highlights)
      contrastText: '#FFFFFF', // White for text contrast on buttons, etc.
    },
    secondary: {
      main: '#5748C1', // Purple - Used for secondary actions or accents
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#E6773C', // Orange - Used for warnings, cautionary UI elements
    },
    background: {
        default: '#EDEDED',
        paper: '#FFFFFF', // Keep card/paper background white for contrast
     },     
    text: {
      primary: '#060606', // Black - Main text color for high readability
      secondary: '#6D6D6D', // Light gray for less important text
    },
    divider: '#9CA3AF', // Subtle dividers for better section separation
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#060606', // Ensures main headers have good contrast
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#060606',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      color: '#060606',
    },
    body1: {
      fontSize: '1rem',
      color: '#060606',
    },
    button: {
      textTransform: 'none', // No uppercase transformation for readability
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Slight rounding for buttons
          padding: '8px 16px', // Enterprise feel - balanced padding
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '16px',
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
        },
      },
    },
  },
});

export default theme;
