import { useRef, useState } from 'react';
import { Button } from 'antd';

import { SearchOutlined, EyeOutlined } from '@ant-design/icons';

import { type ActionType } from '@ant-design/pro-components';
import { ProTable } from 'components';

import type { ModesApi } from './modes/model';
import siteModel from './modes/menu.model';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import DetailForm from './components/detail';
export default () => {
  const { server } = useBasicConfiguration();
  const actionRef = useRef<ActionType>();
  const { vehicle: V } = server;
  const initColumns = siteModel({ server });
  const [subForm, setSubForm] = useState<Record<string, any>>({});
  const [formModal, setFormModal] = useState<boolean>(false);

  return (
    <>
      <ProTable
        headerTitle="车辆智能分析"
        request={async (params: ModesApi.ParamsType) => {
          const { list, total } = await V.vehicleIntelligentList(params);
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
        scroll={{ y: 'auto' }}
        columns={[
          ...initColumns,
          {
            title: '操作',
            key: 'option',
            width: 120,
            valueType: 'option',
            render: (_text: any, record: any, _: any, action: any) => [
              <a
                key="editable"
                onClick={() => {
                  setSubForm(record);
                  setFormModal(true);
                }}
              >
                <EyeOutlined />
                详情
              </a>,
            ],
          },
        ]}
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
      <DetailForm subForm={subForm} openModal={formModal} />
    </>
  );
};
