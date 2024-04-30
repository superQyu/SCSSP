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
      title: '分包单位',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '劳务工种',
      dataIndex: 'type',
    },
    {
      title: '班组名称',
      dataIndex: 'code',
    },
    {
      title: '年月',
      valueType: 'dateRange',
      dataIndex: 'createTime',
      hideInTable: true,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
    },
    {
      hideInSearch: true,
      title: '年月',
      dataIndex: 'createTime',
      render: (_, record) => <>{dayjs(record.createTime).format('YYYY-MM')}</>,
    },
    {
      hideInSearch: true,
      title: '人数',
      dataIndex: 'remark',
    },
    {
      title: '总出勤',
      hideInSearch: true,
      dataIndex: 'createTime',
    },
    {
      title: '总工时',
      dataIndex: 'type',
      hideInSearch: true,
    },
  ];

  return columns;
};
