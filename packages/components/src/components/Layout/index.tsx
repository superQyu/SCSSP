import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Switch,
  Tooltip,
  Space,
  Popover,
  Image,
  Skeleton,
} from 'antd';
import { QuestionCircleFilled } from '@ant-design/icons';
import {
  ProConfigProvider,
  ProLayout,
  SettingDrawer,
  WaterMark,
  type ProSettings,
  type MenuDataItem,
} from '@ant-design/pro-components';
import {
  useLocation,
  useNavigate,
  Link,
  Outlet,
} from 'react-router-dom';

import ErrorBoundary from 'antd/es/alert/ErrorBoundary';
import {
  useAppDispatch,
  useAppSelector,
  KeepAlive,
  useLocationListen,
} from 'hooks';
import { MenuItem, sortMenu, getToken } from 'utils';

// 组件列表
import SearchInput from './components/SearchInput';
import MenuCard from './components/MenuCard';
import Profile from './components/profile';

import { CommonObject } from './layout';

const areaId: string = 'Qy-pro-layout';
const CustomProLayout = styled(ProLayout)(() => ({
  height: '100vh',
  '.Qy-pro-layout-prefix-sider-logo>a': {
    'white-space': 'nowrap',
  },
  '.Qy-pro-layout-prefix-layout-container': { height: '100vh' },
  '.ant-layout': { height: '100vh' },
}));

