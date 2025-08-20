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
      title: '车牌号',
      dataIndex: 'realName',
      ellipsis: true,
    },
    {
      hideInSearch: true,
      title: 'GPS设备识别码',
      dataIndex: 'realName',
      ellipsis: true,
    },
    {
      title: '运送时间',
      dataIndex: 'validityEndDate',
      ellipsis: true,

      hideInSearch: true,
      render: (text, record) => {
        return record.validityEndDate
          ? dayjs(record.validityEndDate).format(
              'YYYY-MM-DD HH:mm:ss'
            )
          : '';
      },
    },
  ];

  return columns;
};
