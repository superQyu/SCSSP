import { createElement, cloneElement, useRef, useState, useEffect } from 'react';
import { Button, message } from 'antd';
import { PlusOutlined, SearchOutlined, RedoOutlined } from '@ant-design/icons';

import { type ActionType } from '@ant-design/pro-components';
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

  const [subForm, _] = useState<Record<string, any>>({});
  const [formModal, setFormModal] = useState<boolean>(false);

  //  api server
  const { menus: M, sites: S } = server;
  const { PLATFORMID } = config as Record<string, any>;

  // 修改状态
  const handleModalStateChange = async (state: boolean) => {
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

  // 保存save
  const onSave = async (params: any) => {
    // 更新行数据
    const res = await M.updateMenu(JSON.parse(JSON.stringify({ ...params })) as ColumnsParamsProps);
    return res;
  };

  useEffect(() => {}, []);

  return (
    <>
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
        columns={initColumns}
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
            icon={createElement(PlusOutlined)}
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
                icon={createElement(SearchOutlined)}
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
