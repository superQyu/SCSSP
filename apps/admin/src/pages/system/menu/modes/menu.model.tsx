import { createElement } from 'react';
import * as Icons from '@ant-design/icons';
import { StarTwoTone, StopTwoTone } from '@ant-design/icons';
import { TableDropdown, type ProColumns } from '@ant-design/pro-components';
import { Switch, message, Avatar } from 'antd';

type objJson = Record<string, any>;

type ColumnsType = {
  /** 站点标识 */
  apis?: objJson;
};

interface ColumnsProps extends ProColumns {
  [key: string]: any;
}

const iconMap = Icons as unknown as objJson;

export default ({ apis }: ColumnsType) => {
  //  api server
  const { sites } = apis as objJson;

  const columns: ColumnsProps[] = [
    {
      hideInSearch: true,
      title: '菜单名称',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '图标',
      width: 80,
      dataIndex: 'ico',
      ellipsis: true,
      render: (_, record) => {
        const ico = record.ico;
        return (
          <>
            {ico == '' || !ico ? (
              <></>
            ) : ico.indexOf('.') != -1 ? (
              <Avatar size={18} src={`/static${ico}`} />
            ) : (
              createElement(iconMap[ico])
            )}
          </>
        );
      },
    },
    {
      width: 80,
      hideInSearch: true,
      title: '排序',
      dataIndex: 'orderNum',
    },
    {
      width: 80,
      hideInSearch: true,
      title: '权限标识',
      dataIndex: 'roleKey',
    },
    {
      hideInSearch: true,
      title: '组件路径',
      dataIndex: 'filepath',
    },
    {
      disable: true,
      width: 150,
      title: '站点状态',
      dataIndex: 'isDelete',
      valueType: 'select',
      valueEnum: {
        '0': {
          text: (
            <>
              <StarTwoTone twoToneColor="#50a14f" style={{ marginRight: '10px' }} />
              使用中
            </>
          ),
          status: 'Success',
        },
        '1': {
          text: (
            <>
              <StopTwoTone twoToneColor="red" style={{ marginRight: '10px' }} />
              已停运
            </>
          ),
          status: 'Error',
        },
      },
      render: (_, record) => (
        <Switch
          checkedChildren="正常"
          unCheckedChildren="停运"
          disabled
          defaultChecked={record?.isDelete == '0' ? true : false}
        />
      ),
    },
    {
      title: '操作',
      width: 160,
      valueType: 'option',
      key: 'option',
      render: (_text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            // console.log(action);
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
          查看
        </a>,
        <TableDropdown
          key="actionGroup"
          onSelect={(key) => {
            if (key === 'delete') {
              sites
                .deleteSites({
                  ids: record.id,
                })
                .then((res: any) => {
                  message.success('操作成功!');
                  action?.reload();
                });
            }
          }}
          menus={[
            { key: 'copy', name: '复制' },
            { key: 'delete', name: '删除' },
          ]}
        />,
      ],
    },
  ];

  return columns;
};
