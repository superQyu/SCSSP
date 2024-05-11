import { useRef, useEffect } from 'react';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { type ActionType } from '@ant-design/pro-components';
import { ProTable } from 'components';
import siteModel from './modes/menu.model';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

export default () => {
  const { server } = useBasicConfiguration();
  const actionRef = useRef<ActionType>();
  const { vehicle: V } = server;
  const initColumns = siteModel({ server });

  return (
    <>
      <ProTable
        headerTitle="车辆进出记录"
        request={async (params: any) => {
          const { list, total } = await V.vehicleRecord(params);
          return {
            ...params,
            data: list || [],
            total: total || 0,
          };
        }}
        actionRef={actionRef}
        columnsState={{
          persistenceKey: 'pro-table-singe-role',
          persistenceType: 'localStorage',
          onChange(_: any) {},
        }}
        scroll={{ x: 'auto', y: 'auto' }}
        columns={[...initColumns]}
        pagination={{
          pageSize: 30,
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
      ></ProTable>
    </>
  );
};
