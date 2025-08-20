import { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Flex } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { type ActionType } from '@ant-design/pro-components';
import { ProTable } from 'components';
import Styled from '@/components/Styled';

import { useParams, useSearchParams } from 'react-router-dom';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import dayjs from 'dayjs';

import type { ModesApi } from './modes/model';
import siteModel from './modes/menu.model';
import SingleTitle from '@/components/SingleTitle';
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
    query.get('yearAndMonth') || dayjs().format('YYYY-MM')
  );
  const [groupId, setGroupId] = useState<number | undefined>(
    Number(teamId) || undefined
  );
  const [_paramName, setparamName] = useState<any>(paramName);
  const [_subcontractorIde, setsubcontractorId] =
    useState<any>('');
  const [_workTypeId, setworkTypeId] = useState<any>(
    query.get('workTypeId')
  );
  const [_jobCategoryId, setjobCategoryId] = useState<any>(
    query.get('jobCategoryId')
  );

  const initColumns = siteModel({ server, month });

  useEffect(() => {}, []);

  return (
    <div className="h-full p-18px">
      <ProTable
        headerTitle={<SingleTitle label="考勤明细" />}
        params={{
          groupId: groupId,
          yearAndMonth: month,
          username: _paramName,
          subcontractorId: _subcontractorIde,
          workTypeId: _workTypeId,
          jobCategoryId: _jobCategoryId,
        }}
        request={async (params: ModesApi.ParamsType) => {
          const list = await A.attendanceDetailList(params);
          const res = list.map((item: any, i: number) => {
            item.workingHours = item.workingHours.toFixed(2);
            return Object.assign(item, ...item.attendances, {
              id: i,
            });
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
        // pagination={{
        //   pageSize: 30,
        // }}
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
                  setparamName('');
                  setsubcontractorId('');
                  setworkTypeId('');
                  setjobCategoryId('');
                  form?.resetFields();
                  setMonth(dayjs().format('YYYY-MM'));
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
                    setMonth(
                      typeof yearAndMonth == 'string'
                        ? yearAndMonth
                        : yearAndMonth.format('YYYY-MM')
                    );
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
          setjobCategoryId('');
          setMonth(undefined);
          setGroupId(undefined);
        }}
        toolBarRender={() => {
          const list = [
            {
              label: '表示没有考勤记录',
              color: '#D6DAE1',
            },
            {
              label: '表示考勤正常',
              color: '#0FC184',
            },
            {
              label: '表示考勤异常',
              color: '#FA8D23',
            },
          ];
          return list.map((item) => {
            return (
              <Flex align="center" className="ml-10px">
                <span
                  className="inline-block w-10px h-10px line-height-10px rd-50% mr-5px"
                  style={{ background: item.color }}
                />
                {item.label}
              </Flex>
            );
          });
        }}
      ></ProTable>
    </div>
  );
};
