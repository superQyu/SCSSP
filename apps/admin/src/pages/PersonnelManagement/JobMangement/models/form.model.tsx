import { FormColumnsTypes } from 'components';
import { InputNumber, Radio } from 'antd';

const columns: FormColumnsTypes[] = [
  {
    label: '编码',
    dataIndex: 'code',
    formItemProps: {
      rules: [{ required: true, message: '请输入编码' }],
    },
  },
  {
    label: '工种',
    dataIndex: 'name',
    formItemProps: {
      rules: [{ message: '请输入工种' }],
    },
  },
  {
    label: '首字母简拼',
    dataIndex: 'initialsSpell',
    formItemProps: {
      rules: [{ message: '请输入首字母简拼' }],
    },
  },
  {
    label: '排序',
    dataIndex: 'sort',
    formItem: <InputNumber min={0} />,
  },
  {
    label: '是否特殊工种',
    dataIndex: 'isSpecialWorkType',
    formItem: (
      <Radio.Group>
        <Radio value={1}>是</Radio>
        <Radio value={0}>否</Radio>
      </Radio.Group>
    ),
  },
];

export default columns;
