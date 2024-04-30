import { type ProColumns } from '@ant-design/pro-components';
import { Space } from 'antd';
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
  const days: ProColumns[] = [...Array(daysInMonth).keys()].map((i: number) => {
    return {
      width:i ==0 ? 70: 50,
      hideInSearch: true,
      title: i ==0 ?  '日期/00' :i.toString().padStart(2, '0'),
      dataIndex: 'workerType',
      align: 'center',
      render: (dom) =>
        dom == 1 ? (
          <span>{dom}</span>
        ) : (
          <span className="inline-block color-#FF0000 w-30px h-30px line-height-30px bg-#ffcccc rd-50%">{dom}</span>
        ),
    };
  });
  console.log(daysInMonth); // 输出当前月份的天数
  const columns: ProColumns[] = [
    {
      width: 60,
      hideInSearch: true,
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      fixed: 'left',
      align: 'center',
    },

    {
      width: 120,
      title: '人员名称',
      dataIndex: 'name',
      fixed: 'left',
      align: 'center',
    },
    {
      width: 120,
      hideInSearch: true,
      title: '出勤(天)',
      dataIndex: 'remark',
      fixed: 'left',
      align: 'center',
    },
    {
      title: '工日(天)',
      hideInSearch: true,
      dataIndex: 'createTime',
      fixed: 'left',
      align: 'center',
    },
    ...days,
  ];

  return columns;
};
