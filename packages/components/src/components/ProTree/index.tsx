import React, { useImperativeHandle, forwardRef, useState, useEffect, useRef } from 'react';
import { Col, Row, Switch, Space, Tree } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';

import { RebuildTree, flattenArray, sortMenu } from 'utils';

export interface TreeNodes extends TreeDataNode {
  [key: string]: any;
}
export type CheckedsType = (string | number)[];

type MenusType = {
  [key: string]: any;
};

interface Props {
  /** tree结构数据  */
  treeNodes: TreeNodes[];
  /** 结构数据 是否为ree结构还是扁平数据 */
  flat?: boolean;
  /** 是否展开 */
  expandAll?: boolean;
  /** 初始化默认项 */
  defSelected?: CheckedsType | boolean;
  /** 是否显示辅助工具 */
  topToolBar?: boolean;
  /** 表单初始化 */
  subForm?: Record<string, any>;
  /** 监听Modal状态变化 */
  onStateChange?: (state: CheckedsType) => void;
  /** 绑定tree dom */
  ref?: any;
}

// 检查 点选子节点父节点未转递的情况
export const GetRealSelectedKeys = (tree: TreeDataNode[], selected: number[]) => {
  return selected.reduce((acc: number[], curr: number) => {
    let ParentKeys: number[] = tree
      .filter((item) => item.key == curr)
      .map((item: MenusType) => Number(item.parentId));

    if (ParentKeys.length) acc = [...acc, ...GetRealSelectedKeys(tree, ParentKeys)];
    if (curr > 0) acc = [...acc, curr];
    return [...new Set([...acc])];
  }, []);
};

const ProTree: React.FC<Props> = forwardRef(
  (
    { treeNodes = [], flat = true, expandAll, defSelected, topToolBar, onStateChange }: Props,
    ref
  ) => {
    const [treeData, setTreeData] = useState<TreeNodes[]>([]);
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
    const [checkedKeys, setCheckedKeys] = useState<number[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
    const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

    const [radiorCheck, setRadiorCheck] = useState<boolean>(false);
    const [radiorExpand, setRadiorExpand] = useState<boolean>(false);

    const CheckDelsKeys = (tree: TreeDataNode[], id: number, l: number, acc: number[], i = 0) => {
      const curNode: MenusType | false = tree.filter((node: any) => node.id == id)[0] || false;
      if ((curNode.children && curNode.children.length !== l) || l === -1)
        acc = [...acc, curNode.id];
      if (curNode && curNode.parentId) {
        acc = [...acc, ...CheckDelsKeys(tree, Number(curNode.parentId), -1, acc)];
      }

      return acc;
    };

    // 检查 存在子节点未选中的情况下 父节点的状态设置成未选择
    const CheckRealSelectedKeys = (selected: number[], tree: TreeDataNode[], treeNodes: any[]) => {
      const selectedNode = tree
        .filter((item: MenusType) => selected.indexOf(item.id) != -1)
        .reduce((acc: any, curr: MenusType) => {
          if (curr.parentId > 0)
            acc[`${curr.parentId}`] = [...(acc[`${curr.parentId}`] || []), curr];
          return acc;
        }, {});

      const delsKeys = Object.entries(selectedNode)
        .map(([key, val]: [string, any]) => {
          return CheckDelsKeys(flattenArray(treeData), Number(key), val.length, []);
        })
        .flatMap((item) => item);

      return selected.filter((item) => ![...new Set(delsKeys)].includes(item));
    };

    const changeAllRadioStatus = (checked: CheckedsType) => {
      const rootKays = treeData.map((item) => item.key);
      const filteredArray = rootKays.filter((item) =>
        (checked as (string | number)[]).includes(item as string)
      );
      setRadiorCheck(filteredArray.length === rootKays.length);
    };

    const handleSelectAllKeys = (arr = treeData) => {
      return arr.reduce((acc: number[], curr: MenusType) => {
        if (curr.children && Array.isArray(curr.children))
          acc = [...acc, ...handleSelectAllKeys(curr.children)];
        return [...acc, curr.key];
      }, []);
    };

    const onExpand: TreeProps['onExpand'] = (expandedKeysValue) => {
      setExpandedKeys(expandedKeysValue);
      setAutoExpandParent(false);
      setRadiorExpand(expandedKeysValue.length === handleSelectAllKeys().length);
    };

    const onCheck: TreeProps['onCheck'] = (cv, info) => {
      let checkedKeysValue = cv as number[];

      const { node }: MenusType = info;
      const curStatus = !node.checked;
      if (curStatus && node && node.children && node.children.length > 0) {
        const allChildrenChecked = node.children.every((child: MenusType) => {});
        if (allChildrenChecked) checkedKeysValue.filter((item) => item !== node.id);
      }

      setCheckedKeys(checkedKeysValue);
      changeAllRadioStatus(checkedKeysValue);
    };

    const onSelect: TreeProps['onSelect'] = (selectedKeysValue) => {
      setSelectedKeys(selectedKeysValue);
    };

    const handerRadioCheck = (checked: boolean) => {
      setRadiorCheck(checked);
      setCheckedKeys(checked ? handleSelectAllKeys() : []);
    };

    const handerExpandCheck = (checked: boolean) => {
      setRadiorExpand(checked);
      setExpandedKeys(checked ? handleSelectAllKeys() : []);
    };

    const onReset = () => {
      handerExpandCheck(!!expandAll);
      if (typeof defSelected == 'object') {
        changeAllRadioStatus(defSelected);
        setCheckedKeys(
          CheckRealSelectedKeys((defSelected as any) || [], treeNodes, flattenArray(treeData))
        );
      } else {
        handerRadioCheck(!!defSelected);
      }
    };

    const ToTree = (nodes: any) => {
      const menus = RebuildTree(nodes, {
        delEmptyRoutes: true,
        intercept: (item: { [key: string]: string }) => {
          return {
            ...item,
            key: item.id,
            value: item.id,
            title: item.name,
            children: item.routes,
          };
        },
      });

      return menus as unknown as TreeNodes[];
    };

    useEffect(() => {
      setTreeData(flat ? ToTree(treeNodes) : treeNodes);
    }, [treeNodes]);

    useEffect(() => {
      onReset();
    }, [treeData]);

    useEffect(() => {
      const checkeds = GetRealSelectedKeys(flattenArray(treeData), checkedKeys);
      onStateChange && onStateChange(checkeds);
    }, [checkedKeys]);

    // 暴露API
    useImperativeHandle(ref, () => ({
      onReset,
    }));

    return (
      <>
        <Row>
          {topToolBar ? (
            <>
              <Col span={12}>
                <Space>
                  全选/全不选
                  <Switch
                    checkedChildren="是"
                    unCheckedChildren="否"
                    value={radiorCheck}
                    onChange={(checked: boolean) => handerRadioCheck(checked)}
                  />
                </Space>
              </Col>
              <Col span={12}>
                <Space>
                  全部展开/折叠
                  <Switch
                    checkedChildren="展开"
                    unCheckedChildren="折叠"
                    value={radiorExpand}
                    onChange={(checked: boolean) => handerExpandCheck(checked)}
                  />
                </Space>
              </Col>
            </>
          ) : (
            <></>
          )}
          <Col span={24} style={{ marginTop: '10px' }}>
            <Tree
              checkable
              onExpand={onExpand}
              defaultExpandAll={true}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
              onCheck={onCheck}
              checkedKeys={checkedKeys}
              onSelect={onSelect}
              selectedKeys={selectedKeys}
              treeData={treeData}
              height={350}
            />
          </Col>
        </Row>
      </>
    );
  }
);
export default ProTree;
