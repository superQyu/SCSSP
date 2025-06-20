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

import UpdateLog from '@/pages/SynchronizeData';

/*======================手机端路由========================*/
import Phone from '@/pages/phone';
import PhoneHome from '@/pages/phone/home';
import MaterialEnter from '@/pages/phone/materialEnter/index';
import MaterialEnterDetail from '@/pages/phone/materialEnter/detail/index';
import CreateMaterial from '@/pages/phone/materialEnter/create/index';

import MaterialExit from '@/pages/phone/materialExit/index';
import Center from '@/pages/phone/center/index';

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
  {
    path: '/update-log',
    element: <UpdateLog />,
  },

  {
    path: '/phone',
    element: (
      <div style={{ height: '100vh' }}>
        <Phone />
      </div>
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: '/phone/home', element: <PhoneHome /> },
      {
        path: '/phone/material-enter',
        element: <MaterialEnter />,
      },
      {
        path: '/phone/material-enter-detail',
        element: <MaterialEnterDetail />,
      },
      {
        path: '/phone/material-exit',
        element: <MaterialExit />,
      },
      {
        path: '/phone/material-create',
        element: <CreateMaterial />,
      },
      { path: '/phone/center', element: <Center /> },
    ],
  },
];

export { defaultRoutes };
