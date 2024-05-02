import { TableDropdown, type ProColumns } from '@ant-design/pro-components';
import { message } from 'antd';

import DictSelect from '@/components/DictSelect';

type objJson = Record<string, any>;

type MenusPropsType = {
  server?: objJson;
};

// export interface ColumnsParamsProps extends objJson {
//   subcontractorType: number | string;
//   realName: string;
//   corpCode: string;
//   legalRepresentative: number | string;
//   registeredCapital: string;
//   unitAddress: string;
//   principal: string;
//   principalTel: string;
// }

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
      title: '证书类型',
      dataIndex: 'credentialClassification',
      ellipsis: true,
      hideInTable: true,
      editable: false,
      renderFormItem: () => {
        return (
          <DictSelect
            dictKey="pm_credential_classification"
            onChange={(value) => console.log('value', value)}
          />
        );
      },
    },
    {
      title: '分包单位',
      dataIndex: 'realName',
      ellipsis: true,
      editable: false,
    },
    {
      title: '隶属人员名称',
      dataIndex: 'userName',
      ellipsis: true,
      editable: false,
    },
    {
      title: '人员类型',
      dataIndex: '----',
      ellipsis: true,
      hideInSearch: true,
      editable: false,
    },
    {
      title: '岗位/职位',
      dataIndex: 'jobCategory',
      ellipsis: true,
      hideInSearch: true,
      editable: false,
    },
    {
      title: '证书名称',
      dataIndex: 'credentialName',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '证书编号',
      dataIndex: 'credentialNumber',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '发证机关',
      dataIndex: 'issuingAuthority',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '证书有效日期',
      dataIndex: 'validityEndDate',
      ellipsis: true,
      hideInSearch: true,
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
