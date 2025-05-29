import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Shop from "./pages/Shop";
import SignUp from "./pages/SignUp";
import AccountManagement from "./pages/Adminpage_files/AccountManagement";
import SignIn from "./pages/SignIn";
import Products from "./pages/Adminpage_files/Products";
import Cart from "./pages/Cart";
import { useState, useEffect } from "react"; // ✅ include useEffect

function App() {
  const [cart, setCart] = useState([]);

  // ✅ Track cart changes
  useEffect(() => {
    console.log("🛒 Cart updated:", cart);
  }, [cart]);

  const routes = [
    {
      path: "/",
      element: <SignIn />,
    },
    {
      path:"/signUp",
      element: <SignUp />,
    },
    {
      path: "/shop",
      element: <Shop cart={cart} setCart={setCart} />,
    },
    {
      path: "/account-management",
      element: <AccountManagement />,
    },
    {
      path: "/products",
      element: <Products />
    },
    {
      path: "/cart",
      element: <Cart cart={cart} setCart={setCart} />
    },
  ];

  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}

export default App;
