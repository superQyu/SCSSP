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
    },
    {
      title: '车牌号',
      dataIndex: 'carNo',
      ellipsis: true,
    },
    {
      hideInSearch: true,
      title: '车辆颜色',
      dataIndex: 'plateColor',
    },
    {
      hideInSearch: true,
      title: '车型',
      dataIndex: 'carType',
    },
    {
      hideInSearch: true,
      title: '报警时间',
      dataIndex: 'alarmTime',
    },
    {
      hideInSearch: true,
      title: '报警类型',
      dataIndex: 'alarmType',
    },
    {
      hideInSearch: true,
      title: '报警内容',
      dataIndex: 'alarmContent',
    },
    {
      hideInSearch: true,
      title: '处理人',
      dataIndex: 'disposeUserId',
    },
    {
      hideInSearch: true,
      title: '处理内容',
      dataIndex: 'disposeContent',
    },
    {
      hideInSearch: true,
      title: '处理时间',
      dataIndex: 'disposeTime',
      render: (_, record) => <>{dayjs(record.createTime).format('YYYY-MM-DD hh:mm:ss')}</>,
    },
  ];

  return columns;
};
