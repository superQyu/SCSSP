import React, { useState, useEffect } from 'react';
import { TreeSelect } from 'components';
import type { TreeDataNode } from 'antd';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

interface Props {}

const AddMenus: React.FC<Props> = () => {
  const { server, config } = useBasicConfiguration();
  //  api server
  const { systemRole: SR } = server;

  const [menus, setMenus] = useState({ selected: '' });
  const [treeNodes, SetTreeNodes] = useState<any[]>([]);

  const onLoadTreeData = async () => {
    const res = await SR.deptSimpleList();
    SetTreeNodes([...res]);
  };

  const getSelectedNodes = (node: TreeDataNode[]) => {
    console.log(node[0]['key']);
    // let selected = '';
    // if (node) selected = node.map((item) => `${item.key}:${item.title}`).join(';');
    // setMenus({ ...menus, selected });
  };

  useEffect(() => {
    onLoadTreeData();
  }, []);

  return (
    <TreeSelect
      flat={true}
      onChange={getSelectedNodes}
      model={'tree'}
      treeNodes={treeNodes}
      rootStyle={{ maxHeight: 'calc(100% - 42px)', overflow: 'auto' }}
      serach={true}
      expandAll={true}
    />
  );
};
export default AddMenus;
