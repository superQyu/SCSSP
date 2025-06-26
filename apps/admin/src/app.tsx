import './App.scss';

import { cloneDeep } from 'lodash';
import { useEffect, useState } from 'react';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import { GetFirstPath, getToken } from 'utils';

import { useAppSelector } from 'hooks';
import { defaultRoutes } from './routes';
import { filepathToElement } from './utils/routers';

function App() {
  // const {
  //   user: { menu },
  // } = useAppSelector((state) => state) as {
  //   user: { menu: any; userInfor: object };
  // };
  const { user } = useAppSelector((state) => state) as {
    user: { menu: any; userInfor: object };
  };
  // console.log('app中获取保存在store中的user', user);
  const { menu } = user;
  const [isMobile, setIsMobile] = useState(false);

  const cloneDefaultRoutes = cloneDeep(defaultRoutes);
  const { path } =
    JSON.parse(getToken('BREADCRUMBS') || '{}') || {};

  const ROUTETREE = filepathToElement(menu);

  const firstTo = isMobile ? '/phone/home': (path || GetFirstPath(ROUTETREE));

  cloneDefaultRoutes[0].children = [
    ...ROUTETREE,
    { path: '/', element: <Navigate to={firstTo} /> },
    ...cloneDefaultRoutes[0].children,
  ];

  const router = createBrowserRouter([...cloneDefaultRoutes]);
  useEffect(() => {}, [menu]);

  useEffect(() => {
    const checkIsMobile = () => {
      const isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      setIsMobile(isMobileDevice);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
