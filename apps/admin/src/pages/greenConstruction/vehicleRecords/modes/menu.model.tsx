import { type ProColumns } from '@ant-design/pro-components';

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
    },
    {
      hideInSearch: true,
      title: '车型',
      dataIndex: 'carType',
    },
    {
      hideInSearch: true,
      title: '方向',
      dataIndex: 'direction',
      render: (_, record) => (record.enterTime ? '进场' : '出场'),
    },
    {
      hideInSearch: true,
      title: '进出时间',
      render: (_, record) => (
        <>{dayjs(record.enterTime || record.outTime).format('YYYY-MM-DD hh:mm:ss')}</>
      ),
    },
  ];

  return columns;
};
