import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#ffffff',
    },
    text: {
      primary: '#000000',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#64b5f6', // Adjust primary color as needed
    },
    secondary: {
      main: '#ffcc80', // Adjust secondary color as needed
    },
    background: {
      default: '#303030', // Slightly lighter background color
      paper: '#424242', // Adjust paper color as needed
    },
    text: {
      primary: '#ffffff', // Adjust text color as needed
    },
  },

});

export { lightTheme, darkTheme };
