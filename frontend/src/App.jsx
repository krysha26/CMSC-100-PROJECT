import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Shop from "./pages/Shop";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AdminLayout from "./pages/Adminpage_files/AdminLayout";
import AccountManagement from "./pages/Adminpage_files/account-management/AccountManagement";
import Products from "./pages/Adminpage_files/products/Products";
import AdminOrder from "./pages/Adminpage_files/orders/AdminOrder";
import AdminReport from "./pages/Adminpage_files/AdminReport";

function App() {
  const routes = [ // Add child parameter
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
      element: <Shop />,
    },
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
          path: "sales-report",
          element: <AdminReport />,
        }
      ]
    }
  ];
  
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}

export default App;
