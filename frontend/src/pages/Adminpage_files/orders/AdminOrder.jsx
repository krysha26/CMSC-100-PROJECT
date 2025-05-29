import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminHeader from '../AdminHeader';
import OrderList from './OrderList';

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await axios.get('http://localhost:5000/api/orders');
      if (Array.isArray(res.data)) {
        setOrders(res.data);
      } else {
        setError('Invalid data format received from server');
        console.error('Expected an array of orders but got:', res.data);
      }
    } catch (err) {
      setError('Failed to fetch orders');
      console.error('Error fetching orders:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const res = await axios.put(`https://anico-api.vercel.app/api/orders/${orderId}`, {
        orderStatus: newStatus
      });
      
      // Update local state with the response
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order._id === orderId ? res.data : order
        )
      );
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  return (
    <div className="admin-order-page min-h-screen">
      <AdminHeader name="Order Management" />
      <div className="content-area p-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6 h-[calc(100vh-180px)]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium text-[#333]">
              Order List
            </h2>
            {!isLoading && !error && (
              <div className="flex space-x-2">
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Pending: {orders.filter(o => o.orderStatus === 0).length}
                </span>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Completed: {orders.filter(o => o.orderStatus === 1).length}
                </span>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Canceled: {orders.filter(o => o.orderStatus === 2).length}
                </span>
              </div>
            )}
          </div>
          <div className="h-[calc(100%-60px)]">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Loading orders...</p>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-red-500">{error}</p>
              </div>
            ) : (
              <OrderList 
                orders={orders}
                onUpdateStatus={handleUpdateStatus}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrder; 