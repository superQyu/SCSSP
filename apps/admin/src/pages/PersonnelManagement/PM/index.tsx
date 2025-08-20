import { useRef, useState } from 'react';

import { ProTable } from 'components';
import type { ActionType } from '@ant-design/pro-components';
import { Button, message, Modal } from 'antd';
import {
  ExclamationCircleFilled,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

import InforModel from './modes/structural';
import Styled from '@/components/Styled';
import SingleTitle from '@/components/SingleTitle';
// 项目管理表格模型
import type { ModesApi } from './modes/model';
import PMmodel, {
  type ColumnsParamsProps,
} from './modes/PM.model';

export default () => {
  const { server, setFullLoding } = useBasicConfiguration();
  //  api server
  const { PMPM: P, menus: M } = server;
  const actionRef = useRef<ActionType>();

  const [subForm, setSubForm] = useState<Record<string, any>>(
    {}
  );
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
    const res = await M.deleteMenus({ ids: id }).then(
      async () => {
        message.success('操作成功!');
        await actionRef.current?.reload();
      }
    );
    return res;
  };

  const onSave = async (params: any) => {
    const res = await M.updateMenu(
      JSON.parse(
        JSON.stringify({ ...params })
      ) as ColumnsParamsProps
    ).then(async () => {
      message.success('信息更新成功！');
      await actionRef.current?.reload();
    });
    return res;
  };

  return (
    <div className="h-full p-18px">
      <ProTable
        request={async (params = {}) => {
          const res = await P.projectUnityList({ ...params });
          return {
            ...params,
            data: res.list,
            total: res.total,
          } as unknown as ModesApi.pageItemType;
        }}
        actionRef={actionRef}
        scroll={{ x: 1900, y: 'auto' }}
        onSubmit={async (params: {}) => {}}
        // pagination={{
        //   pageSize: 30,
        // }}
        rowKey="id"
        headerTitle={<SingleTitle label="项目管理" />}
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
          optionRender: (
            { searchText }: any,
            { form }: any,
            dom: any
          ) => {
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
        toolBarRender={() => [
          <Styled.ExportButton
            api="exportProjectUnity"
            fileName="项目导出"
          />,
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              const localStorageData =
                localStorage.getItem('formData');
              setSubForm(
                localStorageData
                  ? JSON.parse(localStorageData)
                  : {}
              );
              setFormModal(true);
            }}
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
            render: (
              _text: any,
              record: any,
              _: any,
              action: any
            ) => [
              <a
                key="editable"
                onClick={async () => {
                  setFullLoding(true);
                  const res = await P.getProjectUnity({
                    id: record.id,
                  });
                  setFullLoding(false);
                  console.log('在修改', { ...res });
                  setSubForm({ ...res });
                  setFormModal(true);
                }}
              >
                编辑
              </a>,
              <a
                key="delete"
                onClick={() => {
                  try {
                    Modal.confirm({
                      title: `删除操作`,

                      icon: <ExclamationCircleFilled />,
                      content: `确定删除项目 [${record.projectName}]?`,
                      okText: '删除',
                      okType: 'danger',
                      cancelText: '取消',
                      onOk: async () => {
                        await P.deleteProjectUnity({
                          id: record.id,
                        });
                        action.reload();
                      },
                      onCancel() {},
                    });
                  } catch (errorInfo) {}
                }}
              >
                删除
              </a>,
            ],
          },
        ]}
      />

      <InforModel
        subForm={subForm}
        openModal={formModal}
        onStateChange={handleModalStateChange}
      />
    </div>
  );
};
