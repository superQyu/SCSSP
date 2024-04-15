import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CusSkeleton, IconShow } from 'ui';
import { AuthContext, useAppDispatch } from 'hooks';
import { setMenu } from 'store';
import { TOKEN, buildTree } from 'utils';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

export default ({ children }: any) => {
  const { server, config } = useBasicConfiguration();
  const { signOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { saveUserInfor, saveSiteInfor } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(true);
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
        navigate('/');
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
            children: item.routes,
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
      console.info('%c✔  初始化基础信息成功！！！ =======', 'color: green; font-size: 14px;');

      setLoading(false);
    });
  }, []);

  return <>{loading ? <CusSkeleton /> : children}</>;
};
