import { type ProColumns } from '@ant-design/pro-components';
import dayjs from 'dayjs';

type ParamsType = Record<string, any>;

type MenusPropsType = {
  server?: ParamsType;
};

export default (_: MenusPropsType) => {
  const columns: ProColumns[] = [
    {
      width: 60,
      hideInSearch: true,
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      fixed: 'left',
    },

    {
      hideInSearch: true,
      title: '用户名',
      dataIndex: 'userName',
    },
    {
      hideInTable: true,
      title: '用户名',
      dataIndex: 'username',
    },
    {
      hideInSearch: true,
      title: '日期',
      valueType: 'date',
      dataIndex: 'loginDate',
      render: (_, record) => (
        <>{dayjs(record.loginDate).format('YYYY-MM-DD')}</>
      ),
    },
    {
      hideInTable: true,
      title: '日期',
      valueType: 'date',
      dataIndex: 'searchDate',
    },
    {
      hideInSearch: true,
      title: '登录次数',
      dataIndex: 'loginCount',
    },
  ];

  return columns;
};
