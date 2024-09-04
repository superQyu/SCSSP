import { useState, useEffect } from 'react';
import { Select } from 'antd';
import { type ProColumns } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
// 路由跳转
import { useRoute } from 'hooks';

type MenusPropsType = {
  server?: any;
};

export default ({ server }: MenusPropsType) => {
  const { subContractor: S, person: P, group: G } = server;

  const { tabNavigate } = useRoute();
  const [subcontractorList, setSubcontractorList] = useState([]);
  const [laborList, setLaborList] = useState([]);
  const [groupList, setGroupList] = useState([]);

  const init = async () => {
    const res1 = await S.getAllSubContractor();
    const list1 = res1.map((item: any) => {
      return { label: item.realName, value: item.id };
    });
    setSubcontractorList(list1);

    const { list } = await P.workType();
    const options = list.map((item: any) => {
      return {
        label: item.name,
        value: item.id,
      };
    });
    setLaborList(options);

    const res2 = await G.getGroupList({pageSize: '100'});

    const list2 = res2.list.map((item: any) => {
      return {
        label: item.teamName,
        value: item.id,
      };
    });
    setGroupList(list2);
  };

  useEffect(() => {
    init();
  }, []);

  const columns: ProColumns[] = [
    {
      width: 60,
      hideInSearch: true,
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
    },
    {
      title: '分包单位',
      dataIndex: 'subcontractorId',
      render: (text: any) => {
        const obj = Object.fromEntries(
          subcontractorList.map(({ value, label }) => [
            value,
            label,
          ])
        );
        return <span>{obj[text] || '-'}</span>;
      },
      renderFormItem: () => {
        return (
          <Select
            placeholder="请选择分包单位"
            options={subcontractorList}
            allowClear
          />
        );
      },
    },
    {
      title: '劳务工种',
      dataIndex: 'workTypeId',
      // render: (text: any) => {
      //   const obj = Object.fromEntries(laborList.map(({ value, label }) => [value, label]));
      //   return <span>{obj[text] || '-'}</span>;
      // },
      render: (text: any, record) => {
        return <span>{record.workTypeName || '-'}</span>;
      },
      renderFormItem: () => {
        return (
          <Select
            placeholder="请选择劳务工种"
            options={laborList}
            allowClear
          />
        );
      },
    },
    {
      hideInTable: true,
      title: '班组名称',
      dataIndex: 'groupId',
      renderFormItem: () => {
        return (
          <Select
            placeholder="请选择班组名称"
            options={groupList}
            allowClear
          />
        );
      },
    },
    {
      hideInSearch: true,
      title: '班组名称',
      dataIndex: 'teamId',
      // render: (text: any) => {
      //   const obj = Object.fromEntries(
      //     groupList.map(({ value, label }) => [value, label])
      //   );
      //   return <span>{obj[text] || '-'}</span>;
      // },
      render: (text: any, row) => {
        return (
          <a
            key="editable"
            onClick={() => {
              // action?.startEditable?.(record.id);
              tabNavigate({
                tabName: '考勤明细',
                namePath: `项目人员管理/考勤管理/${row.time}${row.teamName}考勤明细`,
                // routePath: `/PM/AttendanceManagement/AttendanceDetail/${row.teamId}?searchMonth=${row.time}`,
                routePath: `/attendance/AttendanceDetail/${row.teamId}?searchMonth=${row.time}`,
                activeMenu:
                  '/PM/AttendanceManagement/AttendanceDetail',
              });
            }}
          >
            {row.teamName || '-'}
          </a>
        );
      },
    },
    {
      hideInTable: true,
      title: '时间范围',
      valueType: 'dateTimeRange',
      search: {
        transform: (value) => {
          return {
            beginTime: value[0],
            endTime: value[1],
          };
        },
      },
    },
    {
      hideInSearch: true,
      title: '年月',
      dataIndex: 'time',
      render: (_, record) => (
        <>{dayjs(record.time).format('YYYY-MM')}</>
      ),
    },
    {
      hideInSearch: true,
      title: '人数',
      dataIndex: 'workerMembers',
    },
    {
      hideInSearch: true,
      title: '总出勤',
      dataIndex: 'attendanceNumbers',
    },
    {
      hideInSearch: true,
      title: '总工时',
      dataIndex: 'attendanceHours',
      render: (text: any) => <>{text ? text.toFixed(2) : '-'}</>,
    },
  ];

  return columns;
};
