import { createBrowserRouter } from "react-router-dom";
import Root from "../Outlet/Root";
import Home from "../Pages/Home";
import SignIn from "../Pages/Singin";
import SingUp from '../Pages/SingUp';
import PriveteRouter from "./PriveteRouter";
import AddTransaction from "../Pages/AddTransaction";
import MyTransctions from "../Pages/MyTransctions";
import Reports from "../Pages/Reports";
import TransactionDetails from "../Pages/TransactionDetails";
import UpdateTransaction from "../Pages/UpdateTransacrion";
import MyProfile from "../Pages/MyProfile";
 
export  const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: 'signin',
        element: <SignIn />,
      },
      {
        path: 'signup',
        element: <SingUp />,
      },
      {
        element: <PriveteRouter />,
        children: [
          {
            path: 'add-transaction',
            element: <AddTransaction />,
          },
          {
            path: 'my-transactions',
            element: <MyTransctions />,
          },
          {
            path: 'reports',
            element: <Reports />,
          },
          {
            path: 'transaction-details/:id',
            element: <TransactionDetails />,
          },
          {
           path: 'update-transaction/:id',
            element: <UpdateTransaction />,
          }, {
            path: 'myprofile',
            element:<MyProfile/>          }
        ],
      },
    ],
  },
]);