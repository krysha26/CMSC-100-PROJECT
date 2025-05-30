// pages/Cart.js
import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Card,
} from '@mui/material';
import Navbar from '../components/Navbar';
import { IoMdArrowDropdown } from "react-icons/io";
import { useState, useEffect } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Cart.css';
import CardBox from '../components/CardBox';
import PaymentsIcon from '@mui/icons-material/Payments';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Button } from '@mui/material';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Cart = ({ cart, setCart }) => {
  const { auth } = useAuth();
  const [item, setItems] = useState(cart);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]); // full product details
  const shippingFee = 39; // constant
  const [subTot, setsubTot] = useState(0);

  const computeSubTot = () => {
    if (!item || item.length === 0) return 0;

    return item.reduce((acc, item) => {
      const price = parseFloat(item[0]) || 0;
      const quantity = parseInt(item[7]) || 1;
      return acc + price * quantity;
    }, 0);
  };

  useEffect(() => {
    console.log("Cart updated:", cart);
    setItems(cart);
  }, [cart]);

  useEffect(() => {
    const computed = computeSubTot();
    setsubTot(computed);
  }, [item]);


  const handleCheckout = async () => {
    if (!auth.accessToken) {
      toast.error('Please sign in to place an order');
      return;
    }

    try {
      for (const prod of item) {
        const productId = prod[5];
        const orderQuantity = prod[7] || 1;

        await axios.post('https://anico-api.vercel.app/api/orders/', {
          productId,
          orderQuantity,
          orderStatus: 0
        }, {
          headers: {
            'Authorization': `Bearer ${auth.accessToken}`
          }
        });
      }

      toast.success("Successfully added to orders!", {
        duration: 2000,
      });

      setCart([]);
      setItems([]);
    } catch (error) {
      console.error('Error creating order:', error);
      if (error.response?.status === 401) {
        toast.error('Please sign in to place an order');
      } else {
        toast.error('Failed to place order');
      }
    }
  };


  return (
    <div className='cartSection'>
      <Navbar />
      <div className='overallCart'>
        <div className='mainSection'>
          <div className='titleSection titleSectionCart'>
            <h3> Cart </h3>
            <div className='productItem'>
              <button className="buttonRd">
                Filter by
                <IoMdArrowDropdown />
              </button>
              <button className="buttonRd">
                Order by
                <IoMdArrowDropdown />
              </button>
              <Typography fontFamily='Poppins' color='#1A1A1A'>
                ORDERS
              </Typography>
            </div>
          </div>

          <hr className='hrCart' />

          <Stack spacing={2} sx={{ mt: 2, alignItems: 'left' }}>
            {item.map(item => {
              console.log("Rendering item:", item);
              return (
                <CardBox
                  key={`${item[5]}-${item[6]}`}
                  title={item[1]}
                  description={item[4]}
                  imageUrl='https://t3.ftcdn.net/jpg/02/57/54/58/360_F_257545862_MK4YSramzD8GICDZEQygA0nUQUaSiLvu.jpg'
                  price={item[0]}
                  count={item[7]}
                  cart={cart}
                  setCart={setItems}
                  productId={item[5]}
                />
              );
            })}
          </Stack>
        </div>

        <div className='sideCart'>
          <Stack
            spacing={3}
            sx={{
              alignItems: 'center',
              px: 3,
              py: 2,
            }}
          >
            <Card sx={{ width: 300, padding: 2 }}>
              <Stack
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2
                }}
              >
                <Typography fontFamily='Poppins' color='#1A1A1A' sx={{ display: 'flex', flexDirection: 'row' }}>
                  <ShoppingCartIcon sx={{ color: '#1D8B37', mr: 1 }} />ORDER SUMMARY
                </Typography>
                <Stack sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  fontSize: 12
                }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
                    <Typography fontFamily='PoppinsR' color='#1A1A1A' width='100%' sx={{ fontSize: '14px' }}>
                      Sub-Total
                    </Typography>
                    <Typography fontFamily='PoppinsR' color='#1A1A1A' sx={{ fontSize: '14px' }}>
                      P{subTot.toFixed(2)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
                    <Typography fontFamily='PoppinsR' color='#1A1A1A' width='100%' sx={{ fontSize: '14px' }}>
                      Shipping
                    </Typography>
                    <Typography fontFamily='PoppinsR' color='#1A1A1A' sx={{ fontSize: '14px' }}>
                      P{shippingFee}
                    </Typography>
                  </Box>
                </Stack>
                <hr style={{ color: '#1a1a1a', width: '100%' }} />
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
                  <Typography fontFamily='Poppins' color='#1A1A1A' width='100%' sx={{ fontSize: '14px' }}>
                    Total
                  </Typography>
                  <Typography fontFamily='PoppinsR' color='#1A1A1A' sx={{ fontSize: '14px' }}>
                    P{(subTot + shippingFee).toFixed(2)}
                  </Typography>
                </Box>
              </Stack>
            </Card>

            <Card sx={{ width: 300, padding: 2 }}>
                <Stack
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2
                }}
              >
                 <Typography fontFamily='Poppins' color='#1A1A1A' sx={{ display: 'flex', flexDirection: 'row' }}>
                  <PaymentsIcon sx={{ color: '#1D8B37', mr: 1 }} /> PAYMENT METHOD
                </Typography>
                  <Typography fontFamily='PoppinsR' color='#1A1A1A' width='100%' sx={{ fontSize: '14px', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center' }}>
                    <CheckBoxIcon sx={{ color: '#1D8B37', mr: 1, fontSize:'16px' }} /> Cash On Delivery
                  </Typography>
              </Stack>
         </Card>
                {/*Add Button Here For Checkout Traverse(items) Add To Cart */}
                <Button
                  onClick={handleCheckout}
                  variant="contained" color="primary" sx={{backgroundColor:'#1D8B37',fontFamily:'Poppins'}}>
                  Checkout
                </Button>

          </Stack>
        </div>
      </div>
    </div>
  );
};

export default Cart;
