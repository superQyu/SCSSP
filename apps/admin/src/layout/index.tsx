import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { type RouterTypes } from './_suppllyTypes';
import { type MenuDataItem } from '@ant-design/pro-layout';
import { TOKEN, getToken, setToken } from 'utils';
import { Layout } from 'components';
import InitSettings from '@/utils/InitSettings';
import LayoutConfig from '@/config/LayoutConfig';
import { useAppDispatch, useAppSelector } from 'hooks';
import { setMenuTab } from 'store';

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

  // 面包屑
  const [breadcrumbList, setBreadcrumbList] = useState<{ path: string; title: string }[]>([]);

  useEffect(() => {
    // const arr =
    //   getToken('BREADCRUMBS')
    //     ?.split('.')
    //     .map((item: string) => {
    //       return {
    //         title: item,
    //       };
    //     }) || [];
    // arr.unshift({
    //   href: '',
    //   title: <HomeOutlined />,
    // });
    // setBreadcrumbList(arr);
  }, [getToken('BREADCRUMBS')]);

  useEffect(() => {
    console.log('111', 111);
  }, []);

  useEffect(() => {}, [menuTab]);

  return (
    <Permissions>
      <Layout
        {...{
          ...LayoutConfig(),
          onMenuHeaderClick: (_: React.MouseEvent<HTMLDivElement>) => {
            navigator('/login');
          },
          logo: myImage,
          reRenderRoute: (e: RouterTypes) => {
            e.routes = e.routes?.filter((item: Record<string, any>) => item.isHidden != '1');
            return e;
          },
          menuItemRender: (item: MenuDataItem, dom: React.ReactNode) => (
            <div
              onClick={() => {
                console.log('item', item);
                const locale = item.locale as string;
                const localeArr = locale.slice(5).split('.');
                const breadcrumbs = localeArr.map((pathName: string, i) => {
                  return {
                    label: pathName,
                    path: i == localeArr.length - 1 ? item.itemPath : '',
                  };
                });
                setToken('BREADCRUMBS', JSON.stringify(breadcrumbs));
                // if (!menuTab.some((el: any) => el.label == item.name)) {
                //   dispatch(
                //     setMenuTab([
                //       ...menuTab,
                //       {
                //         label: item.name,
                //         key: item.path,
                //       },
                //     ])
                //   );
                // }
                item.path && navigator(item.path);
              }}
            >
              {dom}
            </div>
          ),
          contentStyle: {
            padding: '10px 20px',
          },
          slot: (): React.ReactElement => {
            return (
              <>
                <Breadcrumb routes={breadcrumbList} />
                <TabCom data={menuTab} render={(data) => console.log(data)} />
              </>
            );
          },
        }}
      />
    </Permissions>
  );
};

export default LayoutContext;
