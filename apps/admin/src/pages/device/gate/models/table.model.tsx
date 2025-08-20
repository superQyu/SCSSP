import { type ProColumns } from '@ant-design/pro-components';
import { message, Switch } from 'antd';

import DictTag from '@/components/DictSelect/DictTag';
import DictSelect from '@/components/DictSelect';

type objJson = Record<string, any>;

type MenusPropsType = {
  server?: objJson;
};

export interface ColumnsParamsProps extends objJson {
  subcontractorType: number | string;
  realName: string;
  corpCode: string;
  legalRepresentative: number | string;
  registeredCapital: string;
  unitAddress: string;
  principal: string;
  principalTel: string;
}

export default ({ server }: MenusPropsType) => {
  const { menus: M } = server as objJson;
  const onChange = (checked: boolean, id: string) => {
    console.log(`switch to ${checked}`);
    console.log('id', id);
    message.success('操作成功');
  };

  const columns: ProColumns[] = [
    {
      title: '序号',
      valueType: 'indexBorder',
      dataIndex: 'index',
      fixed: 'left',
      ellipsis: true,
      width: 80,
      render: (text: any, record: any, index: number) => {
        return index + 1;
      },
    },
    {
      title: '闸机名称',
      dataIndex: 'realName',
      order: 1,
    },
    {
      title: '闸机状态',
      dataIndex: 'corpType',
      ellipsis: true,
      width: 200,
      render: (_, record) => {
        return (
          <DictTag
            value={record.corpType}
            dictKey="gate_status"
          />
        );
      },
      renderFormItem: () => {
        return <DictSelect dictKey="gate_status" />;
      },
    },
    {
      title: '是否常开',
      dataIndex: 'isAlwaysOpen',
      hideInSearch: true,
      width: 200,
      render: (_, record) => {
        return (
          <Switch
            checked={record.isAlwaysOpen}
            onChange={(val: boolean) => onChange(val, record.id)}
          />
        );
      },
    },
  ];

  return columns;
};
