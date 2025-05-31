import { useState, useEffect } from 'react';
import { Select } from 'antd';
import { type ProColumns } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import { useSearchParams,  } from 'react-router-dom';
import { useRoute } from 'hooks';

type MenusPropsType = {
  server?: any;
  // month?: Date;
  month?: string;
};

export default ({
  month: searchMonth,
  server,
}: MenusPropsType) => {
  const { tabNavigate } = useRoute();
  const [params] = useSearchParams();

  const { subContractor: S, person: P, group: G } = server;

  const [subcontractorList, setSubcontractorList] = useState([]);
  const [laborList, setLaborList] = useState([]);
  const [groupList, setGroupList] = useState([]);

  const init = async () => {
    const res1 = await S.getAllSubContractor();
    const list1 = res1.map((item: any) => {
      return { label: item.realName, value: `${item.id}` };
    });

    setSubcontractorList(list1);

    const { list } = await P.workType();
    const options = list.map((item: any) => {
      return {
        label: item.name,
        value: `${item.id}`,
      };
    });
    setLaborList(options);

    // const res2 = await G.getGroupList({ pageSize: '100' });

    // const list2 = res2.list.map((item: any) => {
    //   return {
    //     label: item.teamName,
    //     value: item.id,
    //   };
    // });
    // setGroupList(list2);
  };

  useEffect(() => {
    init();
  }, []);

  const startOfMonth = dayjs(searchMonth, 'YYYY-MM').startOf(
    'month'
  );
  const endOfMonth = dayjs(searchMonth, 'YYYY-MM').endOf(
    'month'
  );

  const daysInMonth = endOfMonth.diff(startOfMonth, 'days') + 1;
  const days: ProColumns[] = [...Array(daysInMonth).keys()].map(
    (i: number) => {
      // 0~30
      // console.log('当前日期', i)
      const day = i + 1;
      const date = `${searchMonth}-${day
        .toString()
        .padStart(2, '0')}`;
      // console.log('当前日期', date);
      return {
        width: day == 1 ? 70 : 50,
        hideInSearch: true,
        title:
          day == 1 ? '日期/01' : day.toString().padStart(2, '0'),
        dataIndex: date,
        align: 'center',
        // render: (dom) =>
        //   dom == 1 ? (
        //     <span>{dom}</span>
        //   ) : (
        //     <span className="inline-block color-#FF0000 w-30px h-30px line-height-30px bg-#ffcccc rd-50%">
        //       0
        //     </span>
        //   ),
        render: (dom: any, row) => {
          let color;
          switch (dom) {
            // 考勤正常(进出场均有)
            case 1:
              color = '#BAFD8D';
              break;
            // 考勤异常(进出场只有一端)
            case 2:
              color = '#F6C94D';
              break;
            // 没有考勤数据(没有进出场)
            default:
              // color = '#FF0000';
              color = '#ffcccc';
              break;
          }
          return (
            <a
              onClick={() => {
                tabNavigate({
                  tabName: '考勤记录',
                  namePath: `项目人员管理/考勤记录/${row.username}${date}考勤记录`,
                  routePath: `/attendance/AttendanceRecord/${row.userId}?searchDate=${date}`,
                  activeMenu:
                    '/PM/AttendanceManagement/AttendanceRecord',
                });
              }}
            >
              <span
                className="inline-block w-30px h-30px line-height-30px rd-50%"
                style={{ background: color }}
              />
            </a>
          );
        },
      };
    }
  );

  const columns: ProColumns[] = [
    {
      width: 60,
      hideInSearch: true,
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      fixed: 'left',
      align: 'center',
    },
    {
      width: 100,
      title: '人员名称',
      dataIndex: 'username',
      fixed: 'left',
      align: 'center',
    },
    {
      hideInTable: true,
      title: '年月',
      valueType: 'dateMonth',
      dataIndex: 'yearAndMonth',
    },

    {
      hideInTable: true,
      title: '单位',
      dataIndex: 'subcontractorId',
      renderFormItem: () => {
        return (
          <Select
            placeholder="请选择单位"
            options={subcontractorList}
            allowClear
          />
        );
      },
    },
    {
      hideInTable: true,
      title: '劳务工种',
      dataIndex: 'workTypeId',
      render: (text: any) => {
        const obj = Object.fromEntries(
          laborList.map(({ value, label }) => [value, label])
        );
        return <span>{obj[text] || '-'}</span>;
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
      hideInSearch: true,
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
      width: 100,
      hideInSearch: true,
      title: '出勤(天)',
      dataIndex: 'attendanceDays',
      fixed: 'left',
      align: 'center',
    },
    {
      width: 100,
      title: '工时(小时)',
      hideInSearch: true,
      dataIndex: 'workingHours',
      fixed: 'left',
      align: 'center',
    },
    ...days,
  ];

  return columns;
};
