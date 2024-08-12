import { useState, useEffect } from 'react';
import { Select } from 'antd';
import { type ProColumns } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import DictSelect from '@/components/DictSelect';

type MenusPropsType = {
  server?: any;
};

export default ({ server }: MenusPropsType) => {
  // const { subContractor: S, person: P, group: G } = server;

  // const [subcontractorList, setSubcontractorList] = useState([]);
  // const [laborList, setLaborList] = useState([]);
  // const [groupList, setGroupList] = useState([]);

  // const init = async () => {
  //   const res1 = await S.getAllSubContractor();
  //   const list1 = res1.map((item: any) => {
  //     return { label: item.realName, value: item.id };
  //   });
  //   setSubcontractorList(list1);

  //   const { list } = await P.workType();
  //   const options = list.map((item: any) => {
  //     return {
  //       label: item.name,
  //       value: item.id,
  //     };
  //   });
  //   setLaborList(options);

  //   const res2 = await G.getGroupList();

  //   const list2 = res2.list.map((item: any) => {
  //     return {
  //       label: item.teamName,
  //       value: item.id,
  //     };
  //   });
  //   setGroupList(list2);
  // };

  // useEffect(() => {
  //   init();
  // }, []);
  const columns: ProColumns[] = [
    {
      width: 60,
      hideInSearch: true,
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
    },
    // {
    //   hideInTable: true,
    //   title: '分包单位',
    //   dataIndex: 'subcontractorId',
    //   renderFormItem: () => {
    //     return <Select placeholder="请选择分包单位" options={subcontractorList} allowClear />;
    //   },
    // },
    // {
    //   hideInTable: true,
    //   title: '劳务工种',
    //   dataIndex: 'workTypeId',
    //   render: (text: any) => {
    //     const obj = Object.fromEntries(laborList.map(({ value, label }) => [value, label]));
    //     return <span>{obj[text] || '-'}</span>;
    //   },
    //   renderFormItem: () => {
    //     return <Select placeholder="请选择劳务工种" options={laborList} allowClear />;
    //   },
    // },
    // {
    //   hideInTable: true,
    //   title: '班组名称',
    //   dataIndex: 'groupId',
    //   renderFormItem: () => {
    //     return <Select placeholder="请选择班组名称" options={groupList} allowClear />;
    //   },
    // },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '时间范围',
      valueType: 'dateTimeRange',
      dataIndex: 'dateTimeRange',
      hideInTable: true,
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
      width: 180,
      hideInSearch: true,
      title: '证件号码',
      dataIndex: 'identityCard',
    },

    {
      width: 150,
      hideInSearch: true,
      title: '打卡时间',
      render: (_, record) => (
        <>
          {dayjs(record.leaveTime || record.enterTime).format(
            'YYYY-MM-DD hh:mm:ss'
          )}
        </>
      ),
    },
    {
      hideInSearch: true,
      title: '打卡方向',
      render: (_, record) => {
        return (
          <DictSelect
            type="text"
            dictKey={'pm_clock_direction'}
            value={record.clockDirection + ''}
          />
        );
      },
    },
    {
      hideInSearch: true,
      title: '打卡状态',
      render: (_, record) => {
        return (
          <DictSelect
            type="text"
            dictKey={'pm_clock_status'}
            value={record.clockStatus + ''}
          />
        );
      },
    },
    {
      hideInSearch: true,
      title: '体温',
      dataIndex: 'temperature',
    },

    {
      hideInSearch: true,
      title: '酒精含量',
      dataIndex: 'alcoholContent',
    },

    {
      hideInSearch: true,
      title: '血压',
      dataIndex: 'bloodPressure',
    },
    {
      hideInSearch: true,
      title: '血氧',
      dataIndex: 'bloodOxygen',
    },
  ];

  return columns;
};
