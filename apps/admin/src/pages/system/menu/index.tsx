import { useRef, useState, useEffect } from 'react';
import { Button, message, Modal } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  SearchOutlined,
  DoubleRightOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons';

import { TableDropdown, type ActionType } from '@ant-design/pro-components';
import { ProTable } from 'components';
import { sortMenu, RebuildTree, flattenArray } from 'utils';

import AddMenus from './components/menus/structural';

// 站点表格模型
import type { ModesApi } from './modes/model';
import siteModel, { type ColumnsParamsProps } from './modes/menu.model';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

export default () => {
  const { server, config } = useBasicConfiguration();
  const actionRef = useRef<ActionType>();

  const [subForm, setSubForm] = useState<Record<string, any>>({});
  const [formModal, setFormModal] = useState<boolean>(false);

  //  api server
  const { menus: M, sites: S } = server;
  const { PLATFORMID } = config as Record<string, any>;

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
    const res = await M.deleteMenus({ id: id }).then(async () => {
      message.success('操作成功!');
      await actionRef.current?.reload();
    });
    return res;
  };

  // 保存save
  const onSave = async (params: any) => {
    // 更新行数据
    const res = await M.updateMenu(JSON.parse(JSON.stringify({ ...params })) as ColumnsParamsProps);
    return res;
  };

  useEffect(() => {}, []);

  return (
    <>
      {/* <Alert message="删除路由报错" type="warning" showIcon /> */}
      <ProTable
        headerTitle="菜单列表"
        request={async (params = {}) => {
          const res = await S.menuList({ ...params });
          // * 筛选出 华光智慧监管平台 id:PLATFORMID  相关菜单表
          const isSearch = Object.entries(params).length > 0; // 判断是否为搜索

          let M = RebuildTree(res, {
            intercept: (item: { [key: string]: string }) => ({ ...item, children: item.routes }),
          });
          if (!isSearch) M = M.filter((item) => item.id === PLATFORMID)[0]?.routes || [];
          const menus = RebuildTree(flattenArray(M), {
            delEmptyRoutes: true,
            intercept: (item: { [key: string]: string }) => {
              return {
                ...item,
                filepath: item.component,
                children: item.routes,
                status: `${item.status}`,
              };
            },
            _rootId: M[0]?.id,
          });
          return {
            ...params,
            data: sortMenu(menus),
            total: menus.length,
          } as unknown as ModesApi.pageItemType;
        }}
        columns={[
          ...initColumns,
          {
            title: '操作',
            width: 140,
            fixed: 'right',
            valueType: 'option',
            key: 'option',
            render: (_text: any, record: any, _: any, action: any) => [
              <a
                key="editable"
                onClick={() => {
                  action?.startEditable?.(record.id);
                }}
              >
                {/* @ts-ignore */}
                {<EditOutlined />}
                编辑
              </a>,
              <TableDropdown
                key="actionGroup"
                onSelect={(key) => {
                  if (key === 'delete') {
                    try {
                      try {
                        Modal.confirm({
                          title: `删除操作`,
                          
                          icon: <ExclamationCircleFilled />,
                          content: `确定删除菜单 [${record.name}]?`,
                          okText: '删除',
                          okType: 'danger',
                          cancelText: '取消',
                          onOk: async () => {
                            await M.deleteMenus({ id: record.id });
                            message.success('操作成功!');
                            action?.reload();
                          },
                          onCancel() {},
                        });
                      } catch (errorInfo) {
                        message.error('操作失败!');
                      }
                    } catch (errorInfo) {}
                  } else if (key === 'detail') {
                    setSubForm({
                      ...record,
                      parentId: `${record.parentId}`,
                      type: `${record.type}`,
                    });
                    setFormModal(true);
                  }
                }}
                menus={[
                  { key: 'detail', name: '详情' },
                  { key: 'delete', name: '删除' },
                  // { key: 'copy', name: '复制' },
                ]}
              >
                {/* @ts-ignore */}
                {<DoubleRightOutlined />}更多
              </TableDropdown>,
            ],
          },
        ]}
        onSubmit={async (params: {}) => {}}
        actionRef={actionRef}
        pagination={false}
        form={{
          // 请求之前参数格式化
          syncToUrl: (values: any, _: string) => ({ ...values }),
        }}
        editable={{ onDelete, onSave }}
        columnsState={{
          persistenceKey: 'pro-table-singe-menu',
          persistenceType: 'localStorage',
          onChange(_: any) {},
        }}
        toolBarRender={() => [
          <Button
            key="button"
            //@ts-ignore
            icon={<PlusOutlined />}
            onClick={() => setFormModal(true)}
            type="primary"
          >
            新建
          </Button>,
        ]}
        scroll={{ x: 1040, y: 'auto' }}
        // scroll={{ y: 'auto' }}
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
      ></ProTable>
      <AddMenus subForm={subForm} openModal={formModal} onStateChange={handleModalStateChange} />
    </>
  );
};
