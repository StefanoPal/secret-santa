import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Login from './routes/Login';
import Root from './components/Root';
import MyList from './routes/MyList';
import Lists from './routes/Lists';
import Logout from './routes/Logout';
import Home from './routes/Home';
import Register from './routes/Register'
import ProtectedRoute from './components/ProtectedRoute';
import WishItemForm from './routes/WishItemForm';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const theme = createTheme();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/mylist",
        element: <ProtectedRoute ProtectedElement={<MyList />}/>,
      },
      {
        path: "/lists",
        element: <Lists />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/newitem",
        element: <ProtectedRoute ProtectedElement={<WishItemForm />} />,
      }
    ]
  },
]);


root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
