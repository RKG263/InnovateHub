import React, { useMemo } from 'react';
import ReactDOM from "react-dom/client";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import { ColorModeProvider ,useColorMode } from './Utils/ColorModeContext';
import { lightTheme , darkTheme } from './Utils/theme';
import { Provider as ReduxProvider  } from "react-redux";
import store from './redux/store';



const Root = () => {
  const { mode } = useColorMode();
  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);
  return (
   
    <ReduxProvider store = {store}>
      <ThemeProvider theme={theme}>
         <CssBaseline />
         <App />
       </ThemeProvider>
    </ReduxProvider>
  );
};


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
        {/* <div onContextMenu={(e) => e.preventDefault()}>          */}
        <ColorModeProvider>         
        <Root />
       </ColorModeProvider>
        {/* </div> */}
  </React.StrictMode>
);