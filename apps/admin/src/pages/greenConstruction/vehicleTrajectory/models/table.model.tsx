import { type ProColumns } from '@ant-design/pro-components';
import { message } from 'antd';

import DictText from '@/components/DictSelect/DictText';
import DictSelect from '@/components/DictSelect';
import dayjs from 'dayjs';
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
      title: '设备识别码',
      dataIndex: 'realName',
      ellipsis: true,
    },
    {
      hideInSearch: true,
      title: 'ip地址',
      dataIndex: 'realName',
      ellipsis: true,
    },
    {
      hideInSearch: true,
      title: '当前状态',
      dataIndex: 'subcontractorType',
      ellipsis: true,
      render: (_, record) => {
        return (
          <DictText
            value={record.subcontractorType}
            dictKey="subcontractor_type"
          />
        );
      },
      renderFormItem: () => {
        return <DictSelect dictKey="subcontractor_type" />;
      },
    },
    {
      hideInSearch: true,
      title: '当前绑定车辆',
      dataIndex: 'realName',
    },
  ];

  return columns;
};
