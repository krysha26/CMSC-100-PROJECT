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
import PaymentsIcon from '@mui/icons-material/Payments';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import OrdCardBox from '../components/OrderCard';
import axios from 'axios';

const Orders = ({ cart, setCart }) => {
  const [order,setOrder] = useState([]); // where fetched orders will be stored
  const [orderCount,setOrderCount] = useState([]); // order Count
  const [item, setItems] = useState(cart);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]); // full product details
  const shippingFee = 39; // constant 
  const [subTot, setsubTot] = useState(0);

  // New state for filtering orders by status
  const [filterStatus, setFilterStatus] = useState('all'); // all, completed, cancelled, pending

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
      const ocount = orders.length;
      setOrderCount(ocount);
    };
    countItems();
  });

  // Filter orders based on filterStatus
  const filteredOrders = orders.filter(order => {
    if (filterStatus === 'completed') return order.orderStatus === 1;
    if (filterStatus === 'cancelled') return order.orderStatus === 2;
    if (filterStatus === 'pending') return order.orderStatus === 0;
    return true; // all orders
  });

  // Count orders by status for side cards
  const completedCount = orders.filter(o => o.orderStatus === 1).length;
  const cancelledCount = orders.filter(o => o.orderStatus === 2).length;
  const pendingCount = orders.filter(o => o.orderStatus === 0).length;

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
             

              {/* Filter Buttons */}
              <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
                <button
                  className="buttonRd"
                  onClick={() => setFilterStatus('all')}
                  style={{ backgroundColor: filterStatus === 'all' ? '#1D8B37' : '#e0e0e0', color: filterStatus === 'all' ? 'white' : 'black' }}
                >
                  All
                </button>
                <button
                  className="buttonRd"
                  onClick={() => setFilterStatus('completed')}
                  style={{ backgroundColor: filterStatus === 'completed' ? '#1D8B37' : '#e0e0e0', color: filterStatus === 'completed' ? 'white' : 'black' }}
                >
                  Completed
                </button>
                <button
                  className="buttonRd"
                  onClick={() => setFilterStatus('cancelled')}
                  style={{ backgroundColor: filterStatus === 'cancelled' ? '#F34F30' : '#e0e0e0', color: filterStatus === 'cancelled' ? 'white' : 'black' }}
                >
                  Cancelled
                </button>
                <button
                  className="buttonRd"
                  onClick={() => setFilterStatus('pending')}
                  style={{ backgroundColor: filterStatus === 'pending' ? '#FFB800' : '#e0e0e0', color: filterStatus === 'pending' ? 'white' : 'black' }}
                >
                  Pending
                </button>
              </div>
            </div>
          </div>

          <hr className='hrCart' />

          <Stack spacing={2} sx={{ mt: 2, alignItems: 'left' }}>
            {filteredOrders.map(order => {
                const product = order.productId; // already populated
                if (!product) return null;

                return (
                <OrdCardBox
                    key={order._id} // orders unique id
                    title={product.productName}
                    description={product.productDescription}
                    imageUrl="https://cdn.pixabay.com/photo/2022/09/05/09/50/tomatoes-7433786_640.jpg"
                    price={product.productPrice}
                    count={order.quantity || 1}
                    cart={cart}
                    setCart={setItems}
                    productId={product._id} // send to cart if needed
                    status={order.orderStatus} // send status
                    orderId={order._id} // pass order id for delete
                    setProducts={setOrders} // to change produts
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
            {/* Completed Orders Card */}
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
                  <CheckCircleIcon sx={{ color: '#1D8B37', mr: 1 }} /> COMPLETED ORDERS ({completedCount})
                </Typography>
                <Stack sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent:'space-between',
                  paddingLeft: 20,
                  paddingRight: 20,
                  width: '80%',
                  fontSize: 12
                }}>
                  <CheckBoxIcon sx={{ color: '#1D8B37', mr: 1, fontSize:'16px' }} /> Cash On Delivery
                </Stack>
              </Stack>
            </Card>

            {/* Cancelled Orders Card */}
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
                  <CancelIcon sx={{ color: '#F34F30', mr: 1 }} /> CANCELLED ORDERS ({cancelledCount})
                </Typography>
                  <Stack sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent:'space-between',
                  paddingLeft: 20,
                  paddingRight: 20,
                  width: '80%',
                  fontSize: 12
                }}>
                  <CancelIcon sx={{ color: '#F34F30', mr: 1, fontSize:'16px' }} /> Cash On Delivery
                </Stack>
              </Stack>    
         </Card>

         {/* Pending Orders Card */}
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
                  <PaymentsIcon sx={{ color: '#FFB800', mr: 1 }} /> PENDING ORDERS ({pendingCount})
                </Typography>
                <Stack sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent:'space-between',
                  paddingLeft: 20,
                  paddingRight: 20,
                  width: '80%',
                  fontSize: 12
                }}>
                  <PaymentsIcon sx={{ color: '#FFB800', mr: 1, fontSize:'16px' }} /> Cash On Delivery
                </Stack>
              </Stack>
            </Card>

          </Stack>
        </div>
      </div>
    </div>
  );
};

export default Orders;
