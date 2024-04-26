import React, { useState, useMemo, useEffect, useRef, forwardRef, CSSProperties } from 'react';
import { Input, Tree, TreeSelect } from 'antd';
import type { GetProp, TreeSelectProps, TreeDataNode } from 'antd';

import { RebuildTree, flattenArray } from 'utils';

import { GetRealSelectedKeys } from './index';

const { Search } = Input;

type MenusType = {
  id?: number;
  parentId?: number;
  [key: string]: any;
};
interface Props extends MenusType {
  /** 数据源 */
  treeNodes?: TreeDataNode[];
  /** 是否开启搜索 */
  serach?: boolean;
  /** 显示模式  */
  model?: 'tree' | 'select';
  /** 结构数据 是否为ree结构还是扁平数据 */
  flat?: boolean;
  /** 显示指定的数据 源ID*/
  platforId?: string | number;
  /**  */
  treeDefaultExpandedKeys?: string[];
  /** Tree 最外层的 style */
  rootStyle?: CSSProperties;
}
type DefaultOptionType = GetProp<TreeSelectProps, 'treeData'>[number];

const ProTreeSelect: React.FC<Props> = forwardRef(
  (
    {
      serach,
      onChange,
      model = 'select',
      treeDefaultExpandedKeys = [],
      platforId = -1,
      flat,
      treeNodes = [],
      rootStyle = { maxHeight: 480, overflow: 'auto' },
    }: Props,
    ref
  ) => {
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const [searchValue, setSearchValue] = useState('');

    const [defaultData, setDefaultData] = useState<TreeDataNode[]>([]);
    const [treeData, setTreeData] = useState<Omit<DefaultOptionType, 'label'>[]>([]);

    const onLoadTreeData = async () => {
      let nodes = [...treeNodes] as unknown as any[];
      if (flat) {
        nodes = RebuildTree(treeNodes as unknown as any[], {
          intercept: (item: { [key: string]: string }) => ({
            id: item.id,
            children: item.routes,
            key: item.id,
            value: item.id,
            title: item.name,
            parentId: item.parentId,
          }),
        });
        if (platforId != -1) nodes = nodes.filter((item) => item.value == platforId);
      }
      setTreeData([...nodes]);
      setDefaultData(flattenArray(nodes));
    };

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const newExpandedKeys = defaultData
        .filter((item: any) => item.title.indexOf(value) > -1)
        .map((item) => item.key);

      const selectedKeys = GetRealSelectedKeys(defaultData, newExpandedKeys as any[]);
      const selectedNodes = defaultData.filter((item: any) => {
        return selectedKeys.indexOf(item.key) != -1 ? item.title : '';
      });
      setTreeData([
        ...RebuildTree(selectedNodes as any[], {
          intercept: (item: { [key: string]: string }) => ({
            ...item,
            children: item.routes,
          }),
        }),
      ]);
      setExpandedKeys(selectedKeys);
      setAutoExpandParent(false);
      setSearchValue(value);
    };

    const onCheck = (selectedKeys: any) => {};
    const onSelect = (selectedKeys: React.Key[]) => {
      const selected = defaultData.filter((item) => {
        return selectedKeys.indexOf(item.key) != -1;
      });
      onChange && onChange(selectedKeys.length ? selected : false);
    };
    const clearAll = (type: string) => {
      if (type === 'clear') {
        onLoadTreeData();
        setExpandedKeys(treeDefaultExpandedKeys);
        setAutoExpandParent(false);
      }
    };

    useEffect(() => {
      if (searchValue == '') setExpandedKeys(treeDefaultExpandedKeys);
    }, [searchValue]);

    useEffect(() => {
      onLoadTreeData();
    }, [treeNodes]);

    useEffect(() => {
      setExpandedKeys(treeDefaultExpandedKeys);
    }, [treeDefaultExpandedKeys]);
    return (
      <>
        {model == 'tree' ? (
          <>
            {serach ? (
              <Search
                style={{ marginBottom: 12 }}
                allowClear
                onSearch={(value, event, { source }: any) => clearAll(source)}
                placeholder="搜索关键字"
                onChange={onSearch}
              />
            ) : (
              <></>
            )}
            <Tree
              rootStyle={{ ...rootStyle }}
              defaultExpandAll={true}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
              onSelect={onSelect}
              treeData={treeData}
              onExpand={(curExpandedKeys) => setExpandedKeys(curExpandedKeys)}
            />
          </>
        ) : model == 'select' ? (
          <TreeSelect
            style={{ width: '100%' }}
            treeData={treeData}
            dropdownStyle={{ ...rootStyle }}
            treeDefaultExpandedKeys={[...treeDefaultExpandedKeys]}
            placeholder="请选择"
            onChange={(v: string) => onChange(`${v}`)}
          />
        ) : (
          <></>
        )}
      </>
    );
  }
);

export default ProTreeSelect;
