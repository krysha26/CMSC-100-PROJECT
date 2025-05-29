// pages/Cart.js
import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Card,
  Badge
} from '@mui/material';
import Navbar from '../components/Navbar';
import { IoMdArrowDropdown } from "react-icons/io";
import { useState, useEffect } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Orders.css';
import CardBox from '../components/CardBox';
import PaymentsIcon from '@mui/icons-material/Payments';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import axios from 'axios';

const Orders = ({ cart, setCart }) => {
  const [order,setOrder] = useState([]); // where fetched orders will be stored
  const [orderCount,setOrderCount] = useState([]); // Order Count
  const [item, setItems] = useState(cart);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]); // full product details
  const shippingFee = 39; // constant 
  const [subTot, setsubTot] = useState(0);

useEffect(() => {
  const fetchItems = async () => {
    try {
      const email = "dummyemail@gmail.com"; // replace with actual logged-in user email
      const response = await axios.get(`http://localhost:5000/api/orders/user/${email}`);
      const fetchedOrders = response.data;

      setOrders(fetchedOrders);
      setOrderCount(fetchedOrders.length);

      // extract all product based on productIDs from orders
      const productIds = fetchedOrders.map(order => order.productId);
      console.log(productIds);
      // fetch product details for each product ID

      // set the products in state
      setProducts(productIds);

    } catch (error) {
      console.error('Failed to fetch orders or products:', error);
    }
  };

  fetchItems();
}, []);




  useEffect(()=> {
    const countItems = () => {
    const ocount = orders.length; // assuming orders is your orders array
    setOrderCount(ocount)
    };
    countItems();
  });
    
  return (
    <div className='cartSection'>
      <Navbar />
      <div className='overallCart'>
        <div className='mainSection'>
          <div className='titleSection titleSectionCart'>
            <div className ='subTitle'>
                <h3> Orders </h3>
                <Badge
                badgeContent={orderCount}
                sx={{
                    '& .MuiBadge-badge': {
                    backgroundColor: '#1D8B37',
                    color: 'white',
                    fontFamily: 'Poppins',
                    borderRadius: '50%',
                    minWidth: 28,
                    height: 28,
                    fontSize: '0.9rem',
                    padding: '0 8px',
                    }
                }}
                >

                </Badge>

            </div>
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
            {orders.map(order => {
                const product = order.productId; // already populated
                if (!product) return null;

                return (
                <CardBox
                    key={order._id} // This is your order's unique ID
                    title={product.productName}
                    description={product.productDescription}
                    imageUrl="https://cdn.pixabay.com/photo/2022/09/05/09/50/tomatoes-7433786_640.jpg"
                    price={product.productPrice}
                    count={order.quantity || 1}
                    cart={cart}
                    setCart={setItems}
                    productId={product._id} // send to cart if needed
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

          </Stack>
        </div>
      </div>
    </div>
  );
};

export default Orders;
