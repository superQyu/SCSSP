import { buildTree } from './tools';

import { type UnLimit } from './type';

export const flattenArray = (arr: any[]) => {
  return arr.reduce((acc, curr: UnLimit) => {
    if (curr.children && Array.isArray(curr.children)) acc.push(...flattenArray(curr.children));
    acc.push({ ...curr });
    return acc;
  }, []);
};

export const filterRoutes = (routes: any, key?: string, v?: string) => {
  if (!routes || !Array.isArray(routes)) return [];

  return buildTree(
    flattenArray(routes).filter((item: UnLimit) => item[key || 'isHidden'] != (v || '1')),
    {
      intercept: (item: { [key: string]: string }) => {
        return {
          ...item,
          children: item.routes,
        };
      },
    }
  );
};

export const GetFirstPath = (arr: any[], route = ''): string => {
  if (arr.length > 0) {
    const firstItem = arr[0];
    if (firstItem.children && firstItem.children.length > 0) {
      return GetFirstPath(firstItem.children, `${route}/${firstItem.path}`);
    } else {
      return `${route}/${firstItem.path}`;
    }
  } else {
    return route;
  }
};
