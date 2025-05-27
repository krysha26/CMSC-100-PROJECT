import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Shop from "./pages/Shop";
import SignUp from "./pages/SignUp";
import AccountManagement from "./pages/Adminpage_files/AccountManagement";

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
      element: <AccountManagement />
    }
  ];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}

export default App;
