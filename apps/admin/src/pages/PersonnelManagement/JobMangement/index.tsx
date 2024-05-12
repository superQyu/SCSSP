import { useRef, useState, useEffect } from 'react';

import { ProTable } from 'components';
import { type ActionType } from '@ant-design/pro-components';
import { Button, message, Popconfirm } from 'antd';
import { PlusOutlined, UploadOutlined, SearchOutlined } from '@ant-design/icons';

import EditDialog from './components/editdialog';

// api 相关
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
// 表格相关
import type { ModesApi } from './models/model';
import siteModel, { type ColumnsParamsProps } from './models/table.model';

export default () => {
  // api 相关
  const { server } = useBasicConfiguration();
  const { job } = server;

  // 初始化表格列
  const initColumns = siteModel({ server });
  const actionRef = useRef<ActionType>();

  const [dialogVisible, setDialogVisible] = useState<boolean>(false);

  // 修改表单打开关闭状态
  const handleModalStateChange = async (state: boolean) => {
    setDialogVisible(state);
    await actionRef.current?.reload();
  };

  // 点击保存
  const onSave = async (params: any) => {
    const res = await job.updateJob(params as ColumnsParamsProps).then(async () => {
      message.success('信息更新成功！');
      await actionRef.current?.reload();
    });
    return res;
  };

  // 删除行
  const onDelete = async (id: number) => {
    const res = await job.deleteJob({ id }).then(async () => {
      message.success('信息删除成功！');
      await actionRef.current?.reload();
    });
    return res;
  };

  return (
    <>
      <ProTable
        actionRef={actionRef}
        headerTitle="工种列表"
        columns={[
          ...initColumns,
          {
            title: '操作',
            width: 140,
            valueType: 'option',
            dataIndex: 'option',
            render: (_text: any, record: any, _: any, action: any) => [
              <a
                key="editable"
                onClick={() => {
                  // console.log('点击了编辑')
                  action?.startEditable?.(record.id);
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
        request={async (params = {}) => {
          // console.log('请求工种列表的参数', params)
          const res = await job.getJobList(params);
          // console.log('工种列表', res.list);
          res.list.forEach(
            (item: any) =>
              (item.isSpecialWorkType = item.isSpecialWorkType || `${item.isSpecialWorkType}`)
          );
          return {
            ...params,
            data: res.list,
            total: res.total,
          } as unknown as ModesApi.pageItemType;
        }}
        form={{
          ignoreRules: false,
        }}
        scroll={{ y: 'auto' }}
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
          <Button icon={<PlusOutlined />} onClick={() => setDialogVisible(true)} type="primary">
            新建
          </Button>,
          // <Button icon={<UploadOutlined />} onClick={() => console.log('导出')} type="primary">
          //   导出
          // </Button>,
        ]}
        editable={{ onSave }}
        pagination={{
          pageSize: 10,
        }}
      ></ProTable>
      <EditDialog
        key={`${dialogVisible}`}
        openModal={dialogVisible}
        onStateChange={handleModalStateChange}
      />
    </>
  );
};
