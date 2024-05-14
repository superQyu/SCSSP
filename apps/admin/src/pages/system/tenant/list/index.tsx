import { useRef, useState, useEffect } from 'react';
import { Button, message, Modal } from 'antd';
import dayjs from 'dayjs';
import styled from 'styled-components';

import { PlusOutlined, SearchOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { type ActionType } from '@ant-design/pro-components';
import { ProTable } from 'components';

import InforModel from './modes/structural';
// 站点表格模型
import type { ModesApi } from './modes/model';
import siteModel, { type ColumnsParamsProps } from './modes/menu.model';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

/** 自定义 按钮样式 */
const ActionButton = styled(Button)`
  padding: 4px;
`;

export default () => {
  const { server } = useBasicConfiguration();
  const actionRef = useRef<ActionType>();

  const [subForm, setSubForm] = useState<Record<string, any>>({});
  const [formModal, setFormModal] = useState<boolean>(false);

  //  api server
  const { systemTenant: ST } = server;

  // 修改状态
  const handleModalStateChange = async (state: boolean) => {
    setSubForm({});
    setFormModal(state);
    await actionRef.current?.reload();
  };

  // 初始化 表格列表项
  const initColumns = siteModel({ server });

  // 删除行
  const onDelete = async (id: number) => {
    const res = await ST.deleteRole({ id }).then(async () => {
      message.success('操作成功!');
    });
    return res;
  };

  // 保存save
  const onSave = async (params: any) => {
    const res = await ST.updateRole(
      JSON.parse(JSON.stringify({ ...params })) as ColumnsParamsProps
    );
    return res;
  };

  useEffect(() => {}, []);

  return (
    <>
      <ProTable
        headerTitle="租户列表"
        request={async (params: ModesApi.ParamsType) => {
          const res = await ST.tenantList({ ...params, pageNo: params?.current || 0 });
          // 指定字段类型转换
          res['list'] = res?.list.map((item: ModesApi.ParamsType) => {
            return { ...item, status: `${item.status}`,packageId:`${item.packageId}`, expireTime: dayjs(item.expireTime) };
          });
          return {
            ...params,
            data: res?.list || [],
            total: res?.totlal || 0,
          } as unknown as ModesApi.pageItemType;
        }}
        scroll={{ x: 1500, y: 'auto' }}
        onSubmit={async (params: {}) => {}}
        actionRef={actionRef}
        form={{
          syncToUrl: (values: any, _: string) => ({
            ...values,
            expireTime: dayjs(values.expireTime).unix(),
          }),
        }}
        editable={{ onDelete, onSave }}
        columnsState={{
          persistenceKey: 'pro-table-singe-role',
          persistenceType: 'localStorage',
          onChange(_: any) {},
        }}
        toolBarRender={() => [
          <Button
            key="button"
            
            icon={<PlusOutlined />}
            onClick={() => setFormModal(true)}
            type="primary"
          >
            新建
          </Button>,
        ]}
        search={{
          labelWidth: 'auto',
          optionRender: ({ searchText }: any, { form }: any, dom: any) => {
            return [
              dom[0],
              <Button
                type="primary"
                key="sub"
                
                icon={<SearchOutlined />}
                onClick={() => form?.submit()}
              >
                {searchText}
              </Button>,
            ];
          },
        }}
        columns={[
          ...initColumns,
          {
            title: '操作',
            width: 120,
            valueType: 'option',
            key: 'option',
            fixed: 'right',
            render: (_text: any, record: any, _: any, action: any) => [
              <ActionButton
                key="editable"
                type="link"
                onClick={() => {
                  setSubForm({ ...record });
                  setFormModal(true);
                }}
              >
                编辑
              </ActionButton>,
              <ActionButton
                key="dataRole"
                type="link"
                danger
                onClick={async () => {
                  try {
                    Modal.confirm({
                      title: `删除操作`,
                      
                      icon: <ExclamationCircleFilled />,
                      content: `确定删除租户 [${record.name}]?`,
                      okText: '删除',
                      okType: 'danger',
                      cancelText: '取消',
                      onOk: async () => {
                        await ST.deleteTenant({ id: record.id });
                        action.reload();
                      },
                      onCancel() {},
                    });
                  } catch (errorInfo) {}
                }}
              >
                删除
              </ActionButton>,
            ],
          },
        ]}
      />

      <InforModel subForm={subForm} openModal={formModal} onStateChange={handleModalStateChange} />
    </>
  );
};
