import React, { useMemo } from 'react';
import ReactDOM from "react-dom/client";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import { ColorModeProvider ,useColorMode } from './Utils/ColorModeContext';
import { lightTheme , darkTheme } from './Utils/theme';



<<<<<<< HEAD

const Root = () => {
  const { mode } = useColorMode();
  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);
  return (
    <ThemeProvider theme={theme}>
     <CssBaseline />
      <App />
   </ThemeProvider>
  );
};


ReactDOM.createRoot(document.getElementById("root")).render(
=======
ReactDOM.createRoot(document.getElementById('root')).render(
>>>>>>> 276e5848f061ce8d93d3d4748eba3bbb79f23623
  <React.StrictMode>
        <div onContextMenu={(e) => e.preventDefault()}>         
        <ColorModeProvider>         
        <Root />
       </ColorModeProvider>
        </div>
  </React.StrictMode>
);