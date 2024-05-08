import { StarTwoTone, StopTwoTone } from '@ant-design/icons';
import { DatePicker } from 'antd';

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
      width: 120,
      hideInSearch: true,
      title: '租户编号',
      editable: false,
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: '套餐名',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
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
      title: '备注',
      hideInSearch: true,
      dataIndex: 'remark',
    },
    {
      title: '创建时间',
      width: 180,
      editable: false,
      dataIndex: 'createTime',
      ellipsis: true,
      render: (_, record) => <>{dayjs(record.createTime).format('YYYY-MM-DD hh:mm:ss')}</>,
      renderFormItem: () => <DatePicker.RangePicker />,
    },
  ];

  return columns;
};
