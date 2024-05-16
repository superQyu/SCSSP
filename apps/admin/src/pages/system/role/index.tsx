import { lazy, useRef, useState, useEffect, Suspense } from 'react';
import { Button, message, Modal, Alert } from 'antd';
import { TableDropdown } from '@ant-design/pro-components';
import {
  PlusOutlined,
  LoadingOutlined,
  SearchOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons';
import { type ActionType } from '@ant-design/pro-components';
import { ProTable } from 'components';

const compLists = import.meta.glob('./components/role/*.tsx');
const menuLists = Object.entries(compLists).map(([key, val]) => {
  let keyName = key.split('/').slice(-1)[0].split('.')[0];
  if (keyName === 'index') keyName = key.split('/').slice(-2)[0];
  return {
    key: keyName,
    Component: lazy(val as () => Promise<any>),
  };
}) as { key: string; Component: React.LazyExoticComponent<React.ComponentType<any>> }[];

// 站点表格模型
import type { ModesApi } from './modes/model';
import siteModel, { type ColumnsParamsProps } from './modes/menu.model';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

export default () => {
  const { server } = useBasicConfiguration();
  const actionRef = useRef<ActionType>();

  const [subForm, setsubForm] = useState<Record<string, any>>({});
  const [formModal, setFormModal] = useState<string | false>(false);

  //  api server
  const { menus: M, systemRole: SR } = server;

  const DynamicComp = () => {
    const isExsit = menuLists.filter((item) => item.key == formModal);
    if (!formModal || !isExsit[0]) return <></>;
    const Comp = isExsit[0].Component;
    return <Comp subForm={subForm} openModal={!!formModal} onStateChange={GetModalStateChange} />;
  };

  // 修改状态
  const GetModalStateChange = async (state: string | false) => {
    setFormModal(state);
    await actionRef.current?.reload();
  };

  // 初始化 表格列表项
  const initColumns = siteModel({ server });

  // 删除行
  const onDelete = async (id: number) => {
    const res = await SR.deleteRole({ id }).then(async () => {
      message.success('操作成功!');
    });
    return res;
  };

  // 保存save
  const onSave = async (params: any) => {
    const res = await SR.updateRole(
      JSON.parse(JSON.stringify({ ...params })) as ColumnsParamsProps
    );
    return res;
  };

  useEffect(() => {}, []);

  return (
    <>
      <ProTable
        headerTitle="角色列表"
        request={async (params: ModesApi.ParamsType) => {
          const res = await SR.roleList({ ...params, pageNo: params?.current || 0 });
          // 指定字段类型转换
          res['list'] = res?.list.map((item: ModesApi.ParamsType) => {
            return { ...item, status: `${item.status}`, dataScope: `${item.dataScope}` };
          });
          return {
            ...params,
            data: res?.list || [],
            total: res?.totlal || 0,
          } as unknown as ModesApi.pageItemType;
        }}
        onSubmit={async (params: {}) => {
          console.log(params);
        }}
        actionRef={actionRef}
        form={{
          syncToUrl: (values: any, _: string) => ({ ...values }),
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
            onClick={() => setFormModal('structural')}
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
            width: 200,
            valueType: 'option',
            key: 'option',
            render: (_text: any, record: any, _: any, action: any) => [
              <a
                key="editable"
                onClick={() => {
                  action?.startEditable?.(record.id);
                }}
              >
                编辑
              </a>,
              <a
                key="menuRole"
                onClick={async () => {
                  const res = await SR.listRoleMenus({ roleId: record.id });
                  setFormModal('menuRole');
                  setsubForm({ ...record, menuIds: res });
                }}
              >
                菜单权限
              </a>,
              <a
                key="dataRole"
                onClick={async () => {
                  setFormModal('dataRole');
                  setsubForm({ ...record });
                }}
              >
                数据权限
              </a>,
              <TableDropdown
                key="actionGroup"
                onSelect={(key) => {
                  if (key === 'delete') {
                    try {
                      Modal.confirm({
                        title: `删除操作`,
                        
                        icon: <ExclamationCircleFilled />,
                        content: `确定删除角色 [${record.name}]?`,
                        okText: '删除',
                        okType: 'danger',
                        cancelText: '取消',
                        onOk: async () => {
                          await SR.deleteRole({ id: record.id });
                          action.reload();
                        },
                        onCancel() {},
                      });
                    } catch (errorInfo) {}
                  }
                }}
                menus={[{ key: 'delete', name: '删除' }]}
              />,
            ],
          },
        ]}
      ></ProTable>

      <Suspense
        fallback={
          //  @ts-ignore
          <LoadingOutlined size={20} />
        }
      >
        <DynamicComp />
      </Suspense>
    </>
  );
};
