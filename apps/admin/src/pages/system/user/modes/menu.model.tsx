import { StarTwoTone, StopTwoTone } from '@ant-design/icons';
import { type ProColumns } from '@ant-design/pro-components';
import { Tag } from 'antd';
import dayjs from 'dayjs';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import DictSelect from '@/components/DictSelect';

type ParamsType = Record<string, any>;

type MenusPropsType = {
  server?: ParamsType;
};

export interface ColumnsParamsProps extends ParamsType {
  id: number;
  name: string;
  ico: string;
  orderNum: number;
  roleKey: number | string;
  filepath: string;
  isDelete: '0' | '1';
}

export default (_: MenusPropsType) => {
  const { config: C } = useBasicConfiguration();
  const { COMMON_STATUS } = C?.DICT_TYPE || {};

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
    },
    {
      hideInSearch: true,
      title: '角色标识',
      dataIndex: 'code',
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
      filters: true,
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      renderFormItem: (...args: any[]) => {
        const [_, { record }] = args;
        let p = {
          dropdownExtend: false,
          dictKey: `${COMMON_STATUS}`,
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
        } as ParamsType;
        return <DictSelect {...p} />;
      },
      render: (_, record) => (
        <>{record.status == '0' ? <Tag color="green">开启</Tag> : <Tag color="red">关闭</Tag>}</>
      ),
      formItemProps: {
        rules: [{ required: true, message: '请选择状态' }],
      },
    },
    {
      title: '创建时间',
      hideInSearch: true,
      width: 180,
      editable: false,
      dataIndex: 'createTime',
      ellipsis: true,
      render: (_, record) => <>{dayjs(record.createTime).format('YYYY-MM-DD hh:mm:ss')}</>,
    },
  ];

  return columns;
};
