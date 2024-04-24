import { OutletLayoutRouter } from 'components';
import { lazy, Suspense } from 'react';
import { Alert, Spin, Empty } from 'antd';
import type { MenuItem } from 'components';
import ErrorPage from '@/pages/error-page';

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
        <Empty description={''} style={{ marginBottom: '20px' }} />
        <Alert
          message={`${
            Ele || '未知组件：'
          }Cannot find the path, please configure the correct folder path`}
          type="error"
        />
      </ErrorPage>
    );
  }
  const Components = lazy(() => import(/* @vite-ignore */ `../${Ele}`));
  return (
    <Suspense fallback={<Loading />}>
      <Components />
    </Suspense>
  );
}

export const filepathToElement: any = (list: MenuItem[]) =>
  list.map((item: MenuItem) => {
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
