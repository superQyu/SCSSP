import { buildTree } from './tools';

import { type UnLimit } from './type';

export const flattenArray = (arr: any[]) => {
  return arr.reduce((acc, curr: UnLimit) => {
    acc.push(curr);
    if (curr.children && Array.isArray(curr.children)) acc.push(...flattenArray(curr.children));
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
