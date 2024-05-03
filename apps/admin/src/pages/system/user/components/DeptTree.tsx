import React, { useState, useEffect } from 'react';
import { TreeSelect } from 'components';
import type { TreeDataNode } from 'antd';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

interface Props {
  onChange?: (deptId: number | string) => void;
}

const AddMenus: React.FC<Props> = ({ onChange }) => {
  const { server } = useBasicConfiguration();
  //  api server
  const { systemRole: SR } = server;

  const [treeNodes, SetTreeNodes] = useState<any[]>([]);

  const onLoadTreeData = async () => {
    const res = await SR.deptSimpleList();
    SetTreeNodes([...res]);
  };

  const getSelectedNodes = (node: TreeDataNode[]) => {
    let deptId = '';
    if (node) deptId = node[0].key as string;
    onChange && onChange(deptId);
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
      blockNode 
      expandAll={true}
    />
  );
};
export default AddMenus;
