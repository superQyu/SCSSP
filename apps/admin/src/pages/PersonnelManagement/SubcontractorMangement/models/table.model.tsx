import { type ProColumns } from '@ant-design/pro-components';
import { message } from 'antd';

import DictText from '@/components/DictSelect/DictText';
import DictSelect from '@/components/DictSelect';

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
      ellipsis: true,
      width: 170,
    },
    {
      title: '分包商类型',
      dataIndex: 'subcontractorType',
      ellipsis: true,
      width: 170,
      render: (_, record) => {
        return <DictText value={record.subcontractorType} dictKey="subcontractor_type" />;
      },
      renderFormItem: () => {
        return <DictSelect dictKey="subcontractor_type" />;
      },
    },
    {
      title: '分包单位名称',
      dataIndex: 'realName',
      ellipsis: true,
      width: 170,
      order: 1,
    },
    {
      title: '统一社会信用代码',
      dataIndex: 'corpCode',
      ellipsis: true,
      width: 170,
      hideInSearch: true,
    },
    {
      title: '法人',
      dataIndex: 'legalRepresentative',
      ellipsis: true,
      width: 170,
      hideInSearch: true,
    },
    {
      title: '注册资金(万元)',
      dataIndex: 'registeredCapital',
      ellipsis: true,
      width: 170,
      hideInSearch: true,
    },
    {
      title: '地址',
      dataIndex: 'unitAddress',
      ellipsis: true,
      width: 170,
      hideInSearch: true,
    },
    {
      title: '联系人',
      dataIndex: 'principal',
      ellipsis: true,
      width: 170,
      hideInSearch: true,
    },
    {
      title: '联系电话',
      dataIndex: 'principalTel',
      ellipsis: true,
      width: 170,
      hideInSearch: true,
    },
    {
      title: '公司简称简拼',
      dataIndex: 'nameSpell',
      ellipsis: true,
      width: 170,
      hideInSearch: true,
      editable: false,
    },
  ];

  return columns;
};