const layout: React.FC<CommonObject> = (props: any) => {
  if (typeof document === 'undefined') return <div />;

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user, site } = useAppSelector((state) => state);
  // 控制当前的 activeMenu
  const [pathname, setPathname] = useState(location.pathname);
  const [isDark, setDark] = useState<boolean>(false);
  const [settings, setSetting] = useState<
    Partial<ProSettings> | undefined
  >({
    navTheme: 'light',
    colorPrimary: '#1677FF',
    contentWidth: 'Fluid',
    layout: 'side',
    fixSiderbar: true,
    splitMenus: false,
  });

  const [num, setNum] = useState(40);
  const [keyWord, setKeyWord] = useState('');
  const [shouldRender, setShouldRender] =
    useState<boolean>(false);

  const [loading, setLoading] = useState(true);
  const { userInfor = {}, menu = [] } = user as CommonObject; // 获取用户基本信息
  const { siteInfor = {} } = site as CommonObject; // 获取站点基本信息
  const [baseInfor, setBaseInfor] = useState<object>({
    avatar: '',
    userName: null,
    logo: '',
    siteName: '',
  });
  const [menus, setMenus] = useState<{
    path: string;
    routes: MenuItem[];
  }>({
    path: '/',
    routes: [],
  });

  // css
  const SkeletonAvatarStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const SkeletonInputStyle = { verticalAlign: 'middle' };

  // 监听路由的变化
  useLocationListen(({ pathname }) => {
    // console.log('当前路由', pathname)
    setPathname(pathname);
    if (!getToken('BREADCRUMBS')) return;
    else {
      let activeMenu = JSON.parse(
        getToken('BREADCRUMBS')
      ).activeMenu;
      activeMenu && setPathname(activeMenu);
    }
  });

  const filterByMenuData = (
    data: MenuDataItem[],
    keyWord: string
  ): MenuDataItem[] =>
    data
      .map((item) => {
        if (item.name?.includes(keyWord)) {
          return { ...item };
        }
        const children = filterByMenuData(
          item.children || [],
          keyWord
        );
        if (children.length > 0) {
          return { ...item, children };
        }
        return undefined;
      })
      .filter((item) => item) as MenuDataItem[];

  const loopMenuItem = (menus: any[]): MenuDataItem[] =>
    menus.map(({ icon, routes, ...item }) => ({
      ...item,
      children: routes && loopMenuItem(routes),
    }));
  // 左下角 主题切换按钮
  const handlerThemeSwitching = (v: boolean) => {
    const updatedSettings = { ...settings };
    updatedSettings.navTheme = v ? 'realDark' : 'light';
    setDark(v);
    setSetting(updatedSettings);
  };
  // SettingDrawer 控制按钮
  const handlerSetting = (v: any) => {
    setDark(v && v.navTheme !== 'light');
    setSetting(v);
  };

  const filteredObject = (
    a: CommonObject,
    b: CommonObject
  ): CommonObject => {
    return Object.keys(b).reduce((obj, key) => {
      if (a.hasOwnProperty(key)) {
        obj[key] = b[key];
      }
      return obj;
    }, {} as CommonObject);
  };

  // 只有动态路由发生变化时，才会触发该方法
  useEffect(() => {
    if (menu.length != 0) {
      // console.log('传递给Layout组件的menus', {
      //   ...menus,
      //   routes: sortMenu([...menu]),
      // });
      setMenus({ ...menus, routes: sortMenu([...menu]) });
    } else {
      // setMenus({ ...menus, routes: sortMenu([...[...route.routes, ...menu]]) });
    }
    // 默认跳转路由
    // navigate(menus?.routes[0]?.path);
  }, [menu]);

  useEffect(() => {
    setBaseInfor({
      avatar: userInfor.avatar,
      userName: userInfor.nickName,
      logo: siteInfor.ico,
      siteName: siteInfor.name,
    });
    if (siteInfor.ico && siteInfor.ico != '')
      setShouldRender(true);
    setLoading(false);
  }, [user, site]);
  useEffect(() => {
    const newSettings = filteredObject(
      settings as CommonObject,
      props
    );
    setSetting({ ...settings, ...newSettings });
  }, [props]);
  return (
    <WaterMark content={props.waterMarkProps || ''}>
      <ProConfigProvider>
        <div
          id={areaId}
          style={{ height: '100vh', overflow: 'hidden' }}
        >
          <CustomProLayout
            title="管理平台"
            prefixCls={`${areaId}-prefix`}
            contentStyle={{ height: 'calc(100vh - 5px)' }}
            route={
              props.reRenderRoute
                ? props.reRenderRoute(menus)
                : menus
            }
            location={{
              pathname,
            }}
            token={{
              header: {
                colorBgMenuItemSelected: 'rgba(0,0,0,0.08)',
              },
            }}
            menu={{}}
            postMenuData={(menus) =>
              filterByMenuData(menus || [], keyWord)
            }
            avatarProps={{
              size: 'small',
              src: loading ? (
                <Skeleton.Avatar
                  active
                  style={SkeletonInputStyle}
                />
              ) : (
                (baseInfor as unknown as { avatar: '' })?.avatar
              ),
              title: loading ? (
                <Skeleton.Input
                  active
                  size={'small'}
                  style={{
                    ...SkeletonInputStyle,
                    marginTop: '-3px',
                  }}
                />
              ) : (
                <Popover
                  rootClassName="profile-popover"
                  placement="bottomRight"
                  trigger="click"
                  content={
                    <Profile
                      user={user}
                      tokenKeys={props.TokenKeys}
                    />
                  }
                >
                  <div>
                    {}
                    {
                      (
                        baseInfor as unknown as {
                          userName: '欢迎！';
                        }
                      )?.userName
                    }
                  </div>
                </Popover>
              ),
              // render: (props, dom) => {
              //   return (
              //     <Popover
              //       rootClassName="profile-popover"
              //       placement="bottomRight"
              //       trigger="click"
              //       content={<Profile user={user} />}
              //     >
              //       {dom}
              //     </Popover>
              //   );
              // },
            }}
            actionsRender={(props) => {
              if (props.isMobile) return [];
              if (typeof window === 'undefined') return [];
              return [
                props.layout !== 'side' &&
                document.body.clientWidth > 1400 ? (
                  <SearchInput />
                ) : undefined,
                <Tooltip placement="bottom" title={'主题切换'}>
                  <Switch
                    checkedChildren="🌜"
                    unCheckedChildren="🌞"
                    checked={isDark}
                    onChange={(v) => handlerThemeSwitching(v)}
                  />
                </Tooltip>,
                <QuestionCircleFilled key="QuestionCircleFilled" />,
              ];
            }}
            headerTitleRender={(logo, title, _) => {
              const defaultDom = (
                <a href="/">
                  {!shouldRender ? (
                    <Skeleton.Avatar
                      active
                      style={SkeletonAvatarStyle}
                    />
                  ) : (
                    <img
                      src={(baseInfor as { logo: '' })?.logo}
                      title={
                        (baseInfor as { siteName: '' })?.siteName
                      }
                    />
                  )}
                </a>
              );
              if (typeof window === 'undefined')
                return defaultDom;
              if (document.body.clientWidth < 1400)
                return defaultDom;
              if (_.isMobile) return defaultDom;
              return (
                <>
                  {defaultDom}
                  <MenuCard />
                </>
              );
            }}
            menuFooterRender={(props) => {
              if (props?.collapsed || props?.isMobile)
                return undefined;
              return (
                <div>
                  <div key={1} style={{ height: '135px' }}>
                    <Image
                      width={'100%'}
                      preview={false}
                      height={132}
                      src="/static/siteimage/zos.png"
                    />
                    <Space
                      align="center"
                      size="middle"
                      style={{
                        width: '100%',
                        marginBlockStart: '32px',
                      }}
                    />
                  </div>
                  <div
                    style={{
                      textAlign: 'center',
                      paddingBlockStart: 12,
                    }}
                  >
                    <div>© 2023 Made with love</div>
                    <div>by Designer Q_Y</div>
                  </div>
                </div>
              );
            }}
            menuItemRender={(item, dom) => (
              <Link to={item.path ?? '/'}>{dom}</Link>
            )}
            {...props}
            {...settings}
          >
            {props.slot()}
            {props.settingDrawerShow && (
              <SettingDrawer
                pathname={pathname}
                enableDarkTheme
                getContainer={(e: any) => {
                  if (typeof window === 'undefined') return e;
                  return document.getElementById(areaId);
                }}
                settings={settings}
                onSettingChange={(v) => handlerSetting(v)}
                disableUrlParams={false}
              />
            )}
            {/* <Outlet /> */}
            <ErrorBoundary>
              {<KeepAlive include={[]} keys={[]} />}
            </ErrorBoundary>
          </CustomProLayout>
        </div>
      </ProConfigProvider>
    </WaterMark>
  );
};
export default layout;
