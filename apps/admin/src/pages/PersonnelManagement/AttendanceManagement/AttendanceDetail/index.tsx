import { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { type ActionType } from '@ant-design/pro-components';
import { ProTable } from 'components';
import Styled from '@/components/Styled';

import { useParams, useSearchParams } from 'react-router-dom';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import dayjs from 'dayjs';

import type { ModesApi } from './modes/model';
import siteModel from './modes/menu.model';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default () => {
  let query = useQuery();
  let paramName = query.get('username');
  const { server } = useBasicConfiguration();
  const { attendance: A } = server;

  const { teamId } = useParams();
  const [params] = useSearchParams();

  const actionRef = useRef<ActionType>();

  // 示例: 2024-05
  const [month, setMonth] = useState<string | undefined>(
    params.get('searchMonth') || dayjs().format('YYYY-MM')
  );
  const [groupId, setGroupId] = useState<number | undefined>(
    Number(teamId) || undefined
  );
  const [_paramName, setparamName] = useState<any>(paramName);
  const [_subcontractorIde, setsubcontractorId] =
    useState<any>('');
  const [_workTypeId, setworkTypeId] = useState<any>('');

  const initColumns = siteModel({ server, month });

  useEffect(() => {}, []);

  return (
    <>
      <ProTable
        headerTitle={
          <>
            <div>考勤明细</div>
            <Styled.Tooltip>
              红色表示没有考勤记录, 绿色表示考勤正常,
              橙色表示考勤异常
            </Styled.Tooltip>
          </>
        }
        params={{
          groupId: groupId,
          yearAndMonth: month,
          username: _paramName,
          subcontractorId: _subcontractorIde,
          workTypeId: _workTypeId,
        }}
        request={async (params: ModesApi.ParamsType) => {
          const list = await A.attendanceDetailList(params);
          const res = list.map((item: any, i: number) => {
            item.workingHours = item.workingHours.toFixed(2);
            return Object.assign(item, ...item.attendances, {
              id: i,
            });
          });
          // console.log('处理后的表格数据', res);
          // console.log('所有请求参数', params, month);
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
          optionRender: (
            { searchText }: any,
            { form }: any,
            dom: any
          ) => {
            return [
              // dom[0],
              <Button
                key="sub1"
                onClick={() => {
                  setMonth(dayjs().format('YYYY-MM'));
                  setparamName('');
                  setsubcontractorId('');
                  setworkTypeId('');
                  form?.resetFields();
                  form?.setFieldValue('username', '');
                  form?.submit();
                }}
              >
                重置
              </Button>,
              <Button
                type="primary"
                key="sub"
                icon={<SearchOutlined />}
                onClick={() => {
                  const {
                    yearAndMonth,
                    groupId,
                    username,
                    subcontractorId,
                    workTypeId,
                  } = form.getFieldsValue();
                  yearAndMonth &&
                    setMonth(yearAndMonth.format('YYYY-MM'));
                  groupId && setGroupId(groupId);
                  setparamName(username);
                  setsubcontractorId(subcontractorId);
                  setworkTypeId(workTypeId);
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
        onReset={() => {
          setparamName('');
          setMonth(undefined);
          setGroupId(undefined);
        }}
      ></ProTable>
    </>
  );
};
