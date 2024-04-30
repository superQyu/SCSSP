import { createElement, useRef, useEffect } from 'react';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@ant-design/icons';
import { type ActionType } from '@ant-design/pro-components';
import { ProTable } from 'components';

import type { ModesApi } from './modes/model';
import siteModel from './modes/menu.model';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

export default () => {
  const { server } = useBasicConfiguration();
  const actionRef = useRef<ActionType>();

  const { attendance: A } = server;

  // 初始化 表格列表项
  const initColumns = siteModel({ server });

  useEffect(() => {}, []);

  return (
    <>
      <ProTable
        headerTitle="考勤明细"
        request={async (params: ModesApi.ParamsType) => {
          const res = await A.attendanceList({ ...params, pageNo: params?.current || 0 });
          res['list'] = res?.list.map((item: ModesApi.ParamsType) => {
            return { ...item, status: `${item.status}` };
          });
          return {
            ...params,
            data: res?.list || [],
            total: res?.totlal || 0,
          } as unknown as ModesApi.pageItemType;
        }}
        actionRef={actionRef}
        columnsState={{
          persistenceKey: 'pro-table-singe-role',
          persistenceType: 'localStorage',
          onChange(_: any) {},
        }}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<DownloadOutlined />}
            onClick={() => {
              console.log('导入数据');
            }}
            type="primary"
          >
            导入
          </Button>,
        ]}
   
        scroll={{ x: 1500, y: 'auto' }}
        columns={[...initColumns]}
      ></ProTable>
    </>
  );
};
