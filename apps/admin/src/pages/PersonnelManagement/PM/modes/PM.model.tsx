import { type ProColumns } from '@ant-design/pro-components';

import dayjs from 'dayjs';

type objJson = Record<string, any>;

type MenusPropsType = {
  server?: objJson;
};

export interface ColumnsParamsProps extends objJson {
  id: number;
  name: string;
  ico: string;
  orderNum: number;
  roleKey: number | string;
  isDelete: '0' | '1';
}

const url =
  'https://img1.baidu.com/it/u=1377073336,1053961489&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500';

export default ({ server }: MenusPropsType) => {
  const { menus: M } = server as objJson;

  const columns: ProColumns[] = [
    {
      title: '序号',
      dataIndex: 'id',
      width: 80,
      editable: false,
      hideInSearch: true,
      sorter: true,
      fixed: 'left',
    },
    {
      title: '项目名称',
      dataIndex: 'projectName',
      ellipsis: true,
    },
    {
      hideInSearch: true,
      title: '施工单位名称',
      dataIndex: 'constructionCompanyName',
    },
    {
      hideInSearch: true,
      title: '项目地址',
      dataIndex: 'projectAddress',
    },
    {
      width: 120,
      hideInSearch: true,
      title: '总造价(万元)',
      ellipsis: true,
      dataIndex: 'projectCost',
    },
    {
      width: 120,
      hideInSearch: true,
      title: '总面积(㎡)',
      dataIndex: 'projectArea',
      ellipsis: true,
    },
    {
      width: 180,
      hideInSearch: true,
      title: '开工日期',
      dataIndex: 'expectedStartTime',
      render: (_, record) => <>{dayjs(record.expectedStartTime).format('YYYY-MM-DD hh:mm:ss')}</>,
    },
    {
      width: 180,
      hideInSearch: true,
      title: '实际开工日期',
      key: 'actualStartTime',
      render: (_, record) => <>{dayjs(record.actualStartTime).format('YYYY-MM-DD hh:mm:ss')}</>,
    },
    {
      width: 180,
      hideInSearch: true,
      title: '计划竣工日期',
      dataIndex: 'expectedEndTime',
      render: (_, record) => <>{dayjs(record.expectedEndTime).format('YYYY-MM-DD hh:mm:ss')}</>,
    },
    {
      width: 180,
      title: '项目状态',
      dataIndex: 'projectStatus',
    },
  ];

  return columns;
};
