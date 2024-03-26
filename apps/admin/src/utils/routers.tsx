import { OutletLayoutRouter } from 'components';
import { lazy, Suspense } from 'react';

import { Alert, Spin } from 'antd';
import type { MenuItem } from 'components';
import ErrorPage from '@/pages/error-page';

// /**/ 表示二级目录 一般二级目录就够了  不够在加即可
export const modules = import.meta.glob('../pages/**/*.tsx');

function pathToLazyComponent(Ele: string) {
  const path = modules[`../${Ele}`] as any;
  if (!path) {
    return (
      <ErrorPage>
        <Alert
          message={Ele + ':Cannot find the path, please configure the correct folder path'}
          type="error"
        />
      </ErrorPage>
    );
  }
  const Components = lazy(() => import(/* @vite-ignore */ `../${Ele}`)); //lazy(path);
  return (
    <Suspense fallback={<Spin size="small" />}>
      <Components />
    </Suspense>
  );
}

export const filepathToElement = (list: MenuItem[]) =>
  list.map((item) => {
    if (item.children) {
      return {
        path: item.path,
        children: item.children?.map((c) => ({
          path: c.path,
          element: pathToLazyComponent(c.filepath),
        })),
        element: <OutletLayoutRouter />,
      };
    } else {
      return {
        path: item.path,
        element: pathToLazyComponent(item.filepath),
      };
    }
  });
