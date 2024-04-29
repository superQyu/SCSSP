import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { type RouterTypes } from './_suppllyTypes';
import { type MenuDataItem } from '@ant-design/pro-layout';
import { TOKEN, getToken, setToken, filterRoutes } from 'utils';

import { Layout } from 'components';
import InitSettings from '@/utils/InitSettings';
import LayoutConfig from '@/config/LayoutConfig';
import { useAppDispatch, useAppSelector } from 'hooks';
import { setMenuTab } from 'store';

interface MenuTabItem {
  label: string;
  path: string;
}

// 左上角logo
import myImage from '@/assets/logo/64-64.png'; // 导入图片
import { Breadcrumb, TabCom } from 'components';

// 验证权限
const Permissions = ({ children }: any) => {
  return getToken(TOKEN) ? <InitSettings>{children}</InitSettings> : <Navigate to="/login" />;
};

const LayoutContext: React.FC = () => {
  const navigator = useNavigate();
  const dispatch = useAppDispatch();
  const {
    common: { menuTab },
  } = useAppSelector((state) => state) as { common: { menuTab: any } };

  const [breadcrumbList, setBreadcrumbList] = useState<MenuTabItem[]>([]);

  const menuClick = (item: MenuDataItem) => {
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
    if (!menuTab.some((el: MenuTabItem) => el.label == item.name)) {
      dispatch(setMenuTab([...menuTab, newMenuTab]));
    }
    item.path && navigator(item.path);
  };

  useEffect(() => {
    if (!getToken('BREADCRUMBS')) return;
    let breadcrumbs = JSON.parse(getToken('BREADCRUMBS')).breadcrumbs;
    breadcrumbs.unshift({
      title: <HomeOutlined />,
    });
    setBreadcrumbList(breadcrumbs);
  }, [getToken('BREADCRUMBS')]);

  useEffect(() => {
    if (!getToken('BREADCRUMBS')) return;
    const initialMenuTab = JSON.parse(getToken('BREADCRUMBS'));
    dispatch(setMenuTab([initialMenuTab]));
  }, []);

  useEffect(() => {}, [menuTab]);

  return (
    <Permissions>
      <Layout
        {...{
          ...LayoutConfig(),
          onMenuHeaderClick: (_: React.MouseEvent<HTMLDivElement>) => {
            navigator('/');
          },
          logo: myImage,
          reRenderRoute: (e: RouterTypes) => ({ ...e, routes: filterRoutes(e.routes || []) }),
          menuItemRender: (item: MenuDataItem, dom: React.ReactNode) => (
            <div onClick={() => menuClick(item)}>{dom}</div>
          ),
          contentStyle: {
            padding: '0',
          },
          slot: (): React.ReactElement => {
            return (
              <>
                <div style={{ padding: '7px 15px' }}>
                  <Breadcrumb routes={breadcrumbList} />
                </div>
                <TabCom />
              </>
            );
          },
        }}
      />
    </Permissions>
  );
};

export default LayoutContext;
