import { UserOutlined, StarTwoTone, StopTwoTone } from '@ant-design/icons';
import { TableDropdown, type ProColumns } from '@ant-design/pro-components';
import { message, Avatar, Tag } from 'antd';

import { IconSelect, IconShow } from 'ui';
import DictSelect from '@/components/DictSelect';
import DictText from '@/components/DictSelect/DictText';

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

const url =
  'https://img1.baidu.com/it/u=1377073336,1053961489&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500';

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
      fixed: 'left',
    },
    {
      width: 60,
      hideInSearch: true,
      title: '头像',
      editable: false,
      dataIndex: 'passportPhoto',
      render: (_, record) => (
        <Avatar
          icon={<UserOutlined />}
          src={record.passportPhoto || <img src={url} alt={record.name} />}
        />
      ),
      // renderFormItem: () => <IconSelect model="simple" />,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 120,
      ellipsis: true,
    },
    {
      width: 120,
      hideInSearch: true,
      title: '性别',
      dataIndex: 'gender',
      // type='text'
      render: (_, record) => <DictText value={record.gender} dictKey={`pm_gender`} />,
    },
    {
      width: 160,
      hideInSearch: true,
      editable: false,
      title: '身份证号',
      dataIndex: 'identityCard',
    },
    {
      width: 80,
      hideInSearch: true,
      title: '民族',
      ellipsis: true,
      dataIndex: 'nationality',
    },
    {
      hideInSearch: true,
      title: '出生日期',
      dataIndex: 'birthday',
    },
    {
      title: '电话号码',
      dataIndex: 'phone',
    },
    {
      title: '家庭住址',
      key: 'address',
    },
    {
      hideInSearch: true,
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
      title: '劳务工种',
      dataIndex: 'workType',
    },
    {
      hideInSearch: true,
      title: '班组名',
      dataIndex: 'name',
    },
    {
      hideInSearch: true,
      title: '是否班组长',
      dataIndex: 'name',
    },
    {
      hideInSearch: true,
      title: '计价方式',
      dataIndex: 'name',
    },
    {
      hideInSearch: true,
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
      fixed: 'right',
      render: (_text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
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
