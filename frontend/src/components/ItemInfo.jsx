import React from 'react';
import { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Button,
  Typography,
  CardMedia,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Stepper from './Stepper';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import "../App.css";

const ActionModal = ({ open, onClose, onAction2, props, stock, setStock, quantity, setProdQuantity, cart, setCart }) => {
  const { auth } = useAuth();
  const [pickedQuant, setPickedQuant] = useState(1);
  const [locQuant, setQuant] = useState(quantity);

  const handleAddToCart = () => {
    if (!auth.accessToken) {
      toast.error('Please sign in to add items to cart');
      onClose();
      return;
    }

    if (pickedQuant > locQuant) {
      toast.error('Not enough stock available');
      return;
    }

    // Ensure cart is an array before proceeding
    const currentCart = Array.isArray(cart) ? cart : [];
    
    const existingIndex = currentCart.findIndex(item => item[5] === props[5]);

    if (existingIndex !== -1) {
      // Item exists in cart, update quantity
      const updatedCart = [...currentCart];
      const currentQuantity = parseInt(updatedCart[existingIndex][7]) || 0;
      const newQuantity = currentQuantity + pickedQuant;

      if (newQuantity > locQuant) {
        toast.error('Not enough stock available');
        return;
      }

      // Update the cart item with new quantity
      updatedCart[existingIndex] = [
        props[0], // price
        props[1], // name
        props[2], // stock
        props[3], // category
        props[4], // desc
        props[5], // productId
        props[6], // photo
        newQuantity // quantity
      ];

      setCart(updatedCart);
    } else {
      // Add new item to cart with proper structure
      const newItem = [
        props[0], // price
        props[1], // name
        props[2], // stock
        props[3], // category
        props[4], // desc
        props[5], // productId
        props[6], // photo
        pickedQuant // quantity
      ];
      setCart([...currentCart, newItem]);
    }

    // Update stock quantities
    setQuant(prev => (prev > 0 ? prev - pickedQuant : 0));
    setProdQuantity(prev => (prev > 0 ? prev - pickedQuant : 0));
    setStock(prev => (prev > 0 ? prev - pickedQuant : 0));
    
    toast.success("Added to cart!");
    onAction2?.();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          pt: 6,
          borderRadius: 2,
          width: '60vw',
          maxWidth: 650,
          aspectRatio: '1.385', // 900 / 650
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          size='medium'
          sx={{
            position: 'absolute',
            top: 10,
            left: 18,
            zIndex: 1,
            width: 'auto',
            color: '#1A1A1A',
            '&:hover, &:active, &:focus, &:focus-visible': {
              backgroundColor: 'transparent',
              outline: 'none',
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Horizontal Container */}
        <Box display="flex" flexDirection="row" gap={7} height="100%" pb={2}>
          {/* Image Container */}
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            gap={5}
            maxWidth="50%"
            height="100%"
            overflow="hidden"
          >
            <CardMedia
              component="img"
              image={props[6] || "https://via.placeholder.com/206x200"}
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />

            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              gap={2}
              sx={{
                height: '20%',
                width: '100%',
                overflow: 'hidden',
              }}
            >
              {[...Array(3)].map((_, index) => (
                <CardMedia
                  key={index}
                  component="img"
                  image={props[6] || "https://via.placeholder.com/206x200"}
                  sx={{
                    maxWidth: '30%',
                    width: 'auto',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Detail Container */}
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            width="50%"
          >
            <Box
              display="flex"
              flexDirection="column"
              width="100%"
              height="90%"
              paddingBottom="10%"
              gap={2}
            >
              <Typography fontFamily="Poppins" variant="h4" color="#1A1A1A">
                {props[1]}
              </Typography>

              {/* Price Detail */}
              <Box display="flex" flexDirection="column" gap={0.5}>
                <Typography fontFamily="Poppins" variant="h6" color="#1A1A1A">
                  Price
                </Typography>
                <Typography fontFamily="Poppins" variant="body2" color="#0000009D">
                  {props[0]}
                </Typography>
              </Box>

              {/* Info Detail */}
              <Box
                display="flex"
                flexDirection="column"
                gap={0.5}
                flexGrow={1}
                overflow="auto"
              >
                <Typography fontFamily="Poppins" variant="h6" color="#1A1A1A">
                  Details
                </Typography>
                <Typography fontFamily="Poppins" variant="body2" color="#0000009D">
                  {props[4]}
                </Typography>
              </Box>

              {/* Quantity Detail */}
              <Box display="flex" flexDirection="column" gap={0.5}>
                <Typography fontFamily="Poppins" variant="h6" color="#1A1A1A">
                  Quantity
                </Typography>
                <Stepper 
                  value={pickedQuant} 
                  onChange={setPickedQuant} 
                  width="40%" 
                  height="40%" 
                  maxValue={locQuant}
                />
                <Typography fontFamily="Poppins" fontSize={12} color="#0000009D">
                  Stock: {locQuant}
                </Typography>
              </Box>
            </Box>

            {/* Add to Cart Button */}
            <Button
              sx={{
                backgroundColor: '#1D8B37',
                color: 'white',
                fontFamily: 'Poppins',
                borderRadius: '20px',
              }}
              variant="outlined"
              fullWidth
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
           
          </Box>
        </Box>

      </Box>
    </Modal>
  );
};

export default ActionModal;
