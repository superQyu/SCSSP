import { useRef, useState } from 'react';
import { type ActionType } from '@ant-design/pro-components';
import { Button, message, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { ProTable } from 'components';
import SingleTitle from '@/components/SingleTitle';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import DictTag from '@/components/DictSelect/DictTag';
import { ToString } from '@/utils/transform';

export default () => {
  const { server } = useBasicConfiguration();
  const { subContractor } = server;
  const initColumns: ProColumns[] = [
    {
      title: '序号',
      valueType: 'indexBorder',
      dataIndex: 'index',
      fixed: 'left',
      ellipsis: true,
      width: 80,
      render: (text: any, record: any, index: number) => {
        return index + 1;
      },
    },

    {
      title: '故障类型',
      dataIndex: 'corpType',
      ellipsis: true,

      render: (_, record) => {
        return (
          <DictTag
            value={record.corpType}
            dictKey="gate_status"
          />
        );
      },
      renderFormItem: () => {
        // return <DictTag dictKey="gate_status" />;
      },
    },
    {
      title: '发生时间',
      dataIndex: 'isAlwaysOpen',
    },
    {
      title: '恢复时间',
      dataIndex: 'isAlwaysOpen',
    },
  ];
  const actionRef = useRef<ActionType>();

  const [ifAllOpen, setIfAllOpen] = useState(true);

  return (
    <ProTable
      actionRef={actionRef}
      headerTitle={<SingleTitle label="历史故障记录" />}
      columns={[...initColumns]}
      request={async (params = {}) => {
        const res = await subContractor.getSubContractorList(
          params
        );
        res.list = res.list.map((item: any) => {
          item.subcontractorType = ToString(
            item.subcontractorType
          );
          item.corpType = ToString(item.corpType);
          item.overallMerit = ToString(item.overallMerit);
          item.isConformity = ToString(item.isConformity);
          return item;
        });
        setLoading(false);
        return {
          data: res.list,
          total: res.total,
        };
      }}
      scroll={{ y: 'auto' }}
      search={false}
      toolBarRender={() => []}
      pagination={{}}
    ></ProTable>
  );
};
