import { StarTwoTone, StopTwoTone } from '@ant-design/icons';
import { TableDropdown, type ProColumns } from '@ant-design/pro-components';
import { message, Tag } from 'antd';
import dayjs, { type Dayjs } from 'dayjs';

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
  filepath: string;
  isDelete: '0' | '1';
}

export default ({ server }: MenusPropsType) => {
  const { menus: M } = server as objJson;

  const columns: ProColumns[] = [
    {
      width: 60,
      hideInSearch: true,
      title: '编号',
      editable: false,
      dataIndex: 'id',
    },
    {
      title: '角色名称',
      dataIndex: 'name',
      ellipsis: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入角色名称',
          },
        ],
      },
    },
    {
      title: '角色类型',
      hideInSearch: true,
      width: 80,
      dataIndex: 'type',
      ellipsis: true,
      // valueType: 'select',
      // render: (_, record) => <IconShow ico={record.icon} />,
      // renderFormItem: () => <IconSelect model="simple" />,
    },
    {
      hideInSearch: true,
      title: '角色标识',
      dataIndex: 'code',
      // formItemProps: {
      //   rules: [
      //     {
      //       required: true,
      //       message: '请输入排序',
      //     },
      //   ],
      // },
    },
    {
      width: 120,
      hideInSearch: true,
      title: '显示排序',
      valueType: 'digit',
      dataIndex: 'sort',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入排序',
          },
        ],
      },
    },
    {
      hideInSearch: true,
      title: '备注',
      dataIndex: 'remark',
    },
    {
      width: 120,
      hideInSearch: true,
      title: '状态',
      dataIndex: 'status',
      initialValue: '',
      valueType: 'select',
      filters: true,
      valueEnum: {
        '0': {
          text: (
            <>
              <StarTwoTone twoToneColor="#50a14f" style={{ marginRight: '10px' }} />
              开启
            </>
          ),
        },
        '1': {
          text: (
            <>
              <StopTwoTone twoToneColor="red" style={{ marginRight: '10px' }} />
              关闭
            </>
          ),
        },
      },
      render: (_, record) => (
        <>{record.status == '0' ? <Tag color="green">开启</Tag> : <Tag color="red">关闭</Tag>}</>
      ),
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请选择状态',
          },
        ],
      },
    },

    {
      title: '创建时间',
      hideInSearch: true,
      width: 180,
      editable: false,
      dataIndex: 'createTime',
      ellipsis: true,
      // valueType: 'select',
      render: (_, record) => <>{dayjs(record.createTime).format('YYYY-MM-DD hh:mm:ss')}</>,
    },
  ];

  return columns;
};
