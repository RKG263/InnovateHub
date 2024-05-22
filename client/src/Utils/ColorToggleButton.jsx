import React from 'react';
import { Brightness4 as DarkIcon, Brightness7 as LightIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';

export const ColorToggleButton = ({toggleColorMode , mode}) => {
    return (
      <div>
    <IconButton 
    onClick={toggleColorMode} 
    aria-label="Toggle color mode"
    sx={{
        position: 'fixed',
        right: '2px',
        bottom : '2px' ,
        color: 'text.primary', // Set the color of the icon
      }}
    >
      {mode === 'light' ? <DarkIcon /> : <LightIcon />}
    </IconButton>
    </div>
    )
  }
  