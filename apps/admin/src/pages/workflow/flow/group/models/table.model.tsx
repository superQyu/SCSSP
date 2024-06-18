import { useEffect, useState } from 'react';

import { type ProColumns } from '@ant-design/pro-components';
import { Select, Tag } from 'antd';
import DictSelect from '@/components/DictSelect';
import { Text } from 'components';
import dayjs from 'dayjs';

type objJson = Record<string, any>;

type MenusPropsType = {
  server?: objJson;
};

export default ({ server }: MenusPropsType) => {
  const { systemUser } = server as objJson;

  const columnWidth = undefined;

  const [userList, setUserList] = useState<any[]>([]);

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () => {
    const res = await systemUser.getSimpleUserList();
    // console.log('系统用户列表', res);
    setUserList(res);
  };

  const columns: ProColumns[] = [
    {
      title: '编号',
      dataIndex: 'id',
      // fixed: 'left',
      ellipsis: true,
      width: columnWidth,
      hideInSearch: true,
    },
    {
      title: '组名',
      dataIndex: 'name',
      ellipsis: true,
      width: columnWidth,
      // hideInSearch: true,
    },
    {
      title: '描述',
      dataIndex: 'description',
      ellipsis: {
        showTitle: true,
      },
      width: columnWidth,
      hideInSearch: true,
    },
    {
      title: '成员',
      dataIndex: 'memberUserIds',
      ellipsis: true,
      width: columnWidth,
      hideInSearch: true,
      render: (_, record) => {
        const textArr = record.memberUserIds.map((userId: any, index: number) => {
          return userList.find((user) => user.id === userId)?.nickname;
        });
        // console.log('textArr', textArr);
        const text = textArr.join(' ');
        return <Text ellipsis={{ tooltip: text }}>{text}</Text>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      ellipsis: true,
      width: columnWidth,
      // hideInSearch: true,
      render: (_, record) => (
        <>{record.status == '0' ? <Tag color="green">开启</Tag> : <Tag color="red">关闭</Tag>}</>
      ),
      renderFormItem: () => <DictSelect dictKey="common_status"></DictSelect>,
    },
    {
      title: '创建时间',
      valueType: 'dateRange',
      dataIndex: 'createTime',
      ellipsis: {
        showTitle: true,
      },
      width: columnWidth,
      // hideInSearch: true,
      render: (_, record) => {
        const text = record.createTime && dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss');
        return <Text ellipsis={{ tooltip: text }}>{text}</Text>;
      },
    },
  ];

  return columns;
};
