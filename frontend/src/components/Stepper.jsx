import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { toast } from 'react-hot-toast';

const Stepper = ({ value, onChange, width = '400px', height = '40px', maxValue = Infinity }) => {
  const handleIncrement = () => {
    if (value >= maxValue) {
      toast.error('Maximum quantity reached');
      return;
    }
    onChange(value + 1);
  };

  const handleDecrement = () => {
    if (value <= 1) {
      toast.error('Minimum quantity is 1');
      return;
    }
    onChange(value - 1);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        width,
        height,
        border: '1px solid #ccc',
        borderRadius: '4px',
        px: 1,
      }}
    >
      <IconButton
        onClick={handleDecrement}
        sx={{
          p: 0,
          width: 24,
          height: 24,
          fontSize: 14,
          color: value <= 1 ? '#ccc' : '#1A1A1A',
          '&:hover': {
            backgroundColor: 'transparent',
            '&:hover, &:active, &:focus, &:focus-visible': {
              backgroundColor: 'transparent',
              outline: 'none',
            },
          },
        }}
        disabled={value <= 1}
      >
        <RemoveIcon fontSize="inherit" />
      </IconButton>

      <Typography fontFamily="PoppinsR" fontSize="16px" color='#1A1A1A'>
        {value}
      </Typography>

      <IconButton
        onClick={handleIncrement}
        sx={{
          p: 0,
          width: 24,
          height: 24,
          color: value >= maxValue ? '#ccc' : '#1A1A1A',
          fontSize: 16,
          '&:hover, &:active, &:focus, &:focus-visible': {
            backgroundColor: 'transparent',
            outline: 'none',
          },
        }}
        disabled={value >= maxValue}
      >
        <AddIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );
};

export default Stepper;
