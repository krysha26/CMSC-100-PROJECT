import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    console.log("🛒 Cart updated:", cart);
  }, [cart]);

  const routes = [
    { path: "/", element: <Onboarding /> },
    { path: "/signIn", element: <SignIn /> },
    { path: "/signUp", element: <SignUp /> },
    { path: "/shop", element: <Shop cart={cart} setCart={setCart} /> },
    { path: "/account-management", element: <AccountManagement /> },
    { path: "/products", element: <Products /> },
    { path: "/cart", element: <Cart cart={cart} setCart={setCart} /> },
    { path: "/orders", element: <Orders cart={cart} setCart={setCart} /> },
     {
      path: "/admin",
      element: <AdminLayout />,
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
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
