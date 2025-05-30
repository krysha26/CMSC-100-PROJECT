import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Shop from "./pages/Shop";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AdminLayout from "./pages/Adminpage_files/AdminLayout";
import AccountManagement from "./pages/Adminpage_files/account-management/AccountManagement";
import Products from "./pages/Adminpage_files/products/Products";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import { useState, useEffect } from "react";
import { Toaster } from 'react-hot-toast';
import AdminOrder from "./pages/Adminpage_files/orders/AdminOrder";
import AdminReport from "./pages/Adminpage_files/reports/AdminReport";
import Onboarding from './pages/Onboarding';
import Unauthorized from './pages/Unauthorized';

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    console.log("🛒 Cart updated:", cart);
  }, [cart]);

  const routes = [
    { path: "/", element: <Onboarding /> },
    { path: "/signIn", element: <SignIn /> },
    { path: "/signUp", element: <SignUp /> },
    { path: "/unauthorized", element: <Unauthorized /> },
    { 
      path: "/shop", 
      element: (
        <ProtectedRoute allowedRoles={['customer', 'admin']}>
          <Shop cart={cart} setCart={setCart} />
        </ProtectedRoute>
      ) 
    },
    { 
      path: "/cart", 
      element: (
        <ProtectedRoute allowedRoles={['customer', 'admin']}>
          <Cart cart={cart} setCart={setCart} />
        </ProtectedRoute>
      ) 
    },
    { 
      path: "/orders", 
      element: (
        <ProtectedRoute allowedRoles={['customer', 'admin']}>
          <Orders cart={cart} setCart={setCart} />
        </ProtectedRoute>
      ) 
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "account-management",
          element: <AccountManagement />,
        },
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "orders",
          element: <AdminOrder />,
        },
        {
          path: "reports",
          element: <AdminReport />,
        }
      ]
    }
  ];

  const router = createBrowserRouter(routes);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProvider>
  );
}

export default App;
