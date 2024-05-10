import { useRef, useEffect ,useState} from 'react';
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
  const { attendance: A } = server;
  const [month, setMonth] = useState<Date>();

  const initColumns = siteModel({ server, month });

  useEffect(() => {}, []);

  return (
    <>
      <ProTable
        headerTitle="考勤明细"
        request={async (params: ModesApi.ParamsType) => {
          const list = await A.attendanceDetailList(params);
          const res = list.map((item: any, i: number) => {
            item.workingHours = item.workingHours.toFixed(2);
            return Object.assign(item, ...item.attendances, { id: i });
          });
          return {
            ...params,
            data: res || [],
          };
        }}
        actionRef={actionRef}
        columnsState={{
          persistenceKey: 'pro-table-singe-role',
          persistenceType: 'localStorage',
          onChange(_: any) {},
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
                onClick={() => {
                  const { yearAndMonth } = form.getFieldsValue();
                  yearAndMonth && setMonth(yearAndMonth.format('YYYY-MM'));
                  form?.submit();
                }}
              >
                {searchText}
              </Button>,
            ];
          },
        }}
        scroll={{ x: '1800px', y: 'auto' }}
        columns={[...initColumns]}
      ></ProTable>
    </>
  );
};
