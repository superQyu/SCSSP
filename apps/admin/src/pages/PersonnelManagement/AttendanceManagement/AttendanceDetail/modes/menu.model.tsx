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
  const startOfMonth = dayjs().startOf('month');
  const endOfMonth = dayjs().endOf('month');
  const daysInMonth = endOfMonth.diff(startOfMonth, 'days') + 1;
  const days:ProColumns[] = [...Array(daysInMonth).keys()].map((i: number) => {
    return {

      hideInSearch: true,
      title: i.toString().padStart(2,'0'),
      dataIndex: 'id',
      align: 'right',
    }
  });
  console.log(daysInMonth); // 输出当前月份的天数
  const columns: ProColumns[] = [
    {
      width: 60,
      hideInSearch: true,
      title: '序号',
      dataIndex: 'id',
      fixed: 'left',
    },
    {
      width: 120,
      title: '人员名称',
      dataIndex: 'type',
    },
    {
      width: 120,
      hideInSearch: true,
      title: '出勤(天)',
      dataIndex: 'remark',
      fixed: 'left',
    },
    {
 
      title: '工日(天)',
      hideInSearch: true,
      dataIndex: 'createTime',
      align: 'right',
    },
    ...days
  ];

  return columns;
};
