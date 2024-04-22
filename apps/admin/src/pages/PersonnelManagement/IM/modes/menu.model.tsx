import { StarTwoTone, StopTwoTone } from '@ant-design/icons';
import { TableDropdown, type ProColumns } from '@ant-design/pro-components';
import { message, Tag } from 'antd';

import { IconSelect, IconShow } from 'ui';
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
      width: 60,
      editable: false,
      hideInSearch: true,
      sorter: true,
      // fixed: 'left',
    },
    {
      width: 80,
      hideInSearch: true,
      title: '头像',
      editable: false,
      dataIndex: 'avatar',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 120,
      ellipsis: true,
    },
    {
      width: 60,
      hideInSearch: true,
      title: '性别',
      dataIndex: 'gender',
    },
    {
      hideInSearch: true,
      editable: false,
      title: '身份证号',
      dataIndex: 'identityCard',
    },
    {
      width: 80,
      hideInSearch: true,
      title: '民族',
      ellipsis:true,
      dataIndex: 'nationality',
    },
    {
      width: 220,
      hideInSearch: true,
      title: '出生日期',
      dataIndex: 'birthday',
    },
    {
      width: 120,
      title: '电话号码',
      dataIndex: 'phone',
    },
    {
      title: '家庭住址',
      width: 220,
      key: 'address',
    },
    {
      hideInSearch: true,
      width: 220,
      title: '进场时间',
      dataIndex: 'name',
    },
    {
      hideInSearch: true,
      title: '分包单位',
      dataIndex: 'companyName',
    },
    {
      hideInSearch: true,
      width: 120,
      title: '劳务工种',
      dataIndex: 'workType',
    },
    {
      hideInSearch: true,
      width: 220,
      title: '班组名',
      dataIndex: 'name',
    },
    {
      hideInSearch: true,
      width: 100,
      title: '是否班组长',
      dataIndex: 'name',
    },
    {
      hideInSearch: true,
      width: 220,
      title: '计价方式',
      dataIndex: 'name',
    },
    {
      hideInSearch: true,
      width: 220,
      title: '合同签订日',
      dataIndex: 'name',
    },
    {
      hideInSearch: true,
      title: '是否零工',
      dataIndex: 'name',
    },
    {
      title: '操作',
      width: 140,
      valueType: 'option',
      key: 'option',
      // fixed: 'right',
      render: (_text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
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
