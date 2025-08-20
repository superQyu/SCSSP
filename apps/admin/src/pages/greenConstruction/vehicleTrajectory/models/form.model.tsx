import { FormColumnsTypes } from 'components';

export default () => {
  const subColumns: FormColumnsTypes[] = [
    {
      label: '设备识别码',
      dataIndex: 'realName',
      colNum: 24,
      formItemProps: {
        rules: [{ required: true, message: '请输入设备识别码' }],
      },
    },

    {
      label: 'ip地址',
      dataIndex: 'province',
      colNum: 24,
      formItemProps: {
        rules: [{ required: true, message: '请输入ip地址' }],
      },
    },
  ];

  return { subColumns };
};
