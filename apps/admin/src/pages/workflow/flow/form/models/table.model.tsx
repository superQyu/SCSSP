import { useEffect, useState } from 'react';

import { type ProColumns } from '@ant-design/pro-components';
import { Select, Tag } from 'antd';
import DictSelect from '@/components/DictSelect';
import dayjs from 'dayjs';

type objJson = Record<string, any>;

type MenusPropsType = {
  server?: objJson;
};

export default ({ server }: MenusPropsType) => {
  const { flow } = server as objJson;

  const columnWidth = undefined;

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
      title: '表单名',
      dataIndex: 'name',
      ellipsis: true,
      width: columnWidth,
      // hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      ellipsis: true,
      width: columnWidth,
      hideInSearch: true,
      render: (_, record) => (
        <>{record.status == '0' ? <Tag color="green">开启</Tag> : <Tag color="red">关闭</Tag>}</>
      ),
    },
    {
      title: '备注',
      dataIndex: 'remark',
      ellipsis: true,
      width: columnWidth,
      editable: false,
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      ellipsis: true,
      width: columnWidth,
      hideInSearch: true,
      render: (_, record) => {
        return (
          <span>{record.createTime && dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss')}</span>
        );
      },
    },
  ];

  return columns;
};
