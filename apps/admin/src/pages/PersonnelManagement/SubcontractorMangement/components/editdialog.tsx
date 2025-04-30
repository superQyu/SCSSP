import { useState, useEffect, useRef } from 'react';
import { Modal, Button, message } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { AdForm } from 'components';
import SingleTitle from '@/components/SingleTitle';
import dayjs from 'dayjs';

import initColumns from '../models/form.model';

// api 相关
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

interface Props {
  /** 控制 Modal 是否显示 */
  openModal: boolean;
  /** 监听 Modal 状态变化 */
  onStateChange: (state: boolean) => void;
  /** 编辑表单携带的数据 */
  detail: any;
}

type MenusType = {
  [key: string]: any;
};

export default (props: Props) => {
  const { openModal, onStateChange, detail } = props;

  // api 相关
  const { server } = useBasicConfiguration();
  const { subContractor } = server;

  const [open, setOpen] = useState<boolean>(openModal);
  const [loading, setLoading] = useState<boolean>(false);
  // 对传入的图片进行控制
  const [picture, setPicture] = useState<string[]>([]);

  const subFormRef = useRef<FormInstance>(null);
  const addressFormRef = useRef<FormInstance>(null);

  // 表单项配置
  const { subColumns, addressColumns } = initColumns(
    subFormRef,
    picture
  );

  // 单位信息表单的默认值
  const [subInitialValues] = useState<MenusType>({
    realName: detail.realName,
    shortName: detail.shortName,
    subcontractorType: detail.subcontractorType,
    province: detail.province,
    city: detail.city,
    district: detail.district,
    corpType: detail.corpType,
    overallMerit: detail.overallMerit,
    isConformity: detail.isConformity,
    unitAddress: detail.unitAddress,
    legalRepresentative: detail.legalRepresentative,
    legalRepresentativePhone: detail.legalRepresentativePhone,
    registeredCapital: detail.registeredCapital,
    regDate: detail.regDate && dayjs(detail.regDate),
    principal: detail.principal,
    principalTel: detail.principalTel,
    idCard: detail.idCard,
    quality: detail.quality,
    nameSpell: detail.nameSpell,
    corpCode: detail.corpCode,
    url: detail.url,
  });
  // 注册地信息表单的默认值
  const [addressInitialValues] = useState<MenusType>({
    buildComplaintCall: detail.buildComplaintCall,
    societyComplaintCall: detail.societyComplaintCall,
    companyScore: detail.companyScore,
    companySummary: detail.companySummary,
  });

  useEffect(() => {
    setOpen(openModal);
    detail.url && setPicture(detail.url?.split('@'));
  }, [openModal]);

  // 点击重置
  const onReset = () => {
    if (loading) {
      message.warning(`数据提交中,请稍等...`);
      return;
    }
    subFormRef.current?.resetFields();
    addressFormRef.current?.resetFields();
  };

  // 点击保存
  const handleOk = async () => {
    try {
      const subFormValues: MenusType =
        await subFormRef.current?.validateFields();
      subFormValues.url =
        subFormValues.url && subFormValues.url?.join('@');
      const addressFormValues: MenusType =
        await addressFormRef.current?.validateFields();
      const params = {
        id: detail.id,
        ...subFormValues,
        ...addressFormValues,
      };
      // console.log('创建单位的请求参数', params)
      setLoading(true);
      subContractor[
        detail.id ? 'updateSubContractor' : 'createSubContractor'
      ](params)
        .then(() => {
          message.success('操作成功！');
          setLoading(false);
          onStateChange(false);
          // onReset();
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
        open={openModal}
        title={detail.id ? '编辑' : '新建'}
        width={1000}
        centered
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        footer={[
          <Button
            key="back"
            onClick={handleCancel}
            disabled={loading}
          >
            取消
          </Button>,
          <Button
            key="reset"
            htmlType="reset"
            onClick={onReset}
            disabled={loading}
          >
            重置
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            {detail.id ? '更新' : '提交'}
          </Button>,
        ]}
      >
        <div
          className="h-70vh p-inline-4"
          style={{ overflow: 'hidden auto' }}
        >
          <AdForm
            loadingTitle="提交中..."
            formRef={subFormRef}
            initialValues={subInitialValues}
            loading={loading}
            labelAlign="left"
            columns={subColumns}
          />
          {/* <SingleTitle label="注册地" /> */}
          {/* <AdForm
            loadingTitle="提交中..."
            formRef={addressFormRef}
            initialValues={addressInitialValues}
            loading={loading}
            labelAlign="left"
            columns={addressColumns}
          /> */}
        </div>
      </Modal>
    </>
  );
};
