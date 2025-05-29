import React, { useState, useEffect } from 'react';
import AdminHeader from '../AdminHeader';
import axios from 'axios';
import ReportList from './ReportList';
import { format, subDays, subMonths, isWithinInterval, parseISO, startOfDay, endOfDay } from 'date-fns';

const SalesReport = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [isDateFiltered, setIsDateFiltered] = useState(false);
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
        // Set initial filtered orders to all completed orders
        const completedOrders = res.data.filter(order => order.orderStatus === 1);
        setFilteredOrders(completedOrders);
        updateTotals(completedOrders);
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

  const getDateRange = (period) => {
    if (!startDate) return null;
    
    const endDate = startDate;
    let startRange;

    switch (period) {
      case '7days':
        startRange = subDays(endDate, 6);
        break;
      case '30days':
        startRange = subDays(endDate, 29);
        break;
      case '12months':
        startRange = subMonths(endDate, 11);
        break;
      default:
        return null;
    }

    return { startRange, endDate };
  };

  const updateTotals = (orders) => {
    const sales = orders.reduce((sum, order) => 
      sum + ((order.productId?.productPrice || 0) * order.orderQuantity), 0);
    setTotalSales(sales);
    setTotalOrders(orders.length);
  };

  const handleDateChange = (date) => {
    if (!date) {
      setStartDate(null);
      setIsDateFiltered(false);
      return;
    }
    const newDate = parseISO(date);
    setStartDate(newDate);
    setIsDateFiltered(true);
  };

  const handlePeriodSelect = (period) => {
    if (!startDate) return;
    
    if (period === selectedPeriod) {
      setSelectedPeriod(null);
      setIsDateFiltered(true);
    } else {
      setSelectedPeriod(period);
    }
  };

  const clearFilters = () => {
    setSelectedPeriod(null);
    setIsDateFiltered(false);
    setStartDate(null);
    const completedOrders = orders.filter(order => order.orderStatus === 1);
    setFilteredOrders(completedOrders);
    updateTotals(completedOrders);
  };

  const applyFilters = () => {
    let filtered = orders.filter(order => order.orderStatus === 1);

    // If no filters are active, return all completed orders
    if (!isDateFiltered && !selectedPeriod) {
      setFilteredOrders(filtered);
      updateTotals(filtered);
      return;
    }

    // Apply period filter if selected
    if (selectedPeriod) {
      const dateRange = getDateRange(selectedPeriod);
      if (dateRange) {
        filtered = filtered.filter(order => {
          const orderDate = new Date(order.dateOrdered);
          return isWithinInterval(orderDate, {
            start: startOfDay(dateRange.startRange),
            end: endOfDay(dateRange.endDate)
          });
        });
      }
    }
    // Apply specific date filter if active
    else if (isDateFiltered) {
      const dayStart = startOfDay(startDate);
      const dayEnd = endOfDay(startDate);
      filtered = filtered.filter(order => {
        const orderDate = new Date(order.dateOrdered);
        return isWithinInterval(orderDate, { start: dayStart, end: dayEnd });
      });
    }

    setFilteredOrders(filtered);
    updateTotals(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [orders, startDate, selectedPeriod, isDateFiltered]);

  return (
    <div className="sales-report-page min-h-screen">
      <AdminHeader name="Sales Report" />
      <div className="content-area p-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6 h-[calc(100vh-180px)] flex flex-col">
          {/* Stats cards section */}
            {!isLoading && !error && (
            <div className="flex-none mb-6">
              <div className="flex space-x-6 w-full">
                <div className="bg-white p-6 rounded-lg border border-gray-200 flex-1">
                  <h3 className="text-sm font-medium text-gray-500 cursor-pointer">Total Sales</h3>
                  <p className="text-3xl font-semibold text-green-800 cursor-pointer">P{totalSales.toFixed(2)}</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200 flex-1">
                  <h3 className="text-sm font-medium text-gray-500 cursor-pointer">Total Orders</h3>
                  <p className="text-3xl font-semibold text-green-800 cursor-pointer">{totalOrders}</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200 flex-1">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-medium text-gray-500 cursor-pointer">Filter</h3>
                        {(isDateFiltered || selectedPeriod) && (
                          <button
                            onClick={clearFilters}
                            className="text-sm text-red-600 hover:text-red-700 cursor-pointer"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                      <div className="w-full mb-3 relative">
                        <input
                          type="date"
                          value={startDate ? format(startDate, 'yyyy-MM-dd') : ''}
                          onChange={(e) => handleDateChange(e.target.value)}
                          className={`block w-full px-3 py-2 text-sm border border-gray-300 rounded-md cursor-pointer ${
                            !startDate ? 'text-transparent' : 'text-gray-900'
                          }`}
                          style={{
                            colorScheme: 'light',
                            '--webkit-calendar-picker-indicator-color': '#6B7280'
                          }}
                        />
                        {!startDate && (
                          <span 
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 pointer-events-none select-none"
                          >
                            Start date
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700 cursor-pointer">Last</span>
                        <div className="grid grid-cols-3 gap-2 flex-1">
                          <button
                            onClick={() => handlePeriodSelect('7days')}
                            disabled={!startDate}
                            className={`px-0 py-0 text-xs rounded-md transition-colors cursor-pointer ${
                              !startDate 
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : selectedPeriod === '7days'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            7 Days
                          </button>
                          <button
                            onClick={() => handlePeriodSelect('30days')}
                            disabled={!startDate}
                            className={`px-0 py-1 text-xs rounded-md transition-colors cursor-pointer ${
                              !startDate 
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : selectedPeriod === '30days'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            30 Days
                          </button>
                          <button
                            onClick={() => handlePeriodSelect('12months')}
                            disabled={!startDate}
                            className={`px-0 py-0 text-xs rounded-md transition-colors cursor-pointer ${
                              !startDate 
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : selectedPeriod === '12months'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            12 Months
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
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