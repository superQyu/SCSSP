import { useRef, useState, useEffect } from 'react';

import { ProTable } from 'components';
// import { ProTable } from '@ant-design/pro-components';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { Button, message, DatePicker, Space, Table, Alert } from 'antd';

import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

import { useAppSelector } from 'hooks';

const { RangePicker } = DatePicker;

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

import InforModel from './modes/structural';

// 项目管理表格模型
import type { ModesApi } from './modes/model';
import PMmodel, { type ColumnsParamsProps } from './modes/PM.model';

export default () => {
  const {
    common: { dictionary },
  } = useAppSelector((state: any) => state) as { common: { dictionary: Record<string, any> } };
  const { server } = useBasicConfiguration();
  //  api server
  const { PMPM: P, menus: M } = server;
  const actionRef = useRef<ActionType>();

  const [subForm, setSubForm] = useState<Record<string, any>>({});
  const [formModal, setFormModal] = useState<boolean>(false);

  // 修改状态
  const handleModalStateChange = async (state: boolean) => {
    setSubForm({});
    setFormModal(state);
    await actionRef.current?.reload();
  };

  // 初始化 表格列表项
  const initColumns = PMmodel({ server });

  // 删除行
  const onDelete = async (id: number) => {
    const res = await M.deleteMenus({ ids: id }).then(async () => {
      message.success('操作成功!');
      await actionRef.current?.reload();
    });
    return res;
  };

  const onSave = async (params: any) => {
    const res = await M.updateMenu(
      JSON.parse(JSON.stringify({ ...params })) as ColumnsParamsProps
    ).then(async () => {
      message.success('信息更新成功！');
      await actionRef.current?.reload();
    });
    return res;
  };

  return (
    <>
      <ProTable
        request={async (params = {}) => {
          const res = await P.projectUnityList({ ...params });
          return {
            ...params,
            data: res.list,
            total: res.total,
          } as unknown as ModesApi.pageItemType;
        }}
        scroll={{ x: 1900, y: 'auto' }}
        onSubmit={async (params: {}) => {}}
        pagination={{
          pageSize: 30,
        }}
        rowKey="id"
        headerTitle="项目管理"
        columnsState={{
          persistenceKey: 'pro-table-pm-pm',
          persistenceType: 'localStorage',
          onChange(_: any) {},
        }}
        form={{
          syncToUrl: (values: any, _: string) => ({ ...values }),
        }}
        //
        editable={{ onSave }}
        search={{
          labelWidth: 'auto',
          optionRender: ({ searchText }: any, { form }: any, dom: any) => {
            return [
              dom[0],
              <Button
                type="primary"
                key="sub"
                // @ts-ignore
                icon={<SearchOutlined />}
                onClick={() => form?.submit()}
              >
                {searchText}
              </Button>,
            ];
          },
        }}
        toolBarRender={() => [
          <Button
            key="button"
            // @ts-ignore
            icon={<PlusOutlined />}
            onClick={() => setFormModal(true)}
            type="primary"
          >
            新建
          </Button>,
        ]}
        columns={[
          ...initColumns,
          {
            title: '操作',
            width: 120,
            valueType: 'option',
            key: 'option',
            fixed: 'right',
            render: (_text: any, record: any, _: any, action: any) => [
              <a
                key="editable"
                onClick={() => {
                  // action?.startEditable?.(record.id);
                }}
              >
                编辑
              </a>,
              <a
                key="delete"
                onClick={() => {
                  // action?.startEditable?.(record.id);
                }}
              >
                删除
              </a>,
            ],
          },
        ]}
      />

      <InforModel subForm={subForm} openModal={formModal} onStateChange={handleModalStateChange} />
    </>
  );
};
