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

  const fColumns: ProColumns[] = [
    {
      title: '序号',
      valueType: 'indexBorder',
      dataIndex: 'index',
      ellipsis: true,
      // width: 50
    },
    {
      title: '进场时间',
      dataIndex: 'enterDate',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '送货人',
      dataIndex: 'deliveryMan',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '材料员',
      dataIndex: 'materialMan',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '供应单位',
      dataIndex: 'supplierDepartment',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '生产厂家',
      dataIndex: 'manufacturer',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '购买单位',
      dataIndex: 'purchaserDepartment',
      ellipsis: true,
      hideInSearch: true,
    },
  ];

  const cColumns: ProColumns[] = [
    {
      title: '物料名称',
      dataIndex: 'materialName',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '型号',
      dataIndex: 'materialType',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '计量单位',
      dataIndex: 'measuringUnit',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '规格',
      dataIndex: 'specification',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '物料编号',
      dataIndex: 'materialCode',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '进场数量',
      dataIndex: 'enterNumber',
      ellipsis: true,
      editable: false,
    },
    {
      title: '合格证件',
      dataIndex: 'attachment',
      ellipsis: true,
      hideInSearch: true,
    },
  ];

  return { fColumns, cColumns };
};
