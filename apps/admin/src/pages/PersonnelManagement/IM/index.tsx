import { cloneElement, useRef, useState, useEffect } from 'react';
import { useRoute } from 'hooks';

import { ProTable } from 'components';
// import { ProTable } from '@ant-design/pro-components';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { Button, message, DatePicker, Space, Table, Alert, Popconfirm } from 'antd';
import Styled from '@/components/Styled';

import { PlusOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons';

import { useAppSelector } from 'hooks';

const { RangePicker } = DatePicker;

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

const ProcessMap = {
  close: 'normal',
  running: 'active',
  online: 'success',
  error: 'exception',
} as const;

export type TableListItem = {
  key: number;
  name: string;
  progress: number;
  containers: number;
  callNumber: number;
  creator: string;
  status: string;
  createdAt: number;
  memo: string;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

for (let i = 0; i < 50; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName-' + i,
    containers: Math.floor(Math.random() * 20),
    callNumber: Math.floor(Math.random() * 2000),
    progress: Math.ceil(Math.random() * 100) + 1,
    creator: creators[Math.floor(Math.random() * creators.length)],
    status: valueEnum[((Math.floor(Math.random() * 10) % 4) + '') as '0'],
    createdAt: Date.now() - Math.floor(Math.random() * 100000),
    memo: i % 2 === 1 ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴' : '简短备注文案',
  });
}

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

// 人员管理表格模型
import type { ModesApi } from './modes/model';
import PMmodel, { type ColumnsParamsProps } from './modes/PM.model';

export default () => {
  const {
    common: { dictionary },
  } = useAppSelector((state) => state) as { common: { dictionary: Record<string, any> } };
  const actionRef = useRef<ActionType>();
  const { server } = useBasicConfiguration();
  //  api server
  const { PMIM: P, menus: M } = server;

  // 初始化 表格列表项
  const initColumns = PMmodel({ server });

  // 路由跳转
  const { tabNavigate } = useRoute();

  // 删除行
  const onDelete = async (id: number) => {
    const res = await M.deleteMenus({ ids: id }).then(async () => {
      message.success('操作成功!');
      await actionRef.current?.reload();
    });
    return res;
  };

  const onSave = async (params: any) => {
    const res = await M.updateMenu(
      JSON.parse(JSON.stringify({ ...params })) as ColumnsParamsProps
    ).then(async () => {
      message.success('信息更新成功！');
      await actionRef.current?.reload();
    });
    return res;
  };

  return (
    <>
      {/* <Alert message="表格字典为同步" type="warning" showIcon /> */}
      <ProTable
        request={async (params = {}) => {
          const res = await P.personnelInfoList({ ...params });
          return {
            ...params,
            data: res.list,
            total: res.total,
          } as unknown as ModesApi.pageItemType;
        }}
        columns={[
          ...initColumns,
          {
            title: '操作',
            width: 140,
            valueType: 'option',
            key: 'option',
            fixed: 'right',
            render: (_text: any, record: any, _: any, action: any) => [
              <a
                key="editable"
                onClick={() => {
                  // action?.startEditable?.(record.id);
                  tabNavigate({
                    namePath: `项目人员管理/人员详情${record.id}`,
                    routePath: `/PersonDetail/?id=${record.id}`,
                  });
                }}
              >
                编辑
              </a>,
              <Popconfirm
                key="delete"
                title="删除此项"
                onConfirm={() => onDelete(record.id)}
                okText="确认"
                cancelText="取消"
              >
                <a>删除</a>
              </Popconfirm>,
            ],
          },
        ]}
        scroll={{ x: 1900, y: 'auto' }}
        onSubmit={async (params: {}) => {}}
        pagination={{
          pageSize: 30,
        }}
        rowKey="id"
        headerTitle="人员管理"
        columnsState={{
          persistenceKey: 'pro-table-pm-im',
          persistenceType: 'localStorage',
          onChange(_: any) {},
        }}
        form={{
          syncToUrl: (values: any, _: string) => ({ ...values }),
        }}
        //
        editable={{ onSave }}
        search={{
          labelWidth: 'auto',
          optionRender: ({ searchText }: any, { form }: any, dom: any) => {
            return [
              dom[0],
              <Button
                type="primary"
                key="sub"
                icon={<SearchOutlined />}
                onClick={() => form?.submit()}
              >
                {searchText}
              </Button>,
            ];
          },
        }}
        toolBarRender={() => [
          <Styled.ExportButton api="exportPersonnelInfo" fileName="人员信息导出" />,
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              // console.log(dictionary);
              tabNavigate({ namePath: '项目人员管理/信息采集', routePath: '/PM/IA' });
            }}
            type="primary"
          >
            新建
          </Button>,
        ]}
      />
    </>
  );
};
