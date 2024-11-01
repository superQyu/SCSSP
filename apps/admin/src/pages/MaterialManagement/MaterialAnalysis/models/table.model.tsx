import { useEffect, useState } from 'react';

import { type ProColumns } from '@ant-design/pro-components';
import { Select, DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import DictSelect from '@/components/DictSelect';

type objJson = Record<string, any>;

type MenusPropsType = {
  server?: objJson;
};

export default ({ server }: MenusPropsType) => {
  const { subContractor, certificate } = server as objJson;

  const columnWidth = 213;

  // 分包单位选择下拉
  const [subcontractorList, setSubcontractorList] = useState([]);
  // 班组长选择下拉
  const [personInfoList, setPersonInfoList] = useState([]);

  useEffect(() => {
    getSelectOptions();
  }, []);

  // 通过接口获取下拉框的内容
  const getSelectOptions = async () => {
    const res1 = await subContractor.getAllSubContractor();
    // console.log('分包商列表', res1);
    const list1 = res1.map((item: any) => {
      return { label: item.realName, value: item.id };
    });
    setSubcontractorList(list1);
    const res2 = await certificate.getPersonInfoList();
    // console.log('班组长列表', res2);
    const list2 = res2.map((item: any) => {
      return { label: item.name, value: item.id };
    });
    setPersonInfoList(list2);
  };

  const columns: ProColumns[] = [
    {
      title: '序号',
      valueType: 'indexBorder',
      dataIndex: 'index',
      fixed: 'left',
      ellipsis: true,
      // width: columnWidth,
      width: 60,
    },
    {
      title: '车牌',
      dataIndex: 'carNo',
      ellipsis: true,
      // width: columnWidth,
      // hideInSearch: true,
      // onCell: (row, rowIndex) => {
      //   if (rowIndex == 0 || (rowIndex && rowIndex % 2 == 0)) {
      //     return { rowSpan: 2 };
      //   } else {
      //     return { rowSpan: 0 };
      //   }
      // },
    },
    {
      title: '重量',
      dataIndex: 'weight',
      ellipsis: true,
      // width: columnWidth,
      hideInSearch: true,
    },
    {
      title: '称重时间',
      dataIndex: 'weighTime',
      ellipsis: true,
      valueType: 'dateTime',
      // width: columnWidth,
      hideInSearch: true,
    },
    {
      // 搜索
      title: '称重时间',
      dataIndex: 'weighTime',
      ellipsis: true,
      valueType: 'dateTimeRange',
      // width: columnWidth,
      // hideInSearch: true,
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
      title: '方向',
      dataIndex: 'direction',
      ellipsis: true,
      // width: columnWidth,
      hideInSearch: true,
      render: (_, record) => {
        return (
          <DictSelect
            dictKey="vehicle_entry_exit"
            value={record.direction}
            type="text"
          />
        );
      },
      renderFormItem: () => {
        return <DictSelect dictKey="vehicle_entry_exit" />;
      },
    },
    {
      title: '净重',
      dataIndex: 'suttleWeight',
      ellipsis: true,
      // width: columnWidth,
      hideInSearch: true,
    },
  ];

  return columns;
};
