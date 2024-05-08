import { createElement, useRef, useEffect, useState } from 'react';
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
  const [month, setMonth] = useState<Date>();
  const { attendance: A } = server;

  // 初始化 表格列表项
  const initColumns = siteModel({ server, month });

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
        search={{
          labelWidth: 'auto',
          optionRender: ({ searchText }: any, { form }: any, dom: any) => {
            return [
              dom[0],
              <Button
                type="primary"
                key="sub"
                icon={<SearchOutlined />}
                onClick={() => {
                  const { createTime } = form.getFieldsValue();
                  createTime && setMonth(createTime.format('YYYY-MM'));
                  form?.submit();
                }}
              >
                {searchText}
              </Button>,
            ];
          },
        }}
        scroll={{ x: 1500, y: 'auto' }}
        columns={[...initColumns]}
      ></ProTable>  
    </>
  );
};
