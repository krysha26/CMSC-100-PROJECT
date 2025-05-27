import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Shop from "./pages/Shop";
import SignUp from "./pages/SignUp";
import AccountManagement from "./pages/Adminpage_files/AccountManagement";
import Products from "./pages/Adminpage_files/Products"; // <-- Import the new component

function App() {
  const routes = [
    {
      path: "/",
      element: <SignUp />,
    },
    {
      path: "/shop",
      element: <Shop />,
    },
    {
      path: "/account-management",
      element: <AccountManagement />,
    },
    {
      path: "/products",
      element: <Products />  // <-- Add this route
    }
  ];
  
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}

export default App;
