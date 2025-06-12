import { TableDropdown, type ProColumns } from '@ant-design/pro-components';
import { message, Tag } from 'antd';

import DictSelect from '@/components/DictSelect';

type objJson = Record<string, any>;

type MenusPropsType = {
  server?: objJson;
};

export interface ColumnsParamsProps extends objJson {
  code: string;
  name: string;
  initialsSpell: string;
  isSpecialWorkType: number | string;
  sort: number;
}

export default ({ server }: MenusPropsType) => {
  const { menus: M } = server as objJson;

  const columns: ProColumns[] = [
    {
      title: '序号',
      valueType: 'indexBorder',
      dataIndex: 'index',
      ellipsis: true,
      width: 50,
      render: (text: any, record: any, index: number) => {
        return index + 1;
      },
    },
    {
      title: '编号',
      dataIndex: 'code',
      ellipsis: true,
      // width: 48,
    },
    {
      title: '工种名称',
      dataIndex: 'name',
      ellipsis: true,
      // width: 48,
    },
    {
      title: '首字母简拼',
      dataIndex: 'initialsSpell',
      ellipsis: true,
      // width: 100,
    },
    {
      title: '是否特殊工种',
      dataIndex: 'isSpecialWorkType',
      ellipsis: true,
      // minWidth: 100,
      render: (_, record) => (
        <>
          {record.isSpecialWorkType == '1' ? (
            <Tag color="green">是</Tag>
          ) : (
            <Tag color="red">否</Tag>
          )}
        </>
      ),
      renderFormItem: () => {
        return <DictSelect dictKey="is_conformity" />;
      },
    },
    {
      title: '排序',
      dataIndex: 'sort',
      valueType: 'digit',
      ellipsis: true,
      // width: 48,
      hideInSearch: true,
    },
    
  ];

  return columns;
};
