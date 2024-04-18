import { TableDropdown, type ProColumns } from '@ant-design/pro-components';
import { message } from 'antd';

type objJson = Record<string, any>;

type MenusPropsType = {
  server?: objJson;
};

export interface ColumnsParamsProps extends objJson {
  subcontractorType: string;
  realName: string;
  corpCode: string;
  legalRepresentative: string;
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
      key: 'index',
      ellipsis: true,
    },
    {
      title: '分包商类型',
      dataIndex: 'subcontractorType',
      ellipsis: true,
      valueType: 'select',
      filters: true,
      valueEnum: {
        '1': {
          text: '是',
        },
        '0': {
          text: '否',
        },
      },
      // render: (_, record) => (
      //   <>
      //     {record.isSpecialWorkType == '1' ? <Tag color="green">是</Tag> : <Tag color="red">否</Tag>}
      //   </>
      // ),
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
      editable: false
    },
    {
      title: '操作',
      width: 140,
      valueType: 'option',
      key: 'option',
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
        <TableDropdown
          key="actionGroup"
          onSelect={(key) => {
            if (key === 'delete') {
              try {
                M.deleteMenus({ ids: record.id })
                  .then(() => {
                    message.success('操作成功!');
                    action?.reload();
                  })
                  .catch(() => {});
              } catch (errorInfo) {}
            }
          }}
          menus={[
            { key: 'delete', name: '删除' },
            { key: 'detail', name: '详情' },
            { key: 'copy', name: '复制' },
          ]}
        />,
      ],
    },
  ];

  return columns;
};
