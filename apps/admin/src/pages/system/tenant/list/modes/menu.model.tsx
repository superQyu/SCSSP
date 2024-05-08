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
  const { config: C, server } = useBasicConfiguration();

  const { COMMON_STATUS } = C?.DICT_TYPE || {};
  const columns: ProColumns[] = [
    {
      width: 90,
      hideInSearch: true,
      title: '租户编号',
      editable: false,
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: '租户名',
      width: 140,
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '租户套餐',
      hideInSearch: true,
      width: 80,
      dataIndex: 'packageId',
    },
    {
      title: '联系人',
      width: 90,
      dataIndex: 'contactName',
    },
    {
      title: '联系手机',
      width: 160,
      dataIndex: 'contactMobile',
    },
    {
      title: '账号额度',
      hideInSearch: true,
      dataIndex: 'accountCount',
      valueType: 'digit',
      sorter: (a, b) => a.sort - b.sort,
    },
    {
      title: '过期时间',
      hideInSearch: true,
      width: 180,
      dataIndex: 'expireTime',
      ellipsis: true,
      render: (_, record) => <>{dayjs(record.expireTime).format('YYYY-MM-DD hh:mm:ss')}</>,
    },
    {
      hideInSearch: true,
      title: '绑定域名',
      dataIndex: 'website',
    },
    {
      width: 120,
      filters: true,
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      render: (_, record) => (
        <>{record.status == '0' ? <Tag color="green">开启</Tag> : <Tag color="red">关闭</Tag>}</>
      ),
      renderFormItem: () => (
        <DictSelect
          dictKey={`${COMMON_STATUS}`}
          dropdownExtend={false}
          valueEnum={{
            '0': {
              text: (
                <>
                  {/* @ts-ignore  */}
                  <StarTwoTone twoToneColor="#50a14f" style={{ marginRight: '10px' }} />
                  显示
                </>
              ),
            },
            '1': {
              text: (
                <>
                  {/* @ts-ignore  */}
                  <StopTwoTone twoToneColor="red" style={{ marginRight: '10px' }} />
                  隐藏
                </>
              ),
            },
          }}
        />
      ),
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
