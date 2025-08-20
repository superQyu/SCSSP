import { type ProColumns } from '@ant-design/pro-components';
import { message, Radio } from 'antd';

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

  const handleModeChange = (e: any) => {
    console.log(e.target.value);
    // console.log('id', id);
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
      title: '姓名',
      dataIndex: 'realName',
    },
    {
      title: '电话',
      dataIndex: 'realName',
      hideInSearch: true,
      // width: 160,
    },
    {
      title: '性别',
      dataIndex: 'corpType',
      hideInSearch: true,
      width: 100,
      render: (_, record) => {
        return (
          <DictText
            value={record.corpType}
            dictKey="pm_gender"
          />
        );
      },
      renderFormItem: () => {
        return <DictSelect dictKey="gate_status" />;
      },
    },
    {
      title: '上一次进场时间',
      dataIndex: 'createTime',
      hideInSearch: true,
      width: 180,
      render: (_, record) =>
        dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '在场清点',
      dataIndex: 'corpType',
      hideInSearch: true,
      width: 180,
      render: (_, record) => {
        return (
          <Radio.Group
            onChange={handleModeChange}
            defaultValue={record.corpType}
            buttonStyle="solid"
          >
            <Radio.Button value="1">在场</Radio.Button>
            <Radio.Button value="0">离场</Radio.Button>
          </Radio.Group>
        );
      },
    },
  ];

  return columns;
};
