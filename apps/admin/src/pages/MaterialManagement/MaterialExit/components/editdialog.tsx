import { useState, useEffect, useRef } from 'react';
import { Modal, Button, message, Popconfirm, Form } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { type ActionType } from '@ant-design/pro-components';
import { AdForm, EditTable } from 'components';
import { PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import initColumns from '../models/form.model';

// api 相关
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

// 代表任意对象
type MenusType = {
  [key: string]: any;
};
interface Props {
  /** 控制 Modal 是否显示 */
  openModal: boolean;
  /** 监听 Modal 状态变化 */
  onStateChange: (state: boolean) => void;
  // 当为详情表单时, 有该属性
  detail?: MenusType;
}

export default ({ openModal, onStateChange, detail = {} }: Props) => {
  // api 相关
  const { server } = useBasicConfiguration();
  const { materialExit } = server;

  const [open, setOpen] = useState<boolean>(openModal);
  const [loading, setLoading] = useState<boolean>(false);

  // 表单 DOM
  const formRef = useRef<FormInstance>(null);
  // 可编辑表格 DOM
  const actionRef = useRef<any>(null);
  // 自定义的表格 ref,主要用来抛出自定义的方法
  const tableRef = useRef<any>(null);
  // 可编辑表格的 Form 的 DOM
  const editableFormRef = useRef<any>(null);

  // 表单项配置
  // 只能放在外面, 因为调用该方法中使用 hook, 只能放在函数式组件的外部
  // 传入表单的DOM 和 两个图片列表的默认值
  // const { materialsDetailsWithInventoryRespVOS } = detail;
  const { formColumns, tableColumns } = initColumns(tableRef, editableFormRef);

  // 分包商信息表单的默认值
  const [formData, setFormData] = useState<MenusType>({
    exitDate: detail.exitDate && dayjs(detail.exitDate),
    exitPersonnel: detail.exitPersonnel,
    witnessPersonnel: detail.witnessPersonnel,
    supplierDepartment: detail.supplierDepartment,
    manufacturer: detail.manufacturer,
    purchaserDepartment: detail.purchaserDepartment,
  });

  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  // 点击重置
  const onReset = () => {
    if (loading) {
      message.warning(`数据提交中,请稍等...`);
      return;
    }
    formRef.current?.resetFields();
  };

  // 点击保存
  const handleOk = async () => {
    const materialsExitSaveReqVO: MenusType = await formRef.current?.validateFields();
    materialsExitSaveReqVO.exitDate = materialsExitSaveReqVO.exitDate.valueOf();
    materialsExitSaveReqVO.id = detail.id;
    const table = tableRef.current?.getTableData();
    const materialsExitDetailsSaveReqVOS = table.map((item: any) => {
      return {
        // 如果 id 为number, 则是编辑
        id: typeof item.id == 'number' ? item.id : undefined,
        materialExitId: detail.id,
        materialsInventoryId: item.materialsInventoryId,
        materialType: item.materialType,
        exitNumber: item.exitNumber,
        attachment: item.attachment,
      };
    });
    // console.log('所有表格数据', materialsExitDetailsSaveReqVOS);
    const values = { materialsExitSaveReqVO, materialsExitDetailsSaveReqVOS };
    // console.log('表单提交时的数据', values);
    setLoading(true);
    materialExit[detail.id ? 'updateExit' : 'createExit'](values)
      .then(() => {
        message.success('操作成功！');
        setLoading(false);
        onStateChange(false);
        onReset();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  // 点击取消
  const handleCancel = () => {
    if (loading) {
      message.warning(`数据提交中,请稍等...`);
      return;
    }
    setOpen(false);
    onReset();
    onStateChange(false);
  };

  return (
    <>
      <Modal
        open={open}
        title={detail.id ? '编辑' : '新增'}
        width={1000}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        footer={[
          <Button key="back" onClick={handleCancel} disabled={loading}>
            取消
          </Button>,
          <Button key="reset" htmlType="reset" onClick={onReset} disabled={loading}>
            重置
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            {detail.id ? '更新' : '提交'}
          </Button>,
        ]}
      >
        <AdForm
          loadingTitle="提交中..."
          formRef={formRef}
          initialValues={formData}
          loading={loading}
          labelAlign="left"
          columns={formColumns}
        />
        <EditTable
          // key={`${detail.materialsExitDetailsSaveReqVOS}`}
          ref={tableRef}
          actionRef={actionRef}
          editableFormRef={editableFormRef}
          headerTitle="物料列表"
          columns={[
            ...tableColumns,
            {
              title: '操作',
              width: 100,
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
                  onConfirm={() => {
                    // console.log('tableRef', tableRef);
                    tableRef.current?.removeRow(record);
                  }}
                  okText="确认"
                  cancelText="取消"
                >
                  <a>删除</a>
                </Popconfirm>,
              ],
            },
          ]}
          request={async (params = {}) => {
            // console.log('表格数据', detail);
            return {
              success: true,
              data: detail.materialsExitDetailsWithInventoryRespVOS || [],
              // total: res.total,
            };
          }}
          form={{
            ignoreRules: false,
          }}
          scroll={{ y: 'auto' }}
          search={false}
          toolBarRender={() => [
            <Button
              icon={<PlusOutlined />}
              onClick={() =>
                actionRef.current?.addEditRecord?.(
                  {
                    id: (Math.random() * 1000000).toFixed(0),
                    // title: '新的一行',
                  },
                  { position: 'top' }
                )
              }
              type="primary"
            >
              新建
            </Button>,
          ]}
          pagination={{
            pageSize: 10,
          }}
        ></EditTable>
      </Modal>
    </>
  );
};
