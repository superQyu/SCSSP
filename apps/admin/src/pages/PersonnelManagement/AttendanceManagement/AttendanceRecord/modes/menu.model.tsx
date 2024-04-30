import { type ProColumns } from '@ant-design/pro-components';

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
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '打卡时间',
      dataIndex: 'type',
    },
    {
      title: '打卡方向',
      dataIndex: 'type',
      valueEnum: {
        '1': { text: '进场' },
        '2': { text: '出场'},

      },
    },
    {
      title: '是否异常',
      dataIndex: 'type',
      valueEnum: {
        '1': { text: '正常',status: 'Success'  },
        '2': { text: '异常', status: 'Error'},

      },
    },
  ];

  return columns;
};
