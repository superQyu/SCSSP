import { FormColumnsTypes } from 'components';
import { Select, DatePicker,  } from 'antd';

export default () => {
  const subColumns: FormColumnsTypes[] = [
    {
      label: '车牌号',
      dataIndex: 'realName',
      colNum: 24,
      formItemProps: {
        rules: [{ required: true, message: '请输入设备识别码' }],
      },
    },

    {
      label: 'GPS设备识别码',
      dataIndex: 'province',
      colNum: 24,
      formItemProps: {
        rules: [{ required: true, message: '请输入ip地址' }],
      },
    },
    {
      label: '运送时间',
      dataIndex: 'enterDate',
      colNum: 24,
      formItemProps: {
        rules: [{ required: true, message: '请选择运送时间' }],
      },
      formItem: (
        <DatePicker
          disabled={status == '0' ? false : true}
          showTime
          placeholder="请选择进场时间"
        />
      ),
    },
  ];

  return { subColumns };
};
