import { createElement, cloneElement, useRef, useState, useEffect } from 'react';
import { Button, message, Modal, Alert } from 'antd';
import { TableDropdown } from '@ant-design/pro-components';
import { PlusOutlined, SearchOutlined, ExclamationCircleFilled } from '@ant-design/icons';

import { type ActionType } from '@ant-design/pro-components';
import { ProTable } from 'components';

import AddRole from '../role/components/role/structural';
import MenuRole from '../role/components/role/menuRole';
import AataRole from '../role/components/role/dataRole';

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

  // 修改状态
  const GetModalStateChange = async (state: string | false) => {
    setFormModal(state);
    await actionRef.current?.reload();
  };

  // 初始化 表格列表项
  const initColumns = siteModel({ server });

  // 删除行
  const onDelete = async (id: number) => {
    try {
      await M.deleteMenus({ ids: id })
        .then(async () => {
          message.success('操作成功!');
          await actionRef.current?.reload();
        })
        .catch(() => {});
    } catch (errorInfo) {}
  };

  // 重写save方法 阻止提交失败也退出编辑状态
  const onSave = async (...args: any[]) => {
    const [config, id, n, , ,] = args;
    // 更新行数据

    const res = await SR.updateRole(JSON.parse(JSON.stringify({ ...n })) as ColumnsParamsProps)
      .then(async () => {
        message.success('信息更新成功！');
        await actionRef.current?.reload();
      })
      .catch(() => false);
    if (res === false) {
      message.error('信息更新失败，请重新提交！');
      return false;
    }
    // 保存时解除编辑模式
    config.cancelEditable(id);
    return true;
  };

  useEffect(() => {}, []);

  return (
    <>
      <Alert message="后端更新(状态)字段未变化！" type="error" showIcon />
      <ProTable
        headerTitle="角色列表"
        request={async (params: ModesApi.ParamsType) => {
          const res = await SR.roleList({ ...params, pageNo: params?.current || 0 });
          res['list'] = res?.list.map((item)=>{
            return {...item,status:`${item.status}`}
          })
          console.log(res?.list)
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
        editable={{
          type: 'multiple',
          onSave,
          onDelete,
          actionRender: (...args: any[]) => {
            const [, config, defaultDom] = args;
            return [
              cloneElement(defaultDom.save as React.ReactElement, {
                onSave: onSave.bind(null, config),
              }),
              defaultDom.cancel,
              defaultDom.delete,
            ];
          },
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-role',
          persistenceType: 'localStorage',
          onChange(_: any) {},
        }}
        toolBarRender={() => [
          <Button
            key="button"
            icon={createElement(PlusOutlined)}
            onClick={() => setFormModal('addRole')}
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
                icon={createElement(SearchOutlined)}
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
                        icon: createElement(ExclamationCircleFilled),
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
      {/* 新增角色 */}
      {formModal == 'addRole' ? (
        <AddRole subForm={subForm} openModal={!!formModal} onStateChange={GetModalStateChange} />
      ) : formModal == 'menuRole' ? (
        <MenuRole subForm={subForm} openModal={!!formModal} onStateChange={GetModalStateChange} />
      ) : formModal == 'dataRole' ? (
        <AataRole subForm={subForm} openModal={!!formModal} onStateChange={GetModalStateChange} />
      ) : (
        <></>
      )}
    </>
  );
};
