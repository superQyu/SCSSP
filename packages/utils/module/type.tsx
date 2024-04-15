export interface UnLimit {
  [key: string]: any;
}

export interface TreeParam extends UnLimit {
  spId: number;
  pIdKey: string;
  idKey: string;
  intercept?: (args: TreeNode) => TreeNode;
}
export interface TreeNode {
  id: number;
  parentId: number;
  params?: TreeParam;
  children?: TreeNode[];
  [key: string]: any;
}
