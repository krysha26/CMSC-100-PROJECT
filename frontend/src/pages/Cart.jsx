// pages/Cart.js
import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import Navbar from '../components/Navbar';
import { IoMdArrowDropdown } from "react-icons/io";
import { useState, useEffect } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Cart.css';
import CardBox from '../components/CardBox';
import { toast } from 'react-toastify';
import axios from 'axios';

const Cart = ({cart,setCart}) => {
  const [item,setItems] = useState(cart);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]); // full product details

  // Inside parent component
    useEffect(() => {
    console.log("Cart updated:", cart);
    setItems(cart)
    }, [cart]);


    // useEffect(() => { USE IN ORDER
    // const fetchItems = async () => {
    //     try {
    //     // 1. Fetch all orders
    //     const ordersResponse = await axios.get('http://localhost:5000/api/orders/');
    //     const ordersData = ordersResponse.data;

    //     // 2. Fetch each corresponding product by productId
    //     const productFetches = ordersData.map(order =>
    //         axios.get(`http://localhost:5000/api/products/${order.productId._id || order.productId}`)
    //     );
    //     const productResponses = await Promise.all(productFetches);
    //     const productDetails = productResponses.map(res => res.data);

    //     //  3. Combine order and product info
    //     const combinedData = ordersData.map((order, index) => ({
    //         ...productDetails[index],
    //         orderId: order._id
    //     }));

    //     // 4. Set the combined data to state
    //     setItems(combinedData);

    //     } catch (error) {
    //     console.error('Failed to fetch items:', error);
    //     }
    // };

    // fetchItems();
    // }, []);


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
            </div> {/* end of product sec */}
            </div> {/* end of title sec */}

            <hr className='hrCart' />

            <Stack spacing={2} sx={{ mt: 2, alignItems: 'left' }}>
                {item.map(item => {
                console.log("Rendering item:", item);
                return (

                    <CardBox
                    key={`${item[5]}-${item[6]}`} // Assign Product id and quantity as key
                    title={item[1]}
                    description={item[4]}
                    imageUrl='https://t3.ftcdn.net/jpg/02/57/54/58/360_F_257545862_MK4YSramzD8GICDZEQygA0nUQUaSiLvu.jpg'
                    price={item[0]}
                    count={item[7]} // Pass quantity
                    cart={cart}
                    setCart={setItems} // To render
                    productId={item[5]} // Pass productId
                    />
                );
                })}

            </Stack>
        </div>
      <div className='sideCart'>
       <Stack
        spacing={3}
        sx={{
            alignItems: 'center', // ⬅️ This centers the fixed-width cards
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
            }}
            >
            <Typography fontFamily='Poppins' color='#1A1A1A' sx={{display: 'flex',  flexDirection:'row'}}>
              <ShoppingCartIcon sx={{ color: '#1D8B37', mr: 1 }} />ORDER SUMMARY
            </Typography>
            </Stack>
        </Card>

        <Card sx={{ width: 300, padding: 2 }}>
            hello
        </Card>
        </Stack>

        </div>


        </div> {/*End of overallcart */}
        
    </div> 
  );
};

export default Cart;
