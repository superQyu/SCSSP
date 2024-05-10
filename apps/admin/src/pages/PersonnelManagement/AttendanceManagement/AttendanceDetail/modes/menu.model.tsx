import { useState, useEffect } from 'react';
import { Select } from 'antd';
import { type ProColumns } from '@ant-design/pro-components';
import dayjs from 'dayjs';

type MenusPropsType = {
  server?: any;
  month?: Date;
};

export default ({ month = new Date(), server }: MenusPropsType) => {
  const { subContractor: S, person: P, group: G } = server;

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

    const res2 = await G.getGroupList();

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

  const startOfMonth = dayjs(month).startOf('month');
  const endOfMonth = dayjs(month).endOf('month');
  const daysInMonth = endOfMonth.diff(startOfMonth, 'days') + 1;
  const days: ProColumns[] = [...Array(daysInMonth).keys()].map((i: number) => {
    const day = i + 1;
    return {
      width: day == 1 ? 70 : 50,
      hideInSearch: true,
      title: day == 1 ? '日期/01' : day.toString().padStart(2, '0'),
      dataIndex: day.toString().padStart(2, '0'),
      align: 'center',
      render: (dom) =>
        dom == 1 ? (
          <span>{dom}</span>
        ) : (
          <span className="inline-block color-#FF0000 w-30px h-30px line-height-30px bg-#ffcccc rd-50%">
            0
          </span>
        ),
    };
  });

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
      hideInTable: true,
      title: '分包单位',
      dataIndex: 'subcontractorId',
      renderFormItem: () => {
        return <Select placeholder="请选择分包单位" options={subcontractorList} allowClear />;
      },
    },
    {

      hideInTable: true,
      title: '劳务工种',
      dataIndex: 'workTypeId',
      render: (text: any) => {
        const obj = Object.fromEntries(laborList.map(({ value, label }) => [value, label]));
        return <span>{obj[text] || '-'}</span>;
      },
      renderFormItem: () => {
        return <Select placeholder="请选择劳务工种" options={laborList} allowClear />;
      },
    },
    {

      hideInTable: true,
      title: '班组名称',
      dataIndex: 'groupId',
      renderFormItem: () => {
        return <Select placeholder="请选择班组名称" options={groupList} allowClear />;
      },
    },
    {
      hideInTable: true,
      title: '年月',
      valueType: 'dateMonth',
      dataIndex: 'yearAndMonth',
    },
    {
      width: 100,
      title: '人员名称',
      dataIndex: 'username',
      fixed: 'left',
      align: 'center',
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
      title: '工日(天)',
      hideInSearch: true,
      dataIndex: 'workingHours',
      fixed: 'left',
      align: 'center',
    },
    ...days,
  ];

  return columns;
};
