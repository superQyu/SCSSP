import { StarTwoTone, StopTwoTone } from '@ant-design/icons';
import { TableDropdown, type ProColumns } from '@ant-design/pro-components';
import { message, Tag } from 'antd';

import { IconSelect, IconShow } from 'ui';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import DictSelect from '@/components/DictSelect';

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

export default (props: MenusPropsType) => {
  const { config: C, server } = useBasicConfiguration();
  const { menus: M } = server as objJson;

  const { COMMON_STATUS } = C?.DICT_TYPE || {};

  const columns: ProColumns[] = [
    {
      title: '菜单名称',
      dataIndex: 'name',
      ellipsis: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入菜单名称',
          },
        ],
      },
    },
    {
      hideInSearch: true,
      title: '地址',
      editable: false,
      dataIndex: 'path',
    },
    {
      width: 60,
      hideInSearch: true,
      title: 'ID编号',
      editable: false,
      dataIndex: 'id',
    },
    {
      title: '图标',
      hideInSearch: true,
      width: 60,
      dataIndex: 'icon',
      ellipsis: true,
      valueType: 'select',
      render: (_, record) => <IconShow ico={record.icon} />,
      renderFormItem: () => <IconSelect model="simple" />,
    },
    {
      width: 120,
      hideInSearch: true,
      title: '排序',
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
      width: 140,
      editable: false,
      title: '权限标识',
      dataIndex: 'permission',
    },
    {
      hideInSearch: true,
      title: '组件路径',
      dataIndex: 'component',
    },
    {
      tooltip: '控制是否在主菜单中显示，不影响路由访问！',
      width: 120,
      hideInSearch: true,
      title: '显示状态',
      dataIndex: 'status',
      valueType: 'select',
      filters: true,
      renderFormItem: (_, { record }) => (
        <DictSelect
          dictKey={`${COMMON_STATUS}`}
          initValue={`${record.status}`}
          dropdownExtend={false}
          onChange={(val) => (record.status = val)}
          valueEnum={{
            '0': {
              text: (
                <>
                  <StarTwoTone twoToneColor="#50a14f" style={{ marginRight: '10px' }} />
                  显示
                </>
              ),
            },
            '1': {
              text: (
                <>
                  <StopTwoTone twoToneColor="red" style={{ marginRight: '10px' }} />
                  隐藏
                </>
              ),
            },
          }}
        />
      ),
      render: (_, record) => (
        <>{record.status == '0' ? <Tag color="green">显示</Tag> : <Tag color="red">隐藏</Tag>}</>
      ),
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请选择显示状态',
          },
        ],
      },
    },
  ];

  return columns;
};
