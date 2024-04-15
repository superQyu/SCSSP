import React, { createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext, useAppDispatch } from 'hooks';
import { setMenu } from 'store';
import { TOKEN, buildTree } from 'utils';
import { IconShow } from 'ui';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

interface PermissionsContextType {
  // eslint-disable-next-line no-unused-vars
}

const PermissionsContext = createContext<PermissionsContextType | undefined>(undefined);

export const usePermissions = () => {
  const context = useContext(PermissionsContext);
  if (!context) {
    throw new Error('usePermissions must be used within a PermissionsProvider');
  }
  return context;
};

export const PermissionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { server, config } = useBasicConfiguration();
  const { signOut } = useContext(AuthContext);
  //   const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { saveUserInfor, saveSiteInfor } = useContext(AuthContext);
  const location = window.location;

  const { prefix, fieldConversion = {} } = config || {}; // 基本设置
  const { user: U, basic } = server;

  const getAvatar = (a: any) => {
    return `${prefix.static}${a}`;
  };
  // 获取用户信息
  const getUserInfor = async (callback: Function) => {
    await U.userInfor()
      .then((res: any) => {
        const { user: uKey = 'user' } = fieldConversion;
        res[uKey]['avatar'] = getAvatar(res[uKey]['avatar']);
        saveUserInfor(dispatch, res[uKey]);
        callback && callback();
      })
      .catch(async () => {
        await signOut(dispatch);
        // navigate('/');
        // window.open('/login', '_self')
      });
  };
  // 获取站点详情
  const getSiteInfor = async () => {
    await basic.siteInfor({ ...location }).then((res: any) => {
      const { ico: uKey = 'ico' } = fieldConversion;
      res[uKey] = getAvatar(res[uKey]);
      saveSiteInfor(dispatch, res);
    });
  };
  // 获取路由列表
  const getRoutes = async () => {
    await U.getRoute({ siteKey: TOKEN.replace(/^Qy_/, '') }).then((res: any) => {
      const menus = buildTree(res, {
        intercept: (item: { [key: string]: string }) => {
          return {
            ...item,
            icon: <IconShow ico={item.ico} />,
            component: item.filepath,
          };
        },
      });
      dispatch(setMenu([...menus]));
    });
  };

  useEffect(() => {
    getUserInfor(() => {
      getSiteInfor();
      getRoutes();
      console.info('%c✔  初始化用户信息 ==============', 'color: green; font-size: 14px;');
    });
  }, []);

  return <PermissionsContext.Provider value={{}}>{children}</PermissionsContext.Provider>;
};
