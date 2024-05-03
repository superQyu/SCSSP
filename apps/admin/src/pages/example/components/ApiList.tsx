import { useEffect, useRef, useState } from 'react';
import { EditOutlined, RadarChartOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from 'components';
import { Button, Tag, Form, Input, Radio, Alert, Typography, Collapse } from 'antd';
import type { CollapseProps } from 'antd';

import { AdForm } from 'components';

import ApiListSummary from '@/apis';

interface Unlimit {
  [key: string]: any;
}
export type Status = {
  color: string;
  text: string;
};

export type TableListItem = {
  name: string;
  path: string;
  function: string;
  lists: Unlimit[];
};
const tableListDataSource: TableListItem[] = Object.entries(ApiListSummary).map(([name, v]) => {
  let _lists = v;
  if (!Array.isArray(v)) {
    _lists = Object.entries(_lists).map(([_, list]) => list);
  }

  return {
    name,
    path: `@/apis/${name}.api.ts`,
    function: `await ${name}[key]() /  ${name}[key]().then().catch()`,
    lists: _lists,
  };
});

const columns: ProColumns<TableListItem>[] = [
  {
    title: '名称',
    width: 120,
    dataIndex: 'name',
    render: (_) => <a>{_}</a>,
  },
  {
    title: '路径',
    hideInSearch: true,
    dataIndex: 'path',
  },
  {
    title: '调用方法',
    hideInSearch: true,
    dataIndex: 'function',
    render: (_) => (
      <Typography.Text style={{ whiteSpace: 'pre-wrap' }} type="success" code>
        {`${_}`}
      </Typography.Text>
    ),
  },
];


const CusTagColor = (type: string) => {
  const colors = [
    {
      type: ['POST'],
      color: '#49cc90',
    },
    {
      type: ['PUT', 'PATCH'],
      color: '#fca130',
    },
    {
      type: ['GET', 'HEAD'],
      color: '#61affe',
    },
    {
      type: ['DELETE'],
      color: '#f93e3e',
    },
  ];
  return colors.filter((item) => item.type.indexOf(type) != -1)[0].color || '';
};

const expandedRowRender = ({ lists = [], name }: Unlimit, setSubForm: any, setFormModal: any) => {
  return (
    <div style={{ marginBlockEnd: '20px', width: 'calc(100% - 40px)' }}>
      <ProTable
        request={() => {
          return Promise.resolve({
            data: lists,
            success: true,
          });
        }}
        columns={[
          { title: '主函数名称', dataIndex: 'key', key: 'key' },
          {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            render: (_: any, record: Unlimit) => (
              <Tag color={CusTagColor(record.type.toUpperCase())}>{record.type}</Tag>
            ),
          },
          { title: '接口地址', dataIndex: 'url', key: 'url' },
          { title: '描述', dataIndex: 'description', key: 'description' },
          {
            title: '操作',
            width: 140,
            valueType: 'option',
            key: 'option',
            render: (_text: any, record: any) => [
              <a
                key="editable"
                onClick={() => {
                  setSubForm({ ...record, parentName: name });
                  setFormModal(true);
                }}
              >
                {/* @ts-ignore */}
                {<RadarChartOutlined style={{ marginInlineEnd: '5px' }} />}
                测试
              </a>,
            ],
          },
        ]}
        rowKey={'key'}
        headerTitle={false}
        search={false}
        options={false}
        pagination={false}
        toolBarRender={false}
      />
    </div>
  );
};

export default () => {
  const [subForm, setSubForm] = useState<Record<string, any>>({});
  const [formModal, setFormModal] = useState<boolean>(false);

  useEffect(() => {}, [subForm]);

  return (
    <>
      <Alert
        message={'Api 接口列表汇总'}
        type="success"
        style={{ marginBlockEnd: '25px' }}
        showIcon
      />
      <div style={{ height: 'calc(100% - 65px)' }}>
        <ProTable
          columns={columns}
          request={({ name }: Unlimit) => {
            let tableList = tableListDataSource;
            if (name && name != '') {
              let k = name.toLocaleLowerCase() as string;
              tableList = tableListDataSource.filter(({ lists }) => {
                const isExsit = lists.filter(({ description = '', key: itemk, url: u }) => {
                  return (
                    description.indexOf(k) != -1 ||
                    itemk.toLocaleLowerCase().indexOf(k) != -1 ||
                    u.toLocaleLowerCase().indexOf(k) != -1
                  );
                });
                return isExsit.length;
              });
            }
            return Promise.resolve({
              data: tableList,
              success: true,
            });
          }}
          rowKey="name"
          expandable={{
            expandedRowRender: (record: any) => expandedRowRender(record, setSubForm, setFormModal),
          }}
          dateFormatter="string"
          headerTitle={false}
          options={false}
          search={true}
          pagination={false}
          scroll={{ y: 'auto' }}
          columnsState={{
            persistenceKey: 'pro-table-api-list',
            persistenceType: 'localStorage',
            onChange(_: any) {},
          }}
          toolBarRender={false}
        />
      </div>
    </>
  );
};
