import { useRef, useState, useEffect } from 'react';
import { Button, message, Modal, Alert } from 'antd';

import { SearchOutlined } from '@ant-design/icons';

import { type ActionType } from '@ant-design/pro-components';
import { ProTable } from 'components';

// 站点表格模型
import type { ModesApi } from './modes/model';
import siteModel, { type ColumnsParamsProps } from './modes/menu.model';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

export default () => {
  const { server } = useBasicConfiguration();
  const actionRef = useRef<ActionType>();

  //  api server
  const { menus: M, systemRole: SR } = server;

  // 初始化 表格列表项
  const initColumns = siteModel({ server });

  useEffect(() => {}, []);

  return (
    <>
      <ProTable
        headerTitle="考勤记录"
        request={async (params: ModesApi.ParamsType) => {
          const res = await SR.roleList({ ...params, pageNo: params?.current || 0 });
          // 指定字段类型转换
          res['list'] = res?.list.map((item: ModesApi.ParamsType) => {
            return { ...item, status: `${item.status}` };
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
        columnsState={{
          persistenceKey: 'pro-table-singe-role',
          persistenceType: 'localStorage',
          onChange(_: any) {},
        }}
        // toolBarRender={() => [
        //   // <Button
        //   //   key="button"
        //   //   icon={PlusOutlined}
        //   //   onClick={() => setFormModal('addRole')}
        //   //   type="primary"
        //   // >
        //   //   新建
        //   // </Button>,
        // ]}

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
        scroll={{ x: '9300px' }}
        columns={[...initColumns]}
      ></ProTable>
    </>
  );
};
