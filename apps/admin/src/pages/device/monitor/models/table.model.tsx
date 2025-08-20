import { type ProColumns } from '@ant-design/pro-components';
import { message } from 'antd';

import DictText from '@/components/DictSelect/DictText';
import DictSelect from '@/components/DictSelect';
import dayjs from 'dayjs';
type objJson = Record<string, any>;

type MenusPropsType = {
  server?: objJson;
};

export interface ColumnsParamsProps extends objJson {
  subcontractorType: number | string;
  realName: string;
  corpCode: string;
  legalRepresentative: number | string;
  registeredCapital: string;
  unitAddress: string;
  principal: string;
  principalTel: string;
}

export default ({ server }: MenusPropsType) => {
  const { menus: M } = server as objJson;

  const columns: ProColumns[] = [
    {
      title: '序号',
      valueType: 'indexBorder',
      dataIndex: 'index',
      fixed: 'left',
      ellipsis: true,
      width: 80,
      render: (text: any, record: any, index: number) => {
        return index + 1;
      },
    },
    {
      title: '设备名称',
      dataIndex: 'realName',
      ellipsis: true,
      order: 1,
    },
    {
      title: '设备类型',
      dataIndex: 'subcontractorType',
      ellipsis: true,
      render: (_, record) => {
        return (
          <DictText
            value={record.subcontractorType}
            dictKey="subcontractor_type"
          />
        );
      },
      renderFormItem: () => {
        return <DictSelect dictKey="subcontractor_type" />;
      },
    },
    {
      title: '安装日期',
      dataIndex: 'validityEndDate',
      ellipsis: true,
      render: (text, record) => {
        return record.validityEndDate
          ? dayjs(record.validityEndDate).format('YYYY-MM-DD')
          : '';
      },
    },
    {
      title: '安装位置',
      dataIndex: 'corpCode',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: 'IP地址',
      dataIndex: 'province',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '设备状态',
      dataIndex: 'subcontractorType',
      ellipsis: true,
      render: (_, record) => {
        return (
          <DictText
            value={record.subcontractorType}
            dictKey="subcontractor_type"
          />
        );
      },
      renderFormItem: () => {
        return <DictSelect dictKey="subcontractor_type" />;
      },
    },
    {
      title: '最后在线时间',
      dataIndex: 'validityEndDate',
      ellipsis: true,
      render: (text, record) => {
        return record.validityEndDate
          ? dayjs(record.validityEndDate).format('YYYY-MM-DD')
          : '';
      },
    },
  ];
  const alarmColums: ProColumns[] = [
    {
      title: '序号',
      valueType: 'indexBorder',
      dataIndex: 'index',
      fixed: 'left',
      ellipsis: true,
      width: 80,
      render: (text: any, record: any, index: number) => {
        return index + 1;
      },
    },
    {
      title: '设备名称',
      dataIndex: 'realName',
      ellipsis: true,
      order: 1,
    },
    {
      title: '设备类型',
      dataIndex: 'subcontractorType',
      ellipsis: true,
      render: (_, record) => {
        return (
          <DictText
            value={record.subcontractorType}
            dictKey="subcontractor_type"
          />
        );
      },
      renderFormItem: () => {
        return <DictSelect dictKey="subcontractor_type" />;
      },
    },
    {
      title: '报警类型',
      dataIndex: 'subcontractorType',
      ellipsis: true,
      render: (_, record) => {
        return (
          <DictText
            value={record.subcontractorType}
            dictKey="subcontractor_type"
          />
        );
      },
      renderFormItem: () => {
        return <DictSelect dictKey="subcontractor_type" />;
      },
    },
    {
      title: '发生时间',
      dataIndex: 'validityEndDate',
      ellipsis: true,
      render: (text, record) => {
        return record.validityEndDate
          ? dayjs(record.validityEndDate).format('YYYY-MM-DD')
          : '';
      },
    },

    {
      title: '状态',
      dataIndex: 'subcontractorType',
      ellipsis: true,
      render: (_, record) => {
        return (
          <DictText
            value={record.subcontractorType}
            dictKey="subcontractor_type"
          />
        );
      },
      renderFormItem: () => {
        return <DictSelect dictKey="subcontractor_type" />;
      },
    },
  ];

  return { alarmColums, columns };
};
