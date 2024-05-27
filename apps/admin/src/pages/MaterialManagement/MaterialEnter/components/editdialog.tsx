import { useState, useEffect, useRef, useMemo } from 'react';
import { Modal, Button, message, Popconfirm, Form } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { type ActionType } from '@ant-design/pro-components';
import { AdForm, ProUpload } from 'components';
import dayjs from 'dayjs';
import EditTable from './Table';
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
  const { materialEnter } = server;

  const [open, setOpen] = useState<boolean>(openModal);
  const [loading, setLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState([]);

  // 表单 DOM
  const formRef = useRef<FormInstance>(null);
  // 自定义的表格 ref,主要用来抛出自定义的方法
  const tableRef = useRef<any>();
  // 可编辑表格的 Form 的 DOM
  const editableFormRef = useRef<any>();

  // 表单项配置
  // 只能放在外面, 因为调用该方法中使用 hook, 只能放在函数式组件的外部
  const { formColumns, tableColumns } = initColumns(tableRef, editableFormRef);

  // 分包商信息表单的默认值
  const [formData, setFormData] = useState<MenusType>({
    enterDate: detail.enterDate && dayjs(detail.enterDate),
    deliveryMan: detail.deliveryMan,
    materialMan: detail.materialMan,
    supplierDepartment: detail.supplierDepartment,
    manufacturer: detail.manufacturer,
    purchaserDepartment: detail.purchaserDepartment,
  });

  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);
  useEffect(() => {
    const list = detail.materialsDetailsWithInventoryRespVOS?.map((item: any) => {
      return { ...item, attachment: item.attachment?.split('@') };
    });
    setTableData(list);
    // console.log('detail', detail)
  }, []);

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
    const editRow = tableRef.current.getCurrentRow();
    // console.log('当前尚在编辑的行', editRow);
    if (editRow) {
      message.error('有未保存行, 请先保存');
      return;
    }
    const materialsEnterSaveReqVO: MenusType = await formRef.current?.validateFields();
    materialsEnterSaveReqVO.enterDate = materialsEnterSaveReqVO.enterDate.valueOf();
    materialsEnterSaveReqVO.id = detail.id;
    const table = tableRef.current?.getTableData();
    // console.log('所有表格数据', table);
    const materialsEnterDetailsSaveReqVOS = table.map((item: any) => {
      return {
        // 如果 id 为number, 则是编辑
        id: typeof item.id == 'number' ? item.id : undefined,
        materialEnterId: detail.id,
        materialsInventoryId: item.materialsInventoryId,
        materialType: item.materialType,
        enterNumber: item.enterNumber,
        attachment: item.attachment?.join('@'),
      };
    });
    const values = { materialsEnterSaveReqVO, materialsEnterDetailsSaveReqVOS };
    // console.log('表单提交时的数据', values);
    setLoading(true);
    materialEnter[detail.id ? 'updateEnter' : 'createEnter'](values)
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
        <div className="h-70vh p-inline-4" style={{ overflow: 'hidden auto' }}>
          <AdForm
            loadingTitle="提交中..."
            formRef={formRef}
            initialValues={formData}
            loading={loading}
            labelAlign="left"
            columns={formColumns}
          />
          <EditTable
            tableRef={tableRef}
            editableFormRef={editableFormRef}
            columns={tableColumns}
            tableData={tableData}
          />
        </div>
      </Modal>
    </>
  );
};
