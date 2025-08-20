import { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Flex, Space } from 'antd';
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
import tip from '@/assets/images/attendance/tip.png';
import warning from '@/assets/images/attendance/warning.png';
import normal from '@/assets/images/attendance/normal.png';
import styled from 'styled-components';

import EditDialog from './components/editdialog';

const CustomDiv = styled.div`
  .ant-pro-table-list-toolbar-right {
    flex: 2;
  }
`;

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

  const [dialogVisible, setDialogVisible] =
    useState<boolean>(false);

  // 修改表单打开关闭状态
  const handleModalStateChange = async (state: boolean) => {
    console.log('state', state);
    setDialogVisible(state);
    await actionRef.current?.reload();
  };
  const initColumns = siteModel({
    server,
    month,
    callback: () => handleModalStateChange(true),
  });

  useEffect(() => {}, []);

  return (
    <CustomDiv className="h-full p-18px ">
      <ProTable
        headerTitle={
          <>
            <Space size={15}>
              <SingleTitle label="考勤明细" />
              <div className="color-#4eb5e6 font-size-14px">
                当月应出勤人数： XX
              </div>
              <div className="color-#4eb5e6 font-size-14px">
                实际出勤人数： XX
              </div>
              <div className="color-#4eb5e6 font-size-14px">
                今日出勤人数： XX
              </div>
            </Space>
          </>
        }
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
        pagination={{}}
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
        scroll={{ y: 'auto' }}
        columns={[...initColumns]}
        onReset={() => {
          setparamName('');
          setjobCategoryId('');
          setMonth(undefined);
          setGroupId(undefined);
        }}
        toolBarRender={() => {
          return (
            <Space className="">
              <div
                style={{
                  lineHeight: '30px',
                  paddingLeft: '30px',
                  background: `url(${tip}) no-repeat left`,
                  backgroundSize: 'auto 30px',
                }}
              >
                提示： 点击考勤时长可查看当天考勤详情。
              </div>
              <div
                style={{
                  lineHeight: '30px',
                  paddingLeft: '25px',
                  background: `url(${warning}) no-repeat left`,
                  backgroundSize: 'auto 20px',
                }}
              >
                表示该天考勤数据异常。
              </div>
              <div
                style={{
                  lineHeight: '30px',
                  paddingLeft: '25px',
                  background: `url(${normal}) no-repeat left`,
                  backgroundSize: 'auto 20px',
                }}
              >
                表示今天有考勤。
              </div>
              <div>空白单元格表示该天无考勤数据</div>
            </Space>
          );
        }}
      ></ProTable>

      <EditDialog
        key={`${dialogVisible}`}
        openModal={dialogVisible}
        onStateChange={handleModalStateChange}
      />
    </CustomDiv>
  );
};
