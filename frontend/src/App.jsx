import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Shop from "./pages/Shop";
import SignUp from "./pages/SignUp";

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
  ];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}

export default App;
