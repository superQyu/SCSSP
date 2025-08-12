import DictSelect from '@/components/DictSelect';
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
      valueType: 'dateTimeRange',
      dataIndex: 'queryTime',
      // search: {
      //   transform: (value: any) => {
      //     console.log('value',value);
      //     // ({
      //     //   queryTime: value[0],
      //     //   endTime: value[1],
      //     // })
      //   },
      // },
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
      render: (_, record) => {
        return (
          <DictSelect
            dictKey="cm_car_type"
            type="text"
            value={record.carType}
          />
        );
      },
    },
    {
      hideInSearch: true,
      title: '方向',
      dataIndex: 'direction',
      render: (_, record) => {
        return (
          <DictSelect
            dictKey="vehicle_entry_exit"
            value={record.direction}
            type="text"
          />
        );
      },
    },
    {
      hideInSearch: true,
      title: '进场时间',
      render: (_, record) => (
        <>
          {record.enterTime
            ? dayjs(record.enterTime).format(
                'YYYY-MM-DD HH:mm:ss'
              )
            : '--'}
        </>
      ),
    },
    {
      hideInSearch: true,
      title: '出场时间',
      render: (_, record) => (
        <>
          {record.outTime
            ? dayjs(record.outTime).format('YYYY-MM-DD HH:mm:ss')
            : '--'}
        </>
      ),
    },
  ];

  return columns;
};
