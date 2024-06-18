import { Navigate, useLocation } from 'react-router-dom';

import ErrorPage from '@/pages/error-page';
// import Login from '@/pages/login';
import Login from '@/pages/login/Login';

import MapDev from '@/pages/example/components/React-BMapGL';

import Layout from '@/layout';

import PersonDetail from '@/pages/systemManagement/siteManagement';

// 防止路由丢失
const PreventRouteLoss = () => <Navigate to={useLocation().pathname} />;

const defaultRoutes: any = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/*', element: <PreventRouteLoss /> },
      { path: 'PersonDetail', element: <PersonDetail /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/map',
    element: (
      <div style={{ height: '100vh' }}>
        <MapDev />
      </div>
    ),
  },
];

export { defaultRoutes };
