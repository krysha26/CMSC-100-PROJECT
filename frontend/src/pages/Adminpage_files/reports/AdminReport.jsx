import React, { useState, useEffect } from 'react';
import AdminHeader from '../AdminHeader';
import axios from 'axios';
import ReportList from './ReportList';

const SalesReport = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filterPeriod, setFilterPeriod] = useState('monthly');
  const [totalSales, setTotalSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await axios.get('https://anico-api.vercel.app/api/orders');
      if (Array.isArray(res.data)) {
        setOrders(res.data);
      } else {
        setError('Invalid data format received from server');
        console.error('Expected an array of orders but got:', res.data);
      }
    } catch (error) {
      setError('Failed to fetch orders');
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    const now = new Date();
    let startDate;

    switch (filterPeriod) {
      case 'weekly':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        break;
      case 'monthly':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'annual':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(0);
    }

    const endDate = now;

    const filteredOrders = orders.filter(order => {
      const isCompleted = order.orderStatus === 1;
      const orderDate = new Date(order.dateOrdered);
      const isInDateRange = orderDate >= startDate && orderDate <= endDate;
      return isCompleted && isInDateRange;
    });

    setFilteredOrders(filteredOrders);

    // Calculate totals
    const sales = filteredOrders.reduce((sum, order) => 
      sum + ((order.productId?.productPrice || 0) * order.orderQuantity), 0);
    setTotalSales(sales);
    setTotalOrders(filteredOrders.length);

  }, [orders, filterPeriod]);

  return (
    <div className="sales-report-page min-h-screen">
      <AdminHeader name="Sales Report" />
      <div className="content-area p-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6 h-[calc(100vh-180px)] flex flex-col">
          {/* Stats cards section */}
          {!isLoading && !error && (
            <div className="flex-none mb-6">
              <div className="flex space-x-6 w-full">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex-1">
                  <h3 className="text-sm font-medium text-gray-500">Total Sales</h3>
                  <p className="text-2xl font-semibold text-gray-900">P{totalSales.toFixed(2)}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex-1">
                  <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
                  <p className="text-2xl font-semibold text-gray-900">{totalOrders}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex-1">
                  <h3 className="text-sm font-medium text-gray-500">Filter Period</h3>
                  <select 
                    value={filterPeriod} 
                    onChange={(e) => setFilterPeriod(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="annual">Annual</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          
          {/* List section */}
          <div className="flex-1 min-h-0">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Loading orders...</p>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-red-500">{error}</p>
              </div>
            ) : (
              <ReportList orders={filteredOrders} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReport; 