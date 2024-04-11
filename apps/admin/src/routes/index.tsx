import { Navigate, useLocation } from 'react-router-dom';

import ErrorPage from '@/pages/error-page';
import Login from '@/pages/login';

import Layout from '@/layout';

// 防止路由丢失
const PreventRouteLoss = () => <Navigate to={useLocation().pathname} />;

export const defaultRoutes: any = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Navigate to="dashboard" /> },
      { path: '/*', element: <PreventRouteLoss /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
];
