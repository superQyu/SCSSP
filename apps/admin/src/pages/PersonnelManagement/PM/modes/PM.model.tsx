import { type ProColumns } from '@ant-design/pro-components';

import DictSelect from '@/components/DictSelect';
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
      render: (_, { expectedStartTime }) => {
        if (!expectedStartTime || expectedStartTime === null) return '-';
        return <>{dayjs(expectedStartTime).format('YYYY-MM-DD')}</>;
      },
    },
    {
      width: 180,
      hideInSearch: true,
      title: '实际开工日期',
      key: 'actualStartTime',
      render: (_, { actualStartTime }) => {
        if (!actualStartTime || actualStartTime === null) return '-';
        return <>{dayjs(actualStartTime).format('YYYY-MM-DD')}</>;
      },
    },
    {
      width: 180,
      hideInSearch: true,
      title: '计划竣工日期',
      dataIndex: 'expectedEndTime',
      render: (_, { expectedEndTime }) => {
        if (!expectedEndTime || expectedEndTime === null) return '-';
        return <>{dayjs(expectedEndTime).format('YYYY-MM-DD')}</>;
      },
    },
    {
      width: 180,
      title: '项目状态',
      dataIndex: 'projectStatus',
      render: (_, { projectStatus }) => (
        <DictSelect
          type={'text'}
          value={projectStatus}
          dictKey={`structure_type`}
          dropdownExtend={false}
        />
      ),
      renderFormItem: () => <DictSelect dictKey={`structure_type`} dropdownExtend={false} />,
    },
  ];

  return columns;
};
