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
    },
    {
      title: '分包商类型',
      dataIndex: 'subcontractorType',
      ellipsis: true,
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
      order: 1,
    },
    {
      title: '统一社会信用代码',
      dataIndex: 'corpCode',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '法人',
      dataIndex: 'legalRepresentative',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '注册资金(万元)',
      dataIndex: 'registeredCapital',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '地址',
      dataIndex: 'unitAddress',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '联系人',
      dataIndex: 'principal',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '联系电话',
      dataIndex: 'principalTel',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '公司简称简拼',
      dataIndex: 'nameSpell',
      ellipsis: true,
      hideInSearch: true,
      editable: false,
    },
    {
      title: '操作',
      width: 140,
      valueType: 'option',
      dataIndex: 'option',
      render: (_text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            // console.log('点击了编辑')
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            // action?.startEditable?.(record.id);
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return columns;
};
