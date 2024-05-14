import { useState, useEffect, useRef } from 'react';
import { Modal, Button, message } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { AdForm } from 'components';
import dayjs from 'dayjs';

import SingleTitle from '@/components/SingleTitle';
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
  type: string;
}

export default ({ openModal, onStateChange, detail, type }: Props) => {
  // api 相关
  const { server } = useBasicConfiguration();
  const { certificate } = server;

  const [open, setOpen] = useState<boolean>(openModal);
  const [title] = useState<string>('添加证件信息');
  const [loading, setLoading] = useState<boolean>(false);

  const basicFormRef = useRef<FormInstance>(null);
  const certificateFormRef = useRef<FormInstance>(null);

  // 表单项配置
  // 只能放在外面, 因为调用该方法中使用 hook, 只能放在函数式组件的外部
  // 传入表单的DOM 和 两个图片列表的默认值
  const { picture } = detail;
  const { basicColumns, certificateColumns } = initColumns(basicFormRef, picture, type);

  // 基础信息表单的默认值
  const [basicFormData] = useState<MenusType>({
    userId: detail.userId,
    subcontractorId: detail.subcontractorId,
    workerType: detail.workerType,
    workTypeName: detail.workTypeName,
    jobCategory: detail.jobCategory,
    identityCard: detail.identityCard,
    workYears: detail.workYears,
  });
  // 证件信息表单的默认值
  const [certificateFormData, setCertificateFormData] = useState<MenusType>({});

  // 根据 id 获取证件管理的详情
  const getDetail = async () => {
    const res = await certificate.getCertificateDetail({ id: detail.id });
    const { personnelCertificateRespVO: certificateData } = res;
    setCertificateFormData({
      ...certificateData,
      certificateType: certificateData.certificateType && `${certificateData.certificateType}`,
      certificateCategory:
        certificateData.certificateCategory && `${certificateData.certificateCategory}`,
      firstIssuedDate: certificateData.firstIssuedDate && dayjs(certificateData.firstIssuedDate),
      validityStartDate:
        certificateData.validityStartDate && dayjs(certificateData.validityStartDate),
      validityEndDate: certificateData.validityEndDate && dayjs(certificateData.validityEndDate),
      reviewDate: certificateData.reviewDate && dayjs(certificateData.reviewDate),
      certificateDateSpecialWork:
        certificateData.certificateDateSpecialWork &&
        dayjs(certificateData.certificateDateSpecialWork),
    });
  };

  useEffect(() => {
    setOpen(openModal);
    if (openModal && detail.id) {
      getDetail();
    }
  }, [openModal]);

  // 点击重置
  const onReset = () => {
    if (loading) {
      message.warning(`数据提交中,请稍等...`);
      return;
    }
    basicFormRef.current?.resetFields();
    certificateFormRef.current?.resetFields();
  };

  // 点击保存
  const handleOk = async () => {
    try {
      const basicValues: MenusType = await basicFormRef.current?.validateFields();
      const certificateValues: MenusType = await certificateFormRef.current?.validateFields();
      certificateValues.picture = certificateValues.picture?.join('@');
      const values = { id: detail.id, ...basicValues, ...certificateValues };
      // console.log('表单提交时的数据', values);
      setLoading(true);
      certificate[detail.id ? 'updateCertificate' : 'createCertificate'](values)
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
        <SingleTitle label="基本信息" />
        <AdForm
          loadingTitle="提交中..."
          formRef={basicFormRef}
          initialValues={basicFormData}
          loading={loading}
          labelAlign="left"
          columns={basicColumns}
        />
        <SingleTitle label="证件信息" />
        <AdForm
          loadingTitle="提交中..."
          formRef={certificateFormRef}
          initialValues={certificateFormData}
          loading={loading}
          labelAlign="left"
          columns={certificateColumns}
        />
      </Modal>
    </>
  );
};
