import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CusSkeleton, IconShow } from 'ui';
import { AuthContext, useAppDispatch } from 'hooks';
import { setMenu } from 'store';
import { RebuildTree, flattenArray } from 'utils';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

export default ({ children }: any) => {
  const { server, config } = useBasicConfiguration();
  const { signOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { saveUserInfor } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(true);

  const { prefix, PLATFORMID } = config as Record<string, any>; // 基本设置
  const { user: U, basic: B } = server;

  const getAvatar = (a: any) => {
    return `${prefix.static}${a}`;
  };

  // 获取路由列表
  const getRoutes = async () => {
    await U.adminGetRoute()
      .then(({ menus: M, user }: any) => {
        saveUserInfor(dispatch, {
          ...user,
          nickName: user.nickname,
          avatar: getAvatar('/test/loit-small.png'),
        });
        // 根据实际开发的项目的路由表提取路由
        const _M = M.filter((item: any) => item.id === PLATFORMID)[0]?.children || [];
        const menus = RebuildTree(flattenArray(_M), {
          intercept: (item: { [key: string]: string }) => {
            return {
              ...item,
              icon: !item.icon || item.icon == '' ? '' : <IconShow ico={item.icon} />,
              filepath: item.component,
              children: item.routes,
            };
          },
          _rootId: PLATFORMID,
        });
        dispatch(setMenu([...menus]));
      })
      .catch(async () => {
        await signOut(dispatch);
        navigate('/');
      });
  };

  useEffect(() => {
    getRoutes();
    console.info('%c✔  初始化基础信息成功！！！ =======', 'color: green; font-size: 14px;');

    setLoading(false);
  }, []);

  return <>{loading ? <CusSkeleton /> : children}</>;
};
