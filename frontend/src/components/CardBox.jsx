import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  Stack,
} from '@mui/material';
import Stepper from './Stepper';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-hot-toast';

const CardBox = ({ title, description, imageUrl, price, productId, count, cart, setCart }) => {
  const handleDelete = () => {
    setCart((prevCart) => prevCart.filter(item => item[5] !== productId));
    toast.success('Item removed from cart 🗑️');
  };

  const handleQuantityChange = (newQuantity) => {
    // Find the current item in cart
    const currentItem = cart.find(item => item[5] === productId);
    if (!currentItem) return;

    // Get the original stock from the item
    const originalStock = currentItem[2];
    const currentCartQuantity = parseInt(currentItem[7]) || 0;
    const quantityDifference = newQuantity - currentCartQuantity;

    // Check if we have enough stock
    if (newQuantity > originalStock) {
      toast.error('Not enough stock available');
      return;
    }

    // Update cart with new quantity
    setCart((prevCart) =>
      prevCart.map(item => {
        if (item[5] === productId) {
          return [
            item[0], // price
            item[1], // name
            item[2], // stock
            item[3], // category
            item[4], // description
            item[5], // productId
            item[6], // photo
            newQuantity // new quantity
          ];
        }
        return item;
      })
    );
  };

  return (
    <Card sx={{ display: 'flex', width: '100%', mb: 2 }}>
      {imageUrl && (
        <CardMedia
          component="img"
          sx={{ width: 150 }}
          image={imageUrl}
          alt={title}
        />
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%' }}>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              alignItems: 'stretch',
              height: '100%'
            }}
          >
            {/* Info col 1 */}
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                color: 'white'
              }}
            >
              <Box>
                <Typography color="#1A1A1A" fontFamily="PoppinsR" fontSize={15} variant="h6">
                  {title}
                </Typography>
                <Typography
                  fontFamily="PoppinsR"
                  fontSize={12}
                  variant="body2"
                  color="text.secondary"
                >
                  {description}
                </Typography>
              </Box>
              <Stepper 
                value={parseInt(count) || 1} 
                onChange={handleQuantityChange} 
                width="8%" 
                height="30%" 
                maxValue={cart.find(item => item[5] === productId)?.[2] || 1}
              />
            </Box>

            {/* Info col 2 */}
            <Stack
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
              sx={{
                color: 'white',
                width: 'auto'
              }}
            >
              <Typography fontFamily="Poppins" sx={{ fontSize: '16', color: 'text.primary' }}>
                P{price}
              </Typography>
              <IconButton
                disableRipple
                sx={{
                  width: 'auto',
                  height: 'auto',
                  backgroundColor: 'transparent',
                  p: 0,
                  '&:hover': { backgroundColor: 'transparent' },
                  '&:focus': { outline: 'none' },
                  '&:focus-visible': { outline: 'none' }
                }}
                onClick={handleDelete}
              >
                <DeleteIcon sx={{ color: '#F34F30' }} />
              </IconButton>
            </Stack>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default CardBox;
