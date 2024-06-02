import { buildTree } from './tools';
import { type UnLimit } from './type';

interface TreeHelperConfig {
  id: string;
  children: string;
  pid: string;
}
const DEFAULT_CONFIG: TreeHelperConfig = {
  id: 'id',
  children: 'children',
  pid: 'pid',
};
const getConfig = (config: Partial<TreeHelperConfig>) => Object.assign({}, DEFAULT_CONFIG, config);

/**
 * 将一个层级结构展开为单层数组
 * @param arr 带children的层级结构树
 * @returns 处理后的数组
 */
export const flattenArray = (arr: any[]) => {
  return arr.reduce((acc, curr: UnLimit) => {
    if (curr.children && Array.isArray(curr.children)) acc.push(...flattenArray(curr.children));
    acc.push({ ...curr });
    return acc;
  }, []);
};

/**
 * 对当前树进行层级筛序, 获取当前项所在的层级结构
 * @param tree 需要进行筛选的树
 * @param func 筛选逻辑(node: 每一个层级项)
 * @param config
 * @returns
 */
export const filter = <T = any>(
  tree: T[],
  func: (node: T) => boolean,
  config: Partial<TreeHelperConfig> = {}
): T[] => {
  config = getConfig(config);
  const children = config.children as string;

  function listFilter(list: T[]) {
    return list
      .map((node: any) => ({ ...node }))
      .filter((node) => {
        node[children] = node[children] && listFilter(node[children]);
        return func(node) || (node[children] && node[children].length);
      });
  }

  return listFilter(tree);
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
