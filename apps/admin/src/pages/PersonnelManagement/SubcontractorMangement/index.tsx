import { useRef, cloneElement, useState } from 'react';

import { ProTable } from 'components';
import { type ActionType } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import EditDialog from './components/editdialog';

// api 相关
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
// 表格相关
import type { ModesApi } from './models/model';
import siteModel, { type ColumnsParamsProps } from './models/table.model';

export default () => {
  // api 相关
  const { server } = useBasicConfiguration();
  const { subContractor } = server;

  // 初始化表格列
  const initColumns = siteModel({ server });
  const actionRef = useRef<ActionType>();

  const [dialogVisible, setDialogVisible] = useState<boolean>(false);

  // 修改表单打开关闭状态
  const handleModalStateChange = async (state: boolean) => {
    setDialogVisible(state);
    await actionRef.current?.reload();
  };

  // 重写save方法 阻止提交失败也退出编辑状态
  const onSave = async (...args: any[]) => {
    const [config, id, n, , ,] = args;
    console.log('更新分包商的请求参数', n);
    // 更新行数据
    const res = await subContractor
      .updateSubContractor(JSON.parse(JSON.stringify({ ...n })) as ColumnsParamsProps)
      .then(async () => {
        message.success('信息更新成功！');
        await actionRef.current?.reload();
      })
      .catch(() => false);
    if (res === false) {
      message.error('信息更新失败，请重新提交！');
      return false;
    }
    // 保存时解除编辑模式
    config.cancelEditable(id);
    return true;
  };

  // 删除行
  const onDelete = async (id: number) => {
    try {
      await subContractor
        .deleteMenus({ ids: id })
        .then(async () => {
          message.success('操作成功!');
          await actionRef.current?.reload();
        })
        .catch(() => {});
    } catch (errorInfo) {}
  };

  return (
    <>
      <ProTable
        actionRef={actionRef}
        headerTitle="分包商列表"
        columns={initColumns}
        request={async (params = {}) => {
          const res = await subContractor.getSubContractorList(params);
          // console.log('工种列表', res.list);
          return {
            ...params,
            data: res.list,
            total: res.total,
          } as unknown as ModesApi.pageItemType;
        }}
        form={{
          ignoreRules: false,
        }}
        toolBarRender={() => [
          <Button icon={<PlusOutlined />} onClick={() => setDialogVisible(true)} type="primary">
            新建
          </Button>,
        ]}
        editable={{
          type: 'multiple',
          onSave,
          onDelete,
          actionRender: (...args: any[]) => {
            const [, config, defaultDom] = args;
            return [
              cloneElement(defaultDom.save as React.ReactElement, {
                onSave: onSave.bind(null, config),
              }),
              defaultDom.cancel,
              defaultDom.delete,
            ];
          },
        }}
      ></ProTable>
      <EditDialog openModal={dialogVisible} onStateChange={handleModalStateChange} />
    </>
  );
};
