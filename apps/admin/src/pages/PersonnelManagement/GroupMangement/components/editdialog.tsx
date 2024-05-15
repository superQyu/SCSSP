import { useState, useEffect, useRef } from 'react';
import { Modal, Button, message } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { AdForm } from 'components';
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
  detail: MenusType;
}

export default ({ openModal, onStateChange, detail }: Props) => {
  // api 相关
  const { server } = useBasicConfiguration();
  const { group } = server;

  const [open, setOpen] = useState<boolean>(openModal);
  const [title] = useState<string>('添加班组信息');
  const [loading, setLoading] = useState<boolean>(false);

  const formRef = useRef<FormInstance>(null);

  // 表单项配置
  // 只能放在外面, 因为调用该方法中使用 hook, 只能放在函数式组件的外部
  // 传入表单的DOM 和 两个图片列表的默认值
  const { entryAttachments, exitAttachments } = detail;
  const formColumns = initColumns(formRef, entryAttachments, exitAttachments);

  // 班组信息表单的默认值
  const [formData] = useState<MenusType>({
    teamName: detail.teamName,
    subcontractorId: detail.subcontractorId,
    userId: detail.userId,
    workTypeName: detail.workTypeName,
    identityCard: detail.identityCard,
    phone: detail.phone,
    entryDate: detail.entryDate && dayjs(detail.entryDate),
    exitDate: detail.exitDate && dayjs(detail.exitDate),
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
    try {
      const values: MenusType = await formRef.current?.validateFields();
      values.entryAttachments = values.entryAttachments?.join('@');
      values.exitAttachments = values.exitAttachments?.join('@');
      values.id = detail.id;
      console.log('表单提交时的数据', values);
      setLoading(true);
      group[detail.id ? 'updateGroup' : 'createGroup'](values)
        .then(() => {
          message.success('操作成功！');
          setLoading(false);
          onStateChange(false);
          onReset();
        })
        .catch(() => {
          setLoading(false);
        });
    } catch (errorInfo) {}
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
        title={title}
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
          key={JSON.stringify(formData)}
          loadingTitle="提交中..."
          formRef={formRef}
          initialValues={formData}
          loading={loading}
          labelAlign="left"
          columns={formColumns}
        />
      </Modal>
    </>
  );
};
