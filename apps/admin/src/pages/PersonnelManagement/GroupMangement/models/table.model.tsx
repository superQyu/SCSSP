import { TableDropdown, type ProColumns } from '@ant-design/pro-components';
import { message, Select } from 'antd';

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
      dataIndex: 'index',
      ellipsis: true,
    },
    {
      title: '班组名称',
      dataIndex: 'teamName',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '班组长名',
      dataIndex: 'userId',
      ellipsis: true,
    },
    {
      title: '身份证号',
      dataIndex: 'identityCard',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '分包单位名称',
      dataIndex: 'subcontractorId',
      ellipsis: true,
      valueType: 'select',
      valueEnum: {
        '1': {
          text: '架子工',
        },
        '0': {
          text: '否',
        },
      },
      formItemProps: {
        label: '分包单位'
      }
    },
    {
      title: '劳务工种',
      dataIndex: 'workerTypeId',
      ellipsis: true,
      valueType: 'select',
      valueEnum: {
        '1': {
          text: '架子工',
        },
        '0': {
          text: '否',
        },
      },
    },
    {
      title: '公司简称简拼',
      dataIndex: 'corpCode',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
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
