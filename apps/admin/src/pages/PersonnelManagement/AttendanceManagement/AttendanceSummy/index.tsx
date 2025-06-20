import { useRef, useEffect } from 'react';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { type ActionType } from '@ant-design/pro-components';
import { ProTable } from 'components';

import type { ModesApi } from './modes/model';
import siteModel from './modes/menu.model';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import SingleTitle from '@/components/SingleTitle';
export default () => {
  const { server } = useBasicConfiguration();
  const actionRef = useRef<ActionType>();

  const { attendance: A } = server;

  // 初始化 表格列表项
  const initColumns = siteModel({ server });

  useEffect(() => { }, []);

  return (
    <div className='h-full m-18px'>
      <ProTable
        headerTitle={<SingleTitle label="考勤汇总" />}
        request={async (params: ModesApi.ParamsType) => {
          const { list, totlal } = await A.attendanceList(params);
          const result: any = [];
          const obj: any = {}
          list.forEach((item: any) => {
            if (obj.hasOwnProperty(item.subcontractorName)) {
              const index = obj[item.subcontractorName]
              result[index].children.push({
                ...item,
                subcontractorId: '',
                id: `${item.subcontractorId}_${result[index].children.length}`
              })
              let workerMembers = 0
              let attendanceNumbers = 0
              let attendanceHours = 0
              result[index].children.forEach(item => {
                workerMembers += item.workerMembers
                attendanceNumbers += item.attendanceNumbers
                attendanceHours += item.attendanceHours
              })
              result[index].workerMembers = workerMembers
              result[index].attendanceNumbers = attendanceNumbers
              result[index].attendanceHours = attendanceHours
            } else {
              const index = result.length
              const { subcontractorId,
                workerMembers,
                attendanceNumbers,
                attendanceHours } = item
              obj[item.subcontractorName] = index
              result[index] = {
                id: index,
                subcontractorId,
                workerMembers,
                attendanceNumbers,
                attendanceHours,
                children: [{
                  ...item,
                  subcontractorId: '',
                  id: `${subcontractorId}_0`
                }]
              }

            }
          })
          console.log(result)
          return {
            ...params,
            data:
              result,
            total: totlal || 0,
          };
        }}
        actionRef={actionRef}
        columnsState={{
          persistenceKey: 'pro-table-singe-role',
          persistenceType: 'localStorage',
          onChange(_: any) { },
        }}
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
        scroll={{ x: '1500', y: 'auto' }}
        columns={[...initColumns]}
      ></ProTable>
    </div>
  );
};
