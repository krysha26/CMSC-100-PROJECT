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
import { ToastContainer, toast } from 'react-toastify';
import "../App.css";
import axios from 'axios';

const ActionModal = ({ open, onClose, onAction2, props, stock, setStock, quantity, setProdQuantity, cart, setCart }) => {
    const[pickedQuant,setPickedQuant] = useState(1);
    const[locQuant,setQuant] = useState(quantity);

//     const addToCart = async () => { // Handle add to cart func Move to add to order once checkout
//     try {
//         const product = await axios.post('http://localhost:5000/api/orders/', {
//         productId: props[5], 
//         orderQuantity: quantity,
//         orderStatus: 0,
//         email: 'franzemail@gmail.com', // Edit email
//         dateOrdered: new Date(),  
//         time: new Date().toLocaleTimeString() 
//         });
//         toast.success("Successfully added to cart",{
//             autoClose: 2000,
//             onClose: onAction2,
//         } );
//         setStock(prev => (prev > 0 ? prev - quantity : 0)); // Update stock
//     } catch (error) {
//         console.log("Error adding to cart:", error);
//     }
//   };
 

const handleAddToCart = () => {
  setCart((prevCart) => {
    // Find if item already exists in cart
    const existingIndex = prevCart.findIndex(item => item[5] === props[5]);

    if (existingIndex !== -1) {
      // Item exists: create new cart array with updated quantity
      const updatedCart = [...prevCart];
      // updatedCart[existingIndex] is the existing item array

      // If no quantity yet, initialize it to 0
      const currentQuantity = updatedCart[existingIndex][7] || 0;
      updatedCart[existingIndex] = [
        ...updatedCart[existingIndex].slice(0, 7),
        currentQuantity + pickedQuant // new quantity
      ];

      toast.success("Successfully added to cart",{
            autoClose: 2000,
            onClose: onAction2,
        } );
      
      console.log("🛒 Updated existing item quantity:", updatedCart[existingIndex][6]);
      setQuant(prev => (prev > 0 ? prev - pickedQuant : 0)); // Update local stock
      setProdQuantity (prev => (prev > 0 ? prev - pickedQuant : 0)); 
      setStock(prev => (prev > 0 ? prev - quantity : 0)); // Update global stock

      return updatedCart;

    } else {
      // Item doesn't exist: add new item with quantity as the 7th element
      const newItem = [...props, pickedQuant];  // props + quantity
      console.log("✅ Added new item to cart:", newItem);
      setQuant(prev => (prev > 0 ? prev - pickedQuant : 0)); // Update local stock
      setProdQuantity (prev => (prev > 0 ? prev - pickedQuant : 0)); 
      setStock(prev => (prev > 0 ? prev - quantity : 0)); // Update global stock
      return [...prevCart, newItem];
    }
    

  });


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
              image="https://cdn.britannica.com/89/140889-050-EC3F00BF/Ripening-heads-rice-Oryza-sativa.jpg"
              sx={{ width: '100%', height: '100%' }}
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
                  image="https://cdn.britannica.com/89/140889-050-EC3F00BF/Ripening-heads-rice-Oryza-sativa.jpg"
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
                <Stepper value={pickedQuant} onChange={setPickedQuant} width="20%" height="40%" />
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

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastClassName="custom-toast"
          bodyClassName="custom-toast-body"
        
          closeButton={({ closeToast }) => (
            <button
              onClick={closeToast}
              className="custom-toast-close"
            >
              ×
            </button>
          )}
        />
      </Box>
    </Modal>
  );
};

export default ActionModal;
