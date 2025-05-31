import { useRef, useEffect, useState } from 'react';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import { useParams, useSearchParams } from 'react-router-dom';

import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { type ActionType } from '@ant-design/pro-components';
import { ProTable } from 'components';
import Styled from '@/components/Styled';

import type { ModesApi } from './modes/model';
import siteModel from './modes/menu.model';
import dayjs from 'dayjs';

export default () => {
  const { server } = useBasicConfiguration();
  const { attendance: A } = server;
  const { userId: userIdInParams } = useParams();
  const [params] = useSearchParams();

  const [downloadParams, setDownloadParams] = useState<any>({
    name: '',
    beginTime: '',
    endTime: '',
  });

  const initColumns = siteModel({ server });

  const actionRef = useRef<ActionType>();
  const [ifAdd, setIfAdd] = useState<boolean>(false);
  const [date, setDate] = useState<string | undefined>(
    params.get('searchDate') || undefined
  );
  const [userId, setUserId] = useState<number | undefined>(
    Number(userIdInParams) || undefined
  );

  useEffect(() => {}, []);

  return (
    <>
      <ProTable
        headerTitle="考勤记录"
        // params={{ifAdd: ifAdd}}
        params={{
          userId: userId,
          dateTime: date,
        }}
        request={async (params: ModesApi.ParamsType) => {
          const { list, total } = await A.attendanceRecordList({
            beginTime: params.dateTime
              ? dayjs(params.dateTime, 'YYYY-MM-DD')
                  .startOf('date')
                  .format('YYYY-MM-DD HH:mm:ss')
              : dayjs().format('YYYY-MM-DD 00:00:00'),
            endTime: params.dateTime
              ? dayjs(params.dateTime, 'YYYY-MM-DD')
                  .endOf('date')
                  .format('YYYY-MM-DD HH:mm:ss')
              : dayjs().format('YYYY-MM-DD 23:59:59'),
            ...params,
            username: params.name,
          });
          setDownloadParams(params);
          return {
            ...params,
            total: total || 0,
            data: list || [],
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
          optionRender: (
            { searchText }: any,
            { form }: any,
            dom: any
          ) => {
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
          // <div
          //   className="cursor-pointer w-66px h-25px"
          //   onClick={() => {
          //     let id = (Math.random() * 1000000).toFixed(0);
          //     actionRef.current?.addEditRecord(
          //       {
          //         id: id,
          //         name: '超级管理员',
          //         identityCard: '411024199001029098',
          //         enterTime: undefined,
          //         clockDirection: 0,
          //         clockStatus: 1,
          //         temperature: '36.5',
          //       },
          //       { position: 'top', newRecordType: 'dataSource' }
          //     );
          //     actionRef.current?.cancelEditable(id);
          //     // setIfAdd(true)
          //   }}
          // ></div>,

          // console.log('params',params)
          <Styled.ExportButton
            api="exportPersonnelAttendance"
            fileName="考勤导出"
            params={{
              username: downloadParams.name,
              beginTime: downloadParams.beginTime,
              endTime: downloadParams.endTime,
              ...params,
            }}
          />,
        ]}
        scroll={{ x: '1000px', y: 'auto' }}
        columns={[...initColumns]}
      ></ProTable>
    </>
  );
};
