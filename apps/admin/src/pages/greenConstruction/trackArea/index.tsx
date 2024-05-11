import { useRef, useEffect } from 'react';
import { Button } from 'antd';

import { SearchOutlined } from '@ant-design/icons';
import { type ActionType } from '@ant-design/pro-components';
import { ProTable } from 'components';

import type { ModesApi } from './modes/model';
import siteModel from './modes/menu.model';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

export default () => {
  const { server } = useBasicConfiguration();
  const actionRef = useRef<ActionType>();
  const { vehicle: V } = server;
  const initColumns = siteModel({ server });

  useEffect(() => {}, []);

  return (
    <>
      <ProTable
        headerTitle="轨迹区域管理"
        request={async (params: ModesApi.ParamsType) => {
          const res = await V.vehicleTrackList({ ...params, pageNo: params?.current || 0 });
          console.log('list', res);
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
        scroll={{  y: 'auto' }}
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
