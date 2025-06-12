import { useState, useEffect } from 'react';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

export interface FormColumnVO {
  label: string;
  key: string;
  disabled?: boolean;
}

export default () => {
  const formColumns: FormColumnVO[] = [
    {
      label: '车牌号',
      key: 'carNo',
      disabled: true,
    },
    {
      label: '进场时间',
      key: 'enterDate',
      disabled: true,
    },
    {
      label: '送货人',
      key: 'deliveryMan',
      disabled: true,
    },
    {
      label: '送货人联系方式',
      key: 'deliveryContact',
      disabled: true,
    },
    {
      label: '验收人',
      key: 'materialMan',
      disabled: true,
    },
    {
      label: '验收单位',
      key: 'purchaserDepartment',
      disabled: true,
    },
  ];
  const MaterialColumns: FormColumnVO[] = [
    {
      label: '物料名称',
      key: 'materialName',
      disabled: true,
    },
    {
      label: '型号',
      key: 'materialType',
      disabled: true,
    },
    {
      label: '计量单位',
      key: 'measuringUnit',
      disabled: true,
    },
    {
      label: '规格',
      key: 'specification',
      disabled: true,
    },
    {
      label: '物料编号',
      key: 'materialCode',
      disabled: true,
    },
    {
      label: '是否特种作业',
      key: 'isSpecialWork',
      disabled: true,
    },
    {
      label: '计划进场数量',
      key: 'enterNumber',
      disabled: true,
    },
    {
      label: '实际验收数量',
      key: 'acceptNumber',
      disabled: true,
    },
  ];
  return { formColumns ,MaterialColumns};
};
