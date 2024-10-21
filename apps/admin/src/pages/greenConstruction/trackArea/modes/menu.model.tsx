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
      title: '区域名称',
      dataIndex: 'name',
      ellipsis: true,
      width: 150,
    },
    // {
    //   hideInTable: true,
    //   title: '时间范围',
    //   valueType: 'dateRange',
    //   search: {
    //     transform: (value: any) => ({
    //       startTime: value[0],
    //       endTime: value[1],
    //     }),
    //   },
    // },
    {
      hideInSearch: true,
      title: '坐标',
      dataIndex: 'points',
    },
    {
      hideInSearch: true,
      title: '创建时间',
      dataIndex: 'createTime',
      render: (_, record) => (
        <>
          {dayjs(record.createTime).format(
            'YYYY-MM-DD HH:mm:ss'
          )}
        </>
      ),
    },
    {
      hideInSearch: true,
      title: '创建人',
      dataIndex: 'workerType',
    },
  ];

  return columns;
};
