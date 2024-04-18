import { useState, useEffect, useRef } from 'react';
import { Modal, Button, message } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { AdForm } from 'components';

import initColumns from '../models/form.model';

// api 相关
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

interface Props {
  /** 控制 Modal 是否显示 */
  openModal: boolean;
  /** 监听 Modal 状态变化 */
  onStateChange: (state: boolean) => void;
}

type MenusType = {
  [key: string]: any;
};

export default ({ openModal, onStateChange }: Props) => {
  // api 相关
  const { server } = useBasicConfiguration();
  const { job } = server;

  const [open, setOpen] = useState<boolean>(openModal);
  const [title] = useState<string>('添加分包商信息');
  const [loading, setLoading] = useState<boolean>(false);

  const subFormRef = useRef<FormInstance>(null);
  const addressFormRef = useRef<FormInstance>(null);

  // 表单项配置
  const { subColumns, addressColumns } = initColumns(subFormRef);

  // 分包商信息表单的默认值
  const [subInitialValues] = useState<MenusType>({
    realName: '',
    shortName: '',
    subcontractorType: '',
    province: '',
    city: '',
    district: '',
    corpType: '',
    overallMerit: '',
    isConformity: 1,
    unitAddress: '',
    legalRepresentative: '',
    legalRepresentativePhone: '',
    registeredCapital: '',
    regDate: '',
    principal: '',
    principalTel: '',
    idCard: '',
    quality: '',
    nameSpell: '',
    corpCode: '',
  });
  // 注册地信息表单的默认值
  const [addressInitialValues] = useState<MenusType>({
    buildComplaintCall: '',
    societyComplaintCall: '',
    companyScore: '',
    companySummary: '',
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
    subFormRef.current?.resetFields();
  };

  // 点击保存
  const handleOk = async () => {
    try {
      const values: MenusType = await subFormRef.current?.validateFields();
      setLoading(true);

      job
        .createJob(JSON.parse(JSON.stringify({ ...values })))
        .then(() => {
          onStateChange(false);
          message.success('站点创建成功！');
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
            提交
          </Button>,
        ]}
      >
        <AdForm
          loadingTitle="提交中..."
          formRef={subFormRef}
          initialValues={subInitialValues}
          loading={loading}
          labelAlign="left"
          columns={subColumns}
        />
        <div>注册地</div>
        <AdForm
          loadingTitle="提交中..."
          formRef={addressFormRef}
          initialValues={addressInitialValues}
          loading={loading}
          labelAlign="left"
          columns={addressColumns}
        />
      </Modal>
    </>
  );
};
