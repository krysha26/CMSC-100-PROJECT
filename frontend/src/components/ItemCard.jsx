import React from 'react';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ActionModal from './ItemInfo';

const ItemCard = ({ price, name, stock, category, desc, productId, quantity, setStock,cart, setCart }) => {
  const [open,setOpen] = useState(false);
  const [productQuantity,setProdQuantity] = useState(quantity);


  {/* Function Handlers */}
  const handleAdd =() => {
    setOpen(false);
  }

  return (
    <Box
      sx={{
        position: 'relative',
        width: 206,
        m: 2,
        '&:hover .hoverOverlay': {
          opacity: 1,
        },
        '&:hover .hoverButtons': {
          opacity: 1,
        },
      }}
    >
      {/* Hover Buttons (show on hover) */}
      <Box
        className="hoverButtons"
        sx={{
          position: 'absolute',
          top: -12,
          right: -12,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          opacity: 0,
          transition: 'opacity 0.3s ease-in-out',
          zIndex: 10,
        }}
      >
        <IconButton onClick={() => setOpen(true)} size="medium" sx={{ bgcolor: '#1D8B37', boxShadow: 2, '&:hover':{bgcolor:'#1D8B37'} }}>
          <SearchIcon fontSize="medium" sx={{ color: 'white' }} />
        </IconButton>
        <IconButton onClick={() => setOpen(true)}  size="medium" sx={{ bgcolor: '#1D8B37', boxShadow: 2, '&:hover':{bgcolor:'#1D8B37'}  }}>
          <AddIcon fontSize="medium" sx={{ color: 'white' }} />
        </IconButton> 
        {/*Sample Modal Used */} 
        <ActionModal
        open={open}
        onClose={() => setOpen(false)}
        onAction2={handleAdd}
        props={[price,name, stock ,category, desc,productId,quantity]}
        stock={stock} // For total stock orig count
        setStock ={setStock} // To update stock here
        quantity ={quantity} // To update quantity 
        setProdQuantity = {setProdQuantity} // To update product
        cart={cart} // To fetch cart
        setCart={setCart} // To update cart
        />
      </Box>

      <Card
        sx={{
          width: '100%',
          borderRadius: 3,
          boxShadow: 3,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Box sx={{ position: 'relative', height: 200 }}>
         
          {/* Image */}
          <CardMedia
            component="img"
            image="https://cdn.britannica.com/89/140889-050-EC3F00BF/Ripening-heads-rice-Oryza-sativa.jpg"
            sx={{ height: '100%', width: '100%',  }}
          />

           {/* Color Overlay */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.05), rgba(0,0,0,0.5))',
              borderRadius: 'inherit',
            }}
          />

          {/* Hover Overlay */}
          <Box
            className="hoverOverlay"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.7)',
              opacity: 0,
              transition: 'opacity 0.3s ease-in-out',
              zIndex: 5,
            }}
          />

          {/* Price */}
          <Typography
            variant="subtitle1"
            sx={{
              position: 'absolute',
              bottom: 8,
              left: 8,
              color: '#FFFFFF',
              px: 1,
              borderRadius: 1,
              fontFamily: 'PoppinsR',
              zIndex: 6,
            }}
          >
            P{price}
          </Typography>
        </Box>

        <CardContent> {/* Card Details */}
          <Box display="flex" justifyContent="space-between" alignItems="start">
            <Box>
              <Typography fontFamily="PoppinsR" variant="body2" color="#1A1A1A">
                {name}
              </Typography>
              <Typography fontFamily="Poppins" variant="caption" color="#0000004D">
                Stock: {productQuantity}
              </Typography>
            </Box>
            <Chip
              label={category == 2 ? 'Wheat':'Poultry'}
              sx={{ fontFamily: 'PoppinsR', borderRadius: 1 }}
              color="success"
              size="small"
            />
          </Box>
        </CardContent> {/* End of Card Details */}
      </Card>
    </Box>
  );
};

export default ItemCard;
