import { OutletLayoutRouter } from 'components';
import { lazy, Suspense } from 'react';

import { Alert, Spin } from 'antd';
import type { MenuItem } from 'components';
import ErrorPage from '@/pages/error-page';

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
  const Components = lazy(() => import(/* @vite-ignore */ `../${Ele}`));
  return (
    <Suspense fallback={<Spin size="small" />}>
      <Components />
    </Suspense>
  );
}

export const filepathToElement: any = (list: MenuItem[]) =>
  list.map((item: MenuItem) => {
    if (item.children?.length) {
      let children = [...filepathToElement(item.children)];
      return {
        path: item.path,
        children,
        element: <OutletLayoutRouter />,
      };
    } else {
      return {
        path: item.path,
        element: pathToLazyComponent(item.filepath),
      };
    }
  });
