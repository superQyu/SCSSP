import { useState } from 'react';
import { type ProColumns } from '@ant-design/pro-components';
import dayjs from 'dayjs';

import DictSelect from '@/components/DictSelect';
type ParamsType = Record<string, any>;

type MenusPropsType = {
  server?: ParamsType;
};

export interface ColumnsParamsProps extends ParamsType {
  id: number;
  name: string;
  ico: string;
  orderNum: number;
  roleKey: number | string;
  filepath: string;
  isDelete: '0' | '1';
}

export default (_: MenusPropsType) => {
  const columns: ProColumns[] = [
    {
      width: 60,
      hideInSearch: true,
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
    },
    {
      title: '车牌号',
      dataIndex: 'carNo',
      ellipsis: true,
    },
    {
      hideInSearch: true,
      width: 120,
      title: '行驶证号',
      dataIndex: 'carLicense',
    },
    {
      title: '车辆品牌',
      width: 120,
      dataIndex: 'carBrand',
    },
    {
      hideInSearch: true,
      width: 120,
      title: '型号',
      dataIndex: 'carModel',
    },
    {
      title: '车型',
      width: 120,
      dataIndex: 'carType',
      render: (_, record) => (
        <DictSelect type={'text'} value={record.carType} dictKey={'cm_car_type'} />
      ),
      renderFormItem: () => {
        return <DictSelect dictKey={'cm_car_type'} />;
      },
    },
    {
      hideInSearch: true,

      title: '车辆颜色',
      dataIndex: 'carColor',
    },
    {
      hideInSearch: true,
      width: 180,
      title: '车辆识别代号/车架号',
      dataIndex: 'frameNo',
    },
    {
      hideInSearch: true,

      title: '发动机号',
      dataIndex: 'engineNo',
    },

    {
      hideInSearch: true,
      title: '核定载客',
      dataIndex: 'approvalSeats',
    },
    {
      hideInSearch: true,
      width: 100,
      title: '年审时间',
      dataIndex: 'examinedDate',
      render: (_, record) => <>{dayjs(record.examinedDate).format('YYYY-MM-DD')}</>,
    },
    {
      hideInSearch: true,
      width: 100,
      title: '保险时间',
      dataIndex: 'insuranceDate',
      render: (_, record) => <>{dayjs(record.insuranceDate).format('YYYY-MM-DD')}</>,
    },
  ];

  return columns;
};
