import { FormColumnsTypes } from 'components';
import { DatePicker } from 'antd';

import DictSelect from '@/components/DictSelect';

export default () => {
  const subColumns: FormColumnsTypes[] = [
    {
      label: '设备名称',
      dataIndex: 'realName',
      colNum: 24,
      formItemProps: {
        rules: [{ required: true, message: '请输入设备名称' }],
      },
    },
    {
      label: '设备类型',
      dataIndex: 'subcontractorType',
      colNum: 24,
      formItemProps: {
        rules: [{ required: true, message: '请选择设备类型' }],
      },
      formItem: <DictSelect dictKey={'subcontractor_type'} />,
    },
    {
      label: '安装日期',
      dataIndex: 'regDate',
      colNum: 24,
      formItem: <DatePicker style={{ width: '100%' }} />,
    },
    {
      label: '安装位置',
      dataIndex: 'province',
      colNum: 24,
      formItemProps: {
        rules: [{ required: true, message: '请输入安装位置' }],
      },
    },
  ];

  return { subColumns };
};
