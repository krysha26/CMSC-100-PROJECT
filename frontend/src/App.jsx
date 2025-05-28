import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Shop from "./pages/Shop";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

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
   
  ];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}

export default App;
