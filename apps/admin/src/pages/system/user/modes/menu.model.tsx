import { StarTwoTone, StopTwoTone } from '@ant-design/icons';
import { type ProColumns } from '@ant-design/pro-components';
import { Tag } from 'antd';
import dayjs from 'dayjs';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import DictSelect from '@/components/DictSelect';

import type { ModesApi } from './model';
type ParamsType = Record<string, any>;

interface MenusPropsType extends ModesApi.ParamsType {
  server?: ModesApi.ParamsType;
}

export interface ColumnsParamsProps extends ParamsType {
  id: number;
  nickname: string;
  remark: string;
  deptId: any;
  deptName: string;
  postIds: number[];
  email: string;
  mobile: string;
  sex: number;
  avatar: string;
  status: number;
  loginIp: string;
  loginDate: string;
  createTime: string;
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
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: '用户名称',
      editable: false,
      dataIndex: 'username',
      ellipsis: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入用户名称',
          },
        ],
      },
    },
    {
      title: '用户昵称',
      hideInSearch: true,
      dataIndex: 'nickname',
      ellipsis: true,
    },
    {
      hideInSearch: true,
      ellipsis: true,
      title: '部门',
      editable: false,
      dataIndex: 'deptName',
    },
    {
      ellipsis: true,
      title: '手机号码',
      dataIndex: 'mobile',
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
                  {/* @ts-ignore */}
                  <StopTwoTone twoToneColor="red" style={{ marginRight: '10px' }} />
                  关闭
                </>
              ),
            },
          },
        } as ModesApi.ParamsType;
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
