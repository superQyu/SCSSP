import './App.scss';

import { cloneDeep } from 'lodash';
import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';

import {
  AuthContext,
  signIn,
  mockSignIn,
  signOut,
  saveUserInfor,
  saveSiteInfor,
  useAppSelector,
  useLocationListen,
} from 'hooks';
import { Settings } from 'utils';
import { defaultRoutes } from './routes';
import { filepathToElement } from './utils/routers';

function App() {
  const {
    user: { menu },
  } = useAppSelector((state) => state) as { user: { menu: any; userInfor: object } };
  const cloneDefaultRoutes = cloneDeep(defaultRoutes);

  console.log(filepathToElement(menu));

  cloneDefaultRoutes[0].children = [...filepathToElement(menu), ...cloneDefaultRoutes[0].children];

  useLocationListen((r) => {
    document.title = `${Settings.title}: ${Settings.describe || r.pathname.replace('/', '')}`;
  });
  const element = useRoutes(cloneDefaultRoutes);
  useEffect(() => {}, [menu]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        mockSignIn,
        signOut,
        saveUserInfor,
        saveSiteInfor,
      }}
    >
      {element}
    </AuthContext.Provider>
  );
}

export default App;
