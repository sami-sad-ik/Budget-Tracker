import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root";
import Home from "../Pages/Home";
import SignUp from "../Pages/Signup";
import Login from "../Pages/Login";
import Income from "../Pages/Income";
import Expense from "../Pages/Expense";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/income",
        element: <Income />,
      },
      {
        path: "/expense",
        element: <Expense />,
      },
    ],
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default Routes;
