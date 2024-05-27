import { useRef, useEffect } from 'react';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { type ActionType } from '@ant-design/pro-components';
import { ProTable } from 'components';

import type { ModesApi } from './modes/model';
import siteModel from './modes/menu.model';

import Styled from '@/components/Styled';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

export default () => {
  const { server } = useBasicConfiguration();
  const actionRef = useRef<ActionType>();
  const { attendance: A } = server;
  const initColumns = siteModel({ server });

  useEffect(() => {}, []);

  return (
    <>
      <ProTable
        headerTitle="考勤记录"
        request={async (params: ModesApi.ParamsType) => {
          const { list, total } = await A.attendanceRecordList(params);
          return {
            ...params,
            total: total || 0,
            data:
              list.map((item: any, index: number) => {
                return { ...item, id: index };
              }) || [],
          };
        }}
        actionRef={actionRef}
        columnsState={{
          persistenceKey: 'pro-table-singe-role',
          persistenceType: 'localStorage',
          onChange(_: any) {},
        }}
        pagination={{
          pageSize: 20,
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
                onClick={() => form?.submit()}
              >
                {searchText}
              </Button>,
            ];
          },
        }}
        toolBarRender={() => [
          <Styled.UploadButton api="exportPersonnelAttendance" fileName="考勤导出" />,
        ]}
        scroll={{ x: '1000px', y: 'auto' }}
        columns={[...initColumns]}
      ></ProTable>
    </>
  );
};
