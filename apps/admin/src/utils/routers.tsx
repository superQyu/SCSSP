import { OutletLayoutRouter } from 'components';
import { lazy, Suspense } from 'react';
import { Alert, Spin, Empty } from 'antd';
import type { MenuItem } from 'components';
import ErrorPage from '@/pages/error-page';

import { type MenuDataItem } from '@ant-design/pro-layout';

export const modules = import.meta.glob('../pages/**/*.tsx');

const Loading = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50vh', // 视图高度
    }}
  >
    <Spin size="large" />
  </div>
);

function pathToLazyComponent(Ele: string) {
  const path = modules[`../${Ele}`] as any;
  if (!path) {
    return (
      <ErrorPage>
        <Empty
          description={''}
          style={{ marginBottom: '20px' }}
        />
        <Alert
          message={`${
            Ele || '未知组件：'
          }Cannot find the path, please configure the correct folder path`}
          type="error"
        />
      </ErrorPage>
    );
  }
  const Components = lazy(
    () => import(/* @vite-ignore */ `../${Ele}`)
  );
  return (
    <Suspense fallback={<Loading />}>
      <Components />
    </Suspense>
  );
}

export const filepathToElement: any = (list: MenuItem[]) => {
  /**
   * 为了获取完整的路由中文路径
   * 从而设置 面包屑导航 和 tab 的值
   * 为所有的路由加上两个属性: id 和 loader
   * 弃用
   */
  // return list.map((item: MenuDataItem) => {
  //   if (item.children?.length) {
  //     return {
  //       id: item.path,
  //       loader: () => ({ fullNamePath: item.locale }),
  //       path: item.path,
  //       children: [...filepathToElement(item.children)],
  //       element: <OutletLayoutRouter />,
  //     };
  //   } else {
  //     return {
  //       id: item.path,
  //       loader: () => ({ fullNamePath: item.locale }),
  //       path: item.path,
  //       element: pathToLazyComponent(item.filepath),
  //     };
  //   }
  // });

  return list.map((item: MenuItem) => {
    if (item.children?.length) {
      return {
        path: item.path,
        children: [...filepathToElement(item.children)],
        element: <OutletLayoutRouter />,
      };
    } else {
      return {
        path: item.path,
        element: pathToLazyComponent(item.filepath),
      };
    }
  });
};
