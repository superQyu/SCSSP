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
      dataIndex: 'carNo',
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
      dataIndex: 'plateColor',
      align: 'center',
    },
    {
      hideInSearch: true,
      title: '车型',
      dataIndex: 'carType',
      align: 'center',
    },
    {
      hideInSearch: true,
      title: '抓拍图片',
      dataIndex: 'attachment',
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
      dataIndex: 'direction',
      render: (_, record) => (record.enterTime ? '出场' : '进场'),
    },
    {
      hideInSearch: true,
      title: '进出时间',
      render: (_, record) => (
        <>{dayjs(record.enterTime || record.outTime).format('YYYY-MM-DD hh:mm:ss')}</>
      ),
      align: 'center',
    },
  ];

  return columns;
};
