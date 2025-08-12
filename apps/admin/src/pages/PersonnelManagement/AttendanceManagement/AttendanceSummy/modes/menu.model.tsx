import {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Select, DatePicker } from 'antd';
import { type ProColumns } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import DictSelect from '@/components/DictSelect';

// 路由跳转
import { useRoute } from 'hooks';

type MenusPropsType = {
  server?: any;
};

const MultiYearMonthSelect = forwardRef((props, ref) => {
  const { value, onChange } = props;
  const [selectedValues, setSelectedValues] = useState(
    [dayjs().format('YYYY-MM')] || []
  );

  useImperativeHandle(ref, () => ({
    getValue: () => selectedValues,
    reset: () => setSelectedValues([]),
  }));

  // 监听外部值变化
  useEffect(() => {
    if (value) {
      setSelectedValues([...value]);
    }
  }, [value]);

  // 处理月份选择
  const handleMonthSelect = (date, dateString) => {
    if (selectedValues.includes(dateString)) {
      // 取消选择
      const newValues = selectedValues.filter(
        (v) => v !== dateString
      );
      setSelectedValues(newValues);
      onChange(newValues);
    } else {
      // 添加选择
      const newValues = [...selectedValues, dateString];
      setSelectedValues(newValues);
      onChange(newValues);
    }
  };

  // 渲染已选标签
  const renderTags = () => {
    return (
      <>
        {selectedValues.slice(0, 3).map((val) => (
          <span
            key={val}
            style={{
              marginRight: 8,
              padding: '0 4px',
              backgroundColor: '#f5f5f5',
              borderRadius: 2,
            }}
          >
            {val}
            <a
              onClick={() => handleMonthSelect(null, val)}
              className="ml-5px"
            >
              x
            </a>
          </span>
        ))}
        {selectedValues.length > 3 ? '+1' : ''}
      </>
    );
  };

  return (
    <div style={{ position: 'relative' }}>
      <div
        className="pos-absolute left-5px top-2px bottom-2px flex z-9"
        style={{ alignItems: 'center' }}
      >
        {renderTags()}
      </div>
      <DatePicker.MonthPicker
        placeholder=""
        value={null}
        format=""
        onChange={handleMonthSelect}
        style={{ width: '100%' }}
      />
    </div>
  );
});

export default ({ server }: MenusPropsType) => {
  const { subContractor: S, person: P, group: G } = server;

  const { tabNavigate } = useRoute();
  const [subcontractorList, setSubcontractorList] = useState([]);
  const [laborList, setLaborList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  // 获取当前年月
  const currentMonth = dayjs().format('YYYY-MM');

  const init = async () => {
    const res1 = await S.getAllSubContractor();
    const list1 = res1.map((item: any) => {
      return { label: item.realName, value: item.id };
    });
    setSubcontractorList(list1);

    const { list } = await P.workType({ pageSize: -1 });
    const options = list.map((item: any) => {
      return {
        label: item.name,
        value: item.id,
      };
    });
    setLaborList(options);
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
      render: (text: any, record: any, index: number) => {
        return index + 1;
      },
    },
    {
      title: '单位',
      dataIndex: 'subcontractorId',
      render: (text: any, row) => {
        const obj = Object.fromEntries(
          subcontractorList.map(({ value, label }) => [
            value,
            label,
          ])
        );
        const name = obj[`${text}`];
        return name ? (
          <a
            onClick={() => {
              // action?.startEditable?.(record.id);
              tabNavigate({
                tabName: '考勤明细',
                namePath: `项目人员管理/考勤管理/${row.time}${name}考勤明细`,
                // routePath: `/PM/AttendanceManagement/AttendanceDetail/${row.teamId}?searchMonth=${row.time}`,
                routePath: `/attendance/AttendanceDetail/${row.workTypeId}?searchMonth=${row.time}&subcontractorId=${row.subcontractorId}`,
                activeMenu:
                  '/PM/AttendanceManagement/AttendanceDetail',
              });
            }}
          >
            {name}
          </a>
        ) : (
          <span>-</span>
        );
      },
      // render: (text: any) => {
      //   const obj = Object.fromEntries(
      //     subcontractorList.map(({ value, label }) => [
      //       value,
      //       label,
      //     ])
      //   );
      //   return <span>{obj[text] || '-'}</span>;
      // },
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
      title: '劳务工种',
      dataIndex: 'workTypeId',
      // render: (text: any) => {
      //   const obj = Object.fromEntries(laborList.map(({ value, label }) => [value, label]));
      //   return <span>{obj[text] || '-'}</span>;
      // },
      // render: (text: any, record) => {
      //   return <span>{record.workTypeName || '-'}</span>;
      // },
      render: (text: any, row) => {
        return (
          <a
            key="editable"
            onClick={() => {
              // action?.startEditable?.(record.id);
              const {
                workerType,
                time,
                workTypeName,
                workTypeId,
              } = row;
              let routePath = `/attendance/AttendanceDetail/${workTypeId}?yearAndMonth=${
                row.time
              }&${
                workerType == '1'
                  ? 'workTypeId'
                  : workerType == '2'
                  ? 'jobCategoryId'
                  : 'otherId'
              }=${row.workTypeId}`;

              tabNavigate({
                tabName: `${workTypeName}考勤明细`,
                namePath: `项目人员管理/考勤管理/${time}${workTypeName}考勤明细`,
                // routePath: `/PM/AttendanceManagement/AttendanceDetail/${row.teamId}?searchMonth=${row.time}`,
                routePath,
                activeMenu:
                  '/PM/AttendanceManagement/AttendanceDetail',
              });
            }}
          >
            {row.workTypeName || '-'}
          </a>
        );
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
      title: '管理工种',
      dataIndex: 'jobCategoryId',
      renderFormItem: () => {
        return <DictSelect dictKey={'pm_job_category'} />;
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
      hideInSearch: true,
      hideInTable: true,
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
    // {
    //   hideInTable: true,
    //   title: '时间范围',
    //   valueType: 'dateTimeRange',
    //   search: {
    //     transform: (value) => {
    //       return {
    //         beginTime: value[0],
    //         endTime: value[1],
    //       };
    //     },
    //   },
    // },
    {
      hideInTable: true,
      title: '年月',
      dataIndex: 'yAndMs',
      formItemProps: {
        initialValue: [dayjs().format('YYYY-MM')],
      },
      renderFormItem: (_, { fieldProps }) => {
        return <MultiYearMonthSelect {...fieldProps} />;
      },
      search: {
        transform: (value) => {
          return { yAndMs: value ? value.join(',') : '' };
        },
      },
    },

    {
      hideInSearch: true,
      title: '年月',
      valueType: 'dateMonth',
      dataIndex: 'time',
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
