import React, { useState, useEffect } from 'react';
import AdminHeader from '../AdminHeader';
import axios from 'axios';
import ReportList from './ReportList';
import { format, subDays, subMonths, isWithinInterval, parseISO, startOfDay, endOfDay } from 'date-fns';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-hot-toast';

const SalesReport = () => {
  const { auth } = useAuth();
  const [orders, setOrders] = useState([]);
  const [aggregatedData, setAggregatedData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [isDateFiltered, setIsDateFiltered] = useState(false);
  const [totalSales, setTotalSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRangeDisplay, setDateRangeDisplay] = useState('');

  useEffect(() => {
    if (auth.accessToken) {
      fetchOrders();
    } else {
      setError('Please sign in to view reports');
      setIsLoading(false);
    }
  }, [auth.accessToken]);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('Fetching orders with token:', auth.accessToken);
      
      const res = await axios.get('https://anico-api.vercel.app/api/orders', {
        headers: {
          'Authorization': `Bearer ${auth.accessToken}`
        }
      });
      
      if (Array.isArray(res.data)) {
        setOrders(res.data);
        // Set initial aggregated data
        const completedOrders = res.data.filter(order => order.orderStatus === 1);
        const initialAggregated = aggregateOrdersByProduct(completedOrders);
        setAggregatedData(initialAggregated);
        updateTotals(completedOrders);
      } else {
        setError('Invalid data format received from server');
        console.error('Expected an array of orders but got:', res.data);
        toast.error('Failed to load orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      if (error.response?.status === 401) {
        setError('Please sign in to view reports');
        toast.error('Please sign in to view reports');
      } else if (error.response?.status === 403) {
        setError('You do not have permission to view reports');
        toast.error('Access denied: Admin privileges required');
      } else {
        setError('Failed to fetch orders');
        toast.error('Failed to fetch orders');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getDateRange = (period) => {
    if (!startDate) return null;
    
    // The selected date is the end date
    const endDate = startDate;
    let startRange;

    switch (period) {
      case '7days':
        // Calculate 6 days before the end date
        startRange = subDays(endDate, 6);
        break;
      case '30days':
        // Calculate 29 days before the end date
        startRange = subDays(endDate, 29);
        break;
      case '12months':
        // Calculate 11 months before the end date
        startRange = subMonths(endDate, 11);
        break;
      default:
        return null;
    }

    // Return with startRange first, endDate second for chronological order
    return { startRange, endDate };
  };

  const updateTotals = (orders) => {
    const sales = orders.reduce((sum, order) => 
      sum + ((order.productId?.productPrice || 0) * order.orderQuantity), 0);
    setTotalSales(sales);
    setTotalOrders(orders.length);
  };

  const updateDateRangeDisplay = () => {
    if (!startDate) {
      setDateRangeDisplay('');
      return;
    }

    if (selectedPeriod) {
      const dateRange = getDateRange(selectedPeriod);
      if (dateRange) {
        setDateRangeDisplay(`${format(dateRange.startRange, 'MMM d, yyyy')} - ${format(dateRange.endDate, 'MMM d, yyyy')}`);
      }
    } else {
      // If no period, just show the single date
      setDateRangeDisplay(format(startDate, 'MMM d, yyyy'));
    }
  };

  const handleDateChange = (date) => {
    if (!date) {
      // Clear everything immediately
      setStartDate(null);
      setIsDateFiltered(false);
      setSelectedPeriod(null);
      setDateRangeDisplay('');
      return;
    }

    // Calculate new date first
    const newDate = parseISO(date);
    
    // Update all states and display synchronously
    setStartDate(newDate);
    setIsDateFiltered(true);

    // Calculate and set display based on current period state
    if (selectedPeriod) {
      // If there's a period, calculate the range with the new date
      const tempDateRange = {
        endDate: newDate,
        startRange: selectedPeriod === '7days' ? subDays(newDate, 6) :
                   selectedPeriod === '30days' ? subDays(newDate, 29) :
                   subMonths(newDate, 11)
      };
      setDateRangeDisplay(`${format(tempDateRange.startRange, 'MMM d, yyyy')} - ${format(tempDateRange.endDate, 'MMM d, yyyy')}`);
    } else {
      // If no period, just show the single date
      setDateRangeDisplay(format(newDate, 'MMM d, yyyy'));
    }
  };

  const handlePeriodSelect = (period) => {
    if (!startDate) return;
    
    // Calculate the new period state first
    const newPeriod = period === selectedPeriod ? null : period;
    setSelectedPeriod(newPeriod);
    setIsDateFiltered(true);

    // Immediately calculate and set the display
    if (newPeriod) {
      const dateRange = getDateRange(newPeriod);
      if (dateRange) {
        setDateRangeDisplay(`${format(dateRange.startRange, 'MMM d, yyyy')} - ${format(dateRange.endDate, 'MMM d, yyyy')}`);
      }
    } else {
      // If no period, just show the single date
      setDateRangeDisplay(format(startDate, 'MMM d, yyyy'));
    }
  };

  const clearFilters = () => {
    setSelectedPeriod(null);
    setIsDateFiltered(false);
    setStartDate(null);
    setDateRangeDisplay('');
    const completedOrders = orders.filter(order => order.orderStatus === 1);
    const aggregated = aggregateOrdersByProduct(completedOrders);
    setAggregatedData(aggregated);
    updateTotals(completedOrders);
  };

  const aggregateOrdersByProduct = (filteredOrders) => {
    const productMap = new Map();

    // First, get all unique products from all orders
    orders.forEach(order => {
      if (order.productId && order.productId._id) {
        const productId = order.productId._id;
        if (!productMap.has(productId)) {
          productMap.set(productId, {
            _id: productId, // Add unique _id for React key
            productId: order.productId,
            productName: order.productId.productName || 'N/A',
            productPrice: order.productId.productPrice || 0,
            totalQuantity: 0,
            totalSales: 0,
            dateRange: dateRangeDisplay
          });
        }
      }
    });

    // Then, update quantities and sales for filtered orders
    filteredOrders.forEach(order => {
      if (order.productId && order.productId._id) {
        const productId = order.productId._id;
        const product = productMap.get(productId);
        if (product) {
          product.totalQuantity += (order.orderQuantity || 0);
          product.totalSales += ((order.productId.productPrice || 0) * (order.orderQuantity || 0));
        }
      }
    });

    return Array.from(productMap.values());
  };

  const applyFilters = () => {
    let filtered = orders.filter(order => order.orderStatus === 1);

    if (!isDateFiltered && !selectedPeriod) {
      const aggregated = aggregateOrdersByProduct(filtered);
      setAggregatedData(aggregated);
      updateDateRangeDisplay();
      updateTotals(filtered);
      return;
    }

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
    } else if (isDateFiltered) {
      const dayStart = startOfDay(startDate);
      const dayEnd = endOfDay(startDate);
      filtered = filtered.filter(order => {
        const orderDate = new Date(order.dateOrdered);
        return isWithinInterval(orderDate, { start: dayStart, end: dayEnd });
      });
    }

    const aggregated = aggregateOrdersByProduct(filtered);
    setAggregatedData(aggregated);
    updateDateRangeDisplay();
    updateTotals(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [orders, startDate, selectedPeriod, isDateFiltered]);

  useEffect(() => {
    // Only update if we have a startDate but no display
    if (startDate && !dateRangeDisplay) {
      updateDateRangeDisplay();
    }
  }, [startDate, selectedPeriod, dateRangeDisplay]);

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
                      <div 
                        className="w-full mb-3 relative border border-gray-300 rounded-md cursor-pointer"
                        onClick={() => document.getElementById('dateInput').showPicker()}
                      >
                        <input
                          id="dateInput"
                          type="date"
                          value={startDate ? format(startDate, 'yyyy-MM-dd') : ''}
                          onChange={(e) => handleDateChange(e.target.value)}
                          className={`block w-full px-3 py-2 text-sm bg-transparent cursor-pointer focus:outline-none [&::-webkit-datetime-edit]:hidden [&::-webkit-datetime-edit-fields-wrapper]:hidden [&::-webkit-datetime-edit-text]:hidden [&::-webkit-datetime-edit-month-field]:hidden [&::-webkit-datetime-edit-day-field]:hidden [&::-webkit-datetime-edit-year-field]:hidden [&::-webkit-inner-spin-button]:hidden [&::-webkit-calendar-picker-indicator]:opacity-100 ${
                            !startDate ? 'text-transparent' : 'text-gray-900'
                          }`}
                          style={{
                            colorScheme: 'light',
                            '--webkit-calendar-picker-indicator-color': '#6B7280'
                          }}
                        />
                        {!startDate ? (
                          <span 
                            className="absolute left-9.5 top-1/2 -translate-y-1/2 text-sm text-gray-500 pointer-events-none select-none"
                          >
                            Select date
                          </span>
                        ) : (
                          <span 
                            className="absolute left-9.5 top-1/2 -translate-y-1/2 text-sm text-gray-900 pointer-events-none select-none"
                          >
                            {format(startDate, 'MMM d, yyyy')}
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
              <ReportList data={aggregatedData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReport; 