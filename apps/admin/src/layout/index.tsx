import {
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { type RouterTypes } from './_suppllyTypes';
import { type MenuDataItem } from '@ant-design/pro-layout';
import { TOKEN, getToken, setToken, filterRoutes } from 'utils';
import { Select, Spin, Alert, Space } from 'antd';
import Marquee from 'react-fast-marquee';
import styled from 'styled-components';
import { Layout } from 'components';

import InitSettings from '@/utils/InitSettings';
import LayoutConfig from '@/config/LayoutConfig';
import { useAppDispatch, useAppSelector } from 'hooks';
import { setMenuTab } from 'store';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import withWebSocket from '@/context/WithWebSocket';
import MessageBell from './MessageBell.tsx';
import { Outlet } from 'react-router-dom';
const CustomHeader = styled.div`
  padding: 0;
  .title {
    display: flex;
    height: 45px;
    align-items: center;

    .text {
      margin-left: 2px;
      font-weight: bold;
      font-size: 16px;
      color: #ffffff;
    }
  }
`;

interface MenuTabItem {
  label: string;
  path: string;
}

type MenusType = {
  [key: string]: any;
};

// 左上角logo
import myImage from '@/assets/logo/64-64.png'; // 导入图片
import { Breadcrumb, TabCom } from 'components';

// 验证权限
const Permissions = ({ children }: any) => {
  return getToken(TOKEN) ? (
    <InitSettings>{children}</InitSettings>
  ) : (
    <Navigate to="/login" />
  );
};

const LayoutContext: React.FC = () => {
  const navigator = useNavigate();
  const dispatch = useAppDispatch();
  const {
    common: { menuTab },
  } = useAppSelector((state) => state) as {
    common: { menuTab: any };
  };
  const { site } = useAppSelector((state) => state);
  const { noticeCount } = site;
  const { server, config } = useBasicConfiguration();
  const { basic: B, sites } = server;
  const { PROJECTNAME: DP } = config || {};

  const [breadcrumbList, setBreadcrumbList] = useState<
    MenuTabItem[]
  >([]);
  const [projectShow, setProjectShow] = useState<string>('');
  const [projectList, setProjectList] = useState<MenusType[]>(
    []
  );
  const [list, setList] = useState([]);
  const [key, setKey] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  const init = async () => {
    const list = await B.getListByUser();
    setProjectList(list);

    if (!getToken(DP)) {
      const defValue = (list[0]['id'] || '') + '';

      setProjectShow(defValue);
      setToken(DP, defValue);
    } else {
      setProjectShow(getToken(DP));
    }
  };

  const queryNoticeList = async () => {
    const data = await sites.getUnreadList();
    setList(data);
  };

  const menuClick = (item: MenuDataItem) => {
    // console.log('点击的菜单对象', item);
    const locale = item.locale as string;
    const localeArr = locale.slice(5).split('.');
    const breadcrumbs = localeArr.map((pathName: string) => {
      return {
        title: pathName,
      };
    });
    const newMenuTab = {
      label: item.name,
      path: item.itemPath,
      key: item.itemPath,
      breadcrumbs,
    };
    setToken('BREADCRUMBS', JSON.stringify(newMenuTab));
    // if (!menuTab.some((el: MenuTabItem) => el.label == item.name)) {
    if (
      !menuTab.some((el: MenuTabItem) => el.path == item.path)
    ) {
      dispatch(setMenuTab([...menuTab, newMenuTab]));
    }
    item.path && navigator(item.path);
  };

  useEffect(() => {
    if (!getToken('BREADCRUMBS')) return;
    let breadcrumbs = JSON.parse(
      getToken('BREADCRUMBS')
    ).breadcrumbs;
    breadcrumbs?.unshift({
      title: <HomeOutlined />,
    });
    setBreadcrumbList(breadcrumbs);
  }, [getToken('BREADCRUMBS')]);

  useEffect(() => {
    init();

    if (!getToken('BREADCRUMBS')) return;
    const initialMenuTab = JSON.parse(getToken('BREADCRUMBS'));
    dispatch(setMenuTab([initialMenuTab]));
  }, []);

  useEffect(() => {}, [menuTab]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, [key]);

  useEffect(() => {
    queryNoticeList();
  }, [noticeCount]);

  return (
    <Permissions>
      <Spin tip="项目切换中" spinning={loading}>
        <Layout
          key={key}
          {...{
            ...LayoutConfig(),

            menuHeaderRender: (logo) => (
              <CustomHeader>
                <div className="title">
                  {logo}
                  <div className="text">
                    {LayoutConfig().title}
                  </div>
                </div>
              </CustomHeader>
            ),
            onMenuHeaderClick: (
              _: React.MouseEvent<HTMLDivElement>
            ) => {
              navigator('/');
            },
            logo: myImage,
            reRenderRoute: (e: RouterTypes) => {
              const newRoute = {
                ...e,
                routes: filterRoutes(e.routes || []),
              };
              // console.log('传递给ProLayout的route', newRoute);
              return newRoute;
            },
            menuItemRender: (
              item: MenuDataItem,
              dom: React.ReactNode
            ) => (
              <div onClick={() => menuClick(item)}>{dom}</div>
            ),
            contentStyle: {
              padding: '0',
            },
            slot: (): React.ReactElement => {
              return (
                <>
                  <div
                    className="flex flex-justify-between items-center bg-#fff"
                    style={{ padding: '7px 15px' }}
                  >
                    <Breadcrumb routes={breadcrumbList} />
                    {list.length && (
                      <div style={{ maxWidth: '50%' }}>
                        <Alert
                          banner
                          message={
                            <Marquee
                              pauseOnHover
                              gradient={false}
                            >
                              {list.map((item, i) => {
                                return (
                                  <div
                                    className="mr-100px"
                                    key={i}
                                  >
                                    {
                                      item.templateContent.split(
                                        '@'
                                      )[0]
                                    }
                                  </div>
                                );
                              })}
                            </Marquee>
                          }
                        />
                      </div>
                    )}
                    <Space>
                      <MessageBell />

                      <Select
                        variant="borderless"
                        style={{ minWidth: '180px' }}
                        placeholder="切换项目"
                        value={projectShow}
                        onChange={(value) => {
                          setProjectShow(value);
                          setToken(DP, value);
                          setLoading(true);

                          setKey((prevKey) => prevKey + 1);
                        }}
                        options={projectList.map((item) => ({
                          label: `${item.projectName}`,
                          value: `${item.id}`,
                        }))}
                      />
                    </Space>
                  </div>
                  {/* <TabCom /> */}
                </>
              );
            },
            TokenKeys: [DP],
            token: {
              bgLayout: '#f6faff',
              sider: {
                colorMenuItemDivider: '#444D64',
                colorBgCollapsedButton: '#fff',
                colorMenuBackground: '#26324f',
                colorTextMenuSelected: '#4b9cf6',
                colorTextMenuItemHover: '#4b9cf6',
                colorTextMenu: '#fff',
              },
              header: {},
            },
            actionsRender: false,
          }}
        />
      </Spin>
    </Permissions>
  );
};

export default withWebSocket(
  LayoutContext,
  import.meta.env.VITE_WEBSOCKET_PATH
);
