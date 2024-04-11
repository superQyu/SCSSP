import './App.scss';

import { cloneDeep } from 'lodash';
import { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { useAppSelector } from 'hooks';
import { defaultRoutes } from './routes';
import { filepathToElement } from './utils/routers';

function App() {
  const {
    user: { menu },
  } = useAppSelector((state) => state) as { user: { menu: any; userInfor: object } };
  const cloneDefaultRoutes = cloneDeep(defaultRoutes);

  cloneDefaultRoutes[0].children = [...filepathToElement(menu), ...cloneDefaultRoutes[0].children];
  const router = createBrowserRouter([...cloneDefaultRoutes]);

  useEffect(() => {}, [menu]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
