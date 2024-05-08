import { type ProColumns } from '@ant-design/pro-components';
import { Button, Image } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import dayjs from 'dayjs';
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
  const [visible, setVisible] = useState(false);
  const columns: ProColumns[] = [
    {
      width: 60,
      hideInSearch: true,
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      align: 'center',
    },
    {
      title: '车牌号',
      dataIndex: 'name',
      ellipsis: true,
      align: 'center',
    },
    {
      hideInSearch: true,
      width: 120,
      title: '行驶证号',
      dataIndex: 'type',
      align: 'center',
    },
    {
      title: '车辆品牌',
      width: 120,
      dataIndex: 'type',
      align: 'center',
    },
    {
      hideInSearch: true,
      width: 120,
      title: '型号',
      dataIndex: 'type',
      align: 'center',
    },
    {
      title: '车型',
      width: 120,
      dataIndex: 'type',
      align: 'center',
    },
    {
      hideInSearch: true,
      width: 120,
      title: '车辆颜色',
      dataIndex: 'type',
      align: 'center',
    },
    {
      hideInSearch: true,
      width: 180,
      title: '车辆识别代号/车架号',
      dataIndex: 'code',
      align: 'center',
    },
    {
      hideInSearch: true,
      width: 120,
      title: '发动机号',
      align: 'center',
    },
    {
      hideInSearch: true,
      width: 120,
      title: '能源种类',
      align: 'center',
    },
    {
      hideInSearch: true,
      width: 120,
      title: '核定载客',
      dataIndex: 'workerType',
      align: 'center',
    },
    {
      hideInSearch: true,
      width: 120,
      title: '年审时间',
      dataIndex: 'createTime',
      render: (_, record) => <>{dayjs(record.createTime).format('YYYY-MM-DD')}</>,
      align: 'center',
    },
    {
      hideInSearch: true,
      width: 120,
      title: '保险时间',
      dataIndex: 'createTime',
      render: (_, record) => <>{dayjs(record.createTime).format('YYYY-MM-DD')}</>,
      align: 'center',
    },
  ];

  return columns;
};
