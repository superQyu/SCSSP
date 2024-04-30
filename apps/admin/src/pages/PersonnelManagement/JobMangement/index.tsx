import { useRef, cloneElement, useState, useEffect } from 'react';

import { ProTable } from 'components';
import { type ActionType } from '@ant-design/pro-components';
import { Button, message } from 'antd';
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
        columns={initColumns}
        request={async (params = {}) => {
          // console.log('请求工种列表的参数', params)
          const res = await job.getJobList(params);
          // console.log('工种列表', res.list);
          // res.list.forEach((item: any) => (item.isSpecialWorkType = `${item.isSpecialWorkType}`));
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
          <Button icon={<UploadOutlined />} onClick={() => console.log('导出')} type="primary">
            导出
          </Button>,
        ]}
        editable={{ onDelete, onSave }}
        pagination={{
          pageSize: 10,
        }}
      ></ProTable>
      <EditDialog openModal={dialogVisible} onStateChange={handleModalStateChange} />
    </>
  );
};
