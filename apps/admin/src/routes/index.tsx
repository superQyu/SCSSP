import { Navigate, useLocation } from 'react-router-dom';

import Layout from '@/layout';

import ErrorPage from '@/pages/error-page';
// import Login from '@/pages/login';
import Login from '@/pages/login/Login';
import MapDev from '@/pages/example/components/React-BMapGL';

import PersonDetail from '@/pages/systemManagement/siteManagement';

import AttendanceDetail from '@/pages/PersonnelManagement/AttendanceManagement/AttendanceDetail';
import AttendanceRecord from '@/pages/PersonnelManagement/AttendanceManagement/AttendanceRecord';

import FlowFormDesign from '@/pages/workflow/bpm/formDesign';

// 防止路由丢失
const PreventRouteLoss = () => (
  <Navigate to={useLocation().pathname} />
);

const defaultRoutes: any = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/*', element: <PreventRouteLoss /> },
      { path: 'PersonDetail', element: <PersonDetail /> },
      {
        path: 'attendance',
        children: [
          {
            path: 'AttendanceDetail/:teamId',
            element: <AttendanceDetail />,
          },
          {
            path: 'AttendanceRecord/:userId',
            element: <AttendanceRecord />,
          },
        ],
      },
      {
        path: 'flow',
        children: [
          {
            path: 'flow-form-design',
            element: <FlowFormDesign />,
          },
          {
            path: 'process-instance',
            children: [
              {
                path: 'create',
                element: <FlowFormDesign />,
              },
              {
                path: 'detail',
                element: <FlowFormDesign />,
              },
            ],
          },
        ],
      },
    ],
    // children: [],
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
