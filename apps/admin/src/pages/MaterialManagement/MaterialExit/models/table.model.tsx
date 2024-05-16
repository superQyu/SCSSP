import { useEffect, useState } from 'react';

import { type ProColumns } from '@ant-design/pro-components';
import { Select } from 'antd';

type objJson = Record<string, any>;

type MenusPropsType = {
  server?: objJson;
};

export interface ColumnsParamsProps extends objJson {
  subcontractorType: string;
  realName: string;
  corpCode: string;
  legalRepresentative: string;
  registeredCapital: string;
  unitAddress: string;
  principal: string;
  principalTel: string;
}

export default ({ server }: MenusPropsType) => {
  const { subContractor, certificate } = server as objJson;

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
      ellipsis: true,
    },
    {
      title: '物料编号',
      dataIndex: 'teamName',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '物料名称',
      dataIndex: 'userId',
      ellipsis: true,
      render: (_, record) => {
        return <span>{record.userName}</span>;
      },
      renderFormItem: () => {
        return <Select placeholder="请选择班组长" options={personInfoList} />;
      },
    },
    {
      title: '规格',
      dataIndex: 'identityCard',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '型号',
      dataIndex: 'identityCard',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '退场数量',
      dataIndex: 'subcontractorId',
      ellipsis: true,
      render: (_, record) => {
        return <span>{record.subcontractorName}</span>;
      },
      renderFormItem: () => {
        return <Select placeholder="请选择分包单位" options={subcontractorList} />;
      },
    },
    {
      title: '计量单位',
      dataIndex: 'workTypeName',
      ellipsis: true,
      editable: false
    },
    {
      title: '退场时间',
      dataIndex: 'corpCode',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '退料人员',
      dataIndex: 'phone',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '见证人员',
      dataIndex: 'phone',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '生产厂家',
      dataIndex: 'phone',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '供应单位',
      dataIndex: 'phone',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '购买单位',
      dataIndex: 'phone',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '退场原因',
      dataIndex: 'phone',
      ellipsis: true,
      hideInSearch: true,
    },
  ];

  return columns;
};
