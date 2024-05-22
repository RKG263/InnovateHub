import React, { createContext, useState, useMemo, useContext } from 'react';
import { ColorToggleButton } from './ColorToggleButton';

const ColorModeContext = createContext();

 const useColorMode = () => useContext(ColorModeContext);

export const ColorModeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const value = useMemo(() => ({ mode, toggleColorMode }), [mode]);

  return (
    <ColorModeContext.Provider value={value}>
       <ColorToggleButton toggleColorMode={toggleColorMode} mode = {mode}/>
       {children}    
    </ColorModeContext.Provider>
  );
};

export  {useColorMode }  ;