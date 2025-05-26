import './App.scss';

import { cloneDeep } from 'lodash';
import { useEffect } from 'react';
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
  // console.log('app中获取保存在store中的菜单', menu);

  const cloneDefaultRoutes = cloneDeep(defaultRoutes);
  const { path } =
    JSON.parse(getToken('BREADCRUMBS') || '{}') || {};
    

  const ROUTETREE = filepathToElement(menu);
  // console.log('处理后的动态路由', ROUTETREE);
  const firstTo = path || GetFirstPath(ROUTETREE);
  console.log('path', path);
  console.log('firstTo', firstTo);


  /** 预处理 / 默认跳转路由  默认为用户路由 列表的第一项 */
  cloneDefaultRoutes[0].children = [
    ...ROUTETREE,
    { path: '/', element: <Navigate to={firstTo} /> },
    // { index: true, element: <Navigate to={firstTo} /> },
    ...cloneDefaultRoutes[0].children,
  ];
  console.log('所有路由', [...cloneDefaultRoutes]);
  const router = createBrowserRouter([...cloneDefaultRoutes]);

  useEffect(() => {}, [menu]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
