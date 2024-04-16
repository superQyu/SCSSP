import { StarTwoTone, StopTwoTone } from '@ant-design/icons';
import { TableDropdown, type ProColumns } from '@ant-design/pro-components';
import { message, Tag } from 'antd';

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
  filepath: string;
  isDelete: '0' | '1';
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
      title: '编号',
      dataIndex: 'code',
      ellipsis: true,
    },
    {
      title: '工种',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '首字母简拼',
      dataIndex: 'initialsSpell',
      ellipsis: true,
    },
    {
      title: '是否特殊工种',
      dataIndex: 'isSpecialWorkType',
      ellipsis: true,
      valueType: 'select',
      filters: true,
      valueEnum: {
        '1': {
          text: (
            <>
              <StarTwoTone twoToneColor="#50a14f" style={{ marginRight: '10px' }} />
              是
            </>
          ),
        },
        '0': {
          text: (
            <>
              <StopTwoTone twoToneColor="red" style={{ marginRight: '10px' }} />
              否
            </>
          ),
        },
      },
      render: (_, record) => (
        <>
          {record.isSpecialWorkType == '1' ? <Tag color="green">是</Tag> : <Tag color="red">否</Tag>}
        </>
      ),
    },
    {
      title: '排序',
      dataIndex: 'sort',
      valueType: 'digit',
      ellipsis: true,
      hideInSearch: true,
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
