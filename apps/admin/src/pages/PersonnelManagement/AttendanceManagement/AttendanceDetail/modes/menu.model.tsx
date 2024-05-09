import { type ProColumns } from '@ant-design/pro-components';
import dayjs from 'dayjs';
type ParamsType = Record<string, any>;

type MenusPropsType = {
  server?: ParamsType;
  month?: Date;
};

export default ({ month = new Date() }: MenusPropsType) => {
  const startOfMonth = dayjs(month).startOf('month');
  const endOfMonth = dayjs(month).endOf('month');
  const daysInMonth = endOfMonth.diff(startOfMonth, 'days') + 1;
  const days: ProColumns[] = [...Array(daysInMonth).keys()].map((i: number) => {
    const day = i + 1;
    return {
      width: day == 1 ? 70 : 50,
      hideInSearch: true,
      title: day == 1 ? '日期/01' : day.toString().padStart(2, '0'),
      dataIndex: 'worker1',
      align: 'center',
      render: (dom) =>
        dom == 1 ? (
          <span>{dom}</span>
        ) : (
          <span className="inline-block color-#FF0000 w-30px h-30px line-height-30px bg-#ffcccc rd-50%">
            0
          </span>
        ),
    };
  });
  /* 接口还需配传参 */
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
      hideInTable: true,
      title: '分包单位',
      dataIndex: 'creditCode',
    },
    {
      hideInTable: true,
      title: '劳务工种',
      dataIndex: 'gender',
    },
    {
      hideInTable: true,
      title: '班组名称',
      dataIndex: 'companyName',
    },
    {
      hideInTable: true,
      title: '年月',
      valueType: 'dateMonth',
      dataIndex: 'createTime',
    },
    {
      width: 100,
      title: '人员名称',
      dataIndex: 'name',
      fixed: 'left',
      align: 'center',
    },
    {
      width: 100,
      hideInSearch: true,
      title: '出勤(天)',
      dataIndex: 'gender',
      fixed: 'left',
      align: 'center',
    },
    {
      title: '工日(天)',
      hideInSearch: true,
      dataIndex: 'id',
      fixed: 'left',
      align: 'center',
    },
    ...days,
  ];

  return columns;
};
