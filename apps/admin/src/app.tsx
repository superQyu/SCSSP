import './App.scss';

import { cloneDeep } from 'lodash';
import { useEffect } from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';

import { GetFirstPath, getToken } from 'utils';

import { useAppSelector } from 'hooks';
import { defaultRoutes } from './routes';
import { filepathToElement } from './utils/routers';

function App() {
  const {
    user: { menu },
  } = useAppSelector((state) => state) as { user: { menu: any; userInfor: object } };

  const cloneDefaultRoutes = cloneDeep(defaultRoutes);
  // const { path } = JSON.parse(getToken('BREADCRUMBS')) || {};
  const { path } = {};

  const ROUTETREE = filepathToElement(menu);
  const firstTo = path || GetFirstPath(ROUTETREE);

  /** 预处理 / 默认跳转路由  默认为用户路由 列表的第一项 */
  cloneDefaultRoutes[0].children = [
    ...ROUTETREE,
    { path: '/', element: <Navigate to={firstTo} /> },
    ...cloneDefaultRoutes[0].children,
  ];
  const router = createBrowserRouter([...cloneDefaultRoutes]);

  useEffect(() => {}, [menu]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
