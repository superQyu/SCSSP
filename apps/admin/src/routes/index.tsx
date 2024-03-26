import { Button, Result } from 'antd';
import { Navigate } from 'react-router-dom';

import { TOKEN, getToken } from 'utils';
import { Layout } from 'components';
import Dashboard from '@/pages/dashboard';
import ErrorPage from '@/pages/error-page';
import Login from '@/pages/login';
import InitSettings from '@/utils/InitSettings';
import LayoutConfig from '@/config/LayoutConfig';
// 左上角logo
import myImage from '@/assets/logo/64-64.png'; // 导入图片

// 验证权限
const Permissions = ({ children }: any) => {
  return getToken(TOKEN) ? <InitSettings>{children}</InitSettings> : <Navigate to="/login" />;
};

export const defaultRoutes: any = [
  {
    path: '/',
    element: <Permissions>{<Layout {...{ ...LayoutConfig(), logo: myImage }} />}</Permissions>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Navigate to="dashboard" />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: '/*',
        element: (
          <ErrorPage>
            <Result
              status="404"
              title="404"
              subTitle="Sorry, the page you visited does not exist."
              extra={
                // <Link to={'/'}></Link>
                <Button type="primary">Back Home</Button>
              }
            />
          </ErrorPage>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
];
