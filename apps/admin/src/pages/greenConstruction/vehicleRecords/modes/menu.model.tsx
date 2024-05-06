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
      hideInTable: true,
      title: '时间范围',
      valueType: 'dateRange',
      search: {
        transform: (value: any) => ({
          startTime: value[0],
          endTime: value[1],
        }),
      },
    },
    {
      hideInSearch: true,
      title: '车辆颜色',
      dataIndex: 'type',
      align: 'center',
    },
    {
      hideInSearch: true,
      title: '车型',
      dataIndex: 'code',
      align: 'center',
    },
    {
      hideInSearch: true,
      title: '抓拍图片',
      align: 'center',
      render: (_, record) => {
        return (
          <>
            <Button type="link" onClick={() => setVisible(true)}>
              预览
            </Button>
            <Image
              style={{ display: 'none' }}
              preview={{
                visible,
                src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                onVisibleChange: (value) => {
                  setVisible(value);
                },
              }}
            />
          </>
        );
      },
    },
    {
      hideInSearch: true,
      title: '轨迹',
      align: 'center',
      render: (_, record) => {
        return (
          <>
            <Button type="link" onClick={() => setVisible(true)} icon={<EyeOutlined />}>
              查看
            </Button>
            <Image
              style={{ display: 'none' }}
              preview={{
                visible,
                src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                onVisibleChange: (value) => {
                  setVisible(value);
                },
              }}
            />
          </>
        );
      },
    },
    {
      hideInSearch: true,
      title: '方向',
      dataIndex: 'workerType',
      align: 'center',
      valueEnum: {
        '1': { text: '进场' },
        '2': { text: '出场' },
      },
    },
    {
      hideInSearch: true,
      title: '进出时间',
      dataIndex: 'createTime',
      render: (_, record) => <>{dayjs(record.createTime).format('YYYY-MM-DD hh:mm:ss')}</>,
      align: 'center',
    },
  ];

  return columns;
};
