import { useEffect, useState } from 'react';

import { type ProColumns } from '@ant-design/pro-components';
import { Select, Button } from 'antd';
import DictSelect from '@/components/DictSelect';

type objJson = Record<string, any>;

type MenusPropsType = {
  server?: objJson;
};

export default ({ server }: MenusPropsType) => {
  const { subContractor, certificate } = server as objJson;

  const columnWidth = 160;

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
      title: '流程编号',
      dataIndex: 'id',
      ellipsis: true,
      width: 300,
      hideInSearch: true,
    },
    {
      title: '流程名称',
      dataIndex: 'name',
      ellipsis: true,
      width: columnWidth,
    },
    {
      title: '流程分类',
      dataIndex: 'category',
      ellipsis: true,
      width: columnWidth,
      // hideInSearch: true,
      render: (text, record) => {
        return (
          <DictSelect
            value={record.category}
            type="text"
            dictKey="bpm_model_category"
            isTag
          />
        );
      },
      renderFormItem: () => {
        return <DictSelect dictKey="bpm_model_category" />;
      },
    },
    {
      title: '当前审批任务',
      dataIndex: 'tasks',
      ellipsis: true,
      width: columnWidth,
      hideInSearch: true,
      render: (_, record) => {
        return record.tasks.map((item: any) => (
          <Button type="link">{item.name}</Button>
        ));
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      ellipsis: true,
      width: columnWidth,
      // hideInSearch: true,
      render: (text, record) => {
        return (
          <DictSelect
            value={record.status}
            type="text"
            dictKey="bpm_process_instance_status"
            isTag
          />
        );
      },
      renderFormItem: () => {
        return (
          <DictSelect dictKey="bpm_process_instance_status" />
        );
      },
    },
    {
      title: '结果',
      dataIndex: 'result',
      ellipsis: true,
      width: columnWidth,
      // editable: false,
      render: (text, record) => {
        return (
          <DictSelect
            value={record.result}
            type="text"
            dictKey="bpm_process_instance_result"
            isTag
          />
        );
      },
      renderFormItem: () => {
        return (
          <DictSelect dictKey="bpm_process_instance_result" />
        );
      },
    },
    {
      title: '提交时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      ellipsis: true,
      width: 180,
      hideInSearch: true,
    },
    {
      title: '提交时间的搜索',
      dataIndex: 'createTime',
      valueType: 'dateTimeRange',
      ellipsis: true,
      width: 180,
      hideInTable: true,
      // search: {
      //   transform: (value) => {
      //     return {
      //       beginTime: value[0],
      //       endTime: value[1],
      //     };
      //   },
      // },
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      valueType: 'dateTime',
      ellipsis: true,
      width: 180,
      hideInSearch: true,
    },
  ];

  return columns;
};
