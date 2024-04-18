import { createElement, cloneElement, useRef, useState, useEffect } from 'react';
import { Button, message } from 'antd';
import { TableDropdown, type ProColumns } from '@ant-design/pro-components';
import { PlusOutlined, SearchOutlined, RedoOutlined } from '@ant-design/icons';

import { type ActionType } from '@ant-design/pro-components';
import { ProTable } from 'components';

import AddRole from '../role/components/role/structural';
import MenuRole from '../role/components/role/menuRole';

// 站点表格模型
import type { ModesApi } from './modes/model';
import siteModel, { type ColumnsParamsProps } from './modes/menu.model';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

export default () => {
  const { server } = useBasicConfiguration();
  const actionRef = useRef<ActionType>();

  const [subForm, setsubForm] = useState<Record<string, any>>({});
  const [formModal, setFormModal] = useState<string>('');

  //  api server
  const { menus: M, sites: S, systemRole: SR } = server;

  // 修改状态
  const handleModalStateChange = async (state: string) => {
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

    console.log(JSON.parse(JSON.stringify({ ...n })));
    const res = await M.updateMenu(JSON.parse(JSON.stringify({ ...n })) as ColumnsParamsProps)
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
      <ProTable
        headerTitle="菜单列表"
        request={async (params = {}) => {
          const res = await SR.roleList({ ...params });
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
          // 请求之前参数格式化
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
            width: 140,
            valueType: 'option',
            key: 'option',
            render: (_text: any, record: any, _, action: any) => [
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
                onClick={() => {
                  setsubForm(record);
                  setFormModal('menuRole');
                }}
              >
                菜单权限
              </a>,
              <TableDropdown
                key="actionGroup"
                onSelect={(key) => {
                  if (key === 'delete') {
                    try {
                      M.deleteMenus({ id: record.id })
                        .then(() => {
                          message.success('操作成功!');
                          action?.reload();
                        })
                        .catch(() => {});
                    } catch (errorInfo) {}
                  }
                }}
                menus={[
                  { key: 'delete', name: '删除' },
                  { key: 'detail', name: '详情' },
                  { key: 'copy', name: '复制' },
                ]}
              />,
            ],
          },
        ]}
      ></ProTable>
      {/* 新增角色 */}
      <AddRole
        subForm={subForm}
        openModal={formModal == 'addRole'}
        onStateChange={handleModalStateChange}
      />
      {/* 菜单权限 */}
      <MenuRole
        subForm={subForm}
        openModal={formModal == 'menuRole'}
        onStateChange={handleModalStateChange}
      />
    </>
  );
};
