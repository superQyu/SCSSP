import { useRef, cloneElement, useState } from 'react';

import { ProTable } from 'components';
import { type ActionType } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import EditDialog from './components/editdialog';

// api 相关
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
// 表格相关
import type { ModesApi } from './models/model';
import siteModel, { type ColumnsParamsProps } from './models/table.model';

export default () => {
  // api 相关
  const { server } = useBasicConfiguration();
  const { group } = server;

  // 初始化表格列
  const initColumns = siteModel({ server });
  const actionRef = useRef<ActionType>();

  const [dialogVisible, setDialogVisible] = useState<boolean>(false);

  // 修改表单打开关闭状态
  const handleModalStateChange = async (state: boolean) => {
    setDialogVisible(state);
    await actionRef.current?.reload();
  };

  // 点击保存
  const onSave = async (params: any) => {
    const res = await group.updateGroup(params as ColumnsParamsProps);
    return res;
  };

  // 删除行
  const onDelete = async (id: number) => {
    const res = await group.deleteGroup({ id });
    return res;
  };

  return (
    <>
      <ProTable
        actionRef={actionRef}
        headerTitle="班组列表"
        columns={initColumns}
        request={async (params = {}) => {
          const res = await group.getGroupList(params);
          // console.log('工种列表', res);
          return {
            ...params,
            data: res.list,
            total: res.total,
          } as unknown as ModesApi.pageItemType;
        }}
        form={{
          ignoreRules: false,
        }}
        toolBarRender={() => [
          <Button icon={<PlusOutlined />} onClick={() => setDialogVisible(true)} type="primary">
            新建
          </Button>,
        ]}
        editable={{ onDelete, onSave }}
        pagination={{
          pageSize: 10,
        }}
      ></ProTable>
      <EditDialog openModal={dialogVisible} onStateChange={handleModalStateChange} />
    </>
  );
};
