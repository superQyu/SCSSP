import React, { useState, useEffect, useRef } from 'react';
import { Button, Radio, message, Modal, Input } from 'antd';

import type { FormInstance } from 'antd/es/form';

import { AdForm, FormColumnsTypes } from 'components';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
const { TextArea } = Input;
interface Props {
  /** 控制 Modal 是否显示 */
  openModal: boolean;
  /** 表单初始化 */
  subForm: {};
  /** 监听Modal状态变化 */
  onStateChange: (state: boolean) => void;
}

type MenusType = {
  [key: string]: any;
};

const AddMenus: React.FC<Props> = ({ openModal, subForm, onStateChange }: Props) => {
  const { server } = useBasicConfiguration();
  const { vehicle: V } = server;
  const formRef = useRef<FormInstance>(null);
  const [title] = useState<string>('审批流程');
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(openModal);

  const onReset = () => {
    if (loading) {
      message.warning(`数据提交中,请稍等...`);
      return;
    }
    formRef.current?.resetFields();
  };

  const handleOk = async () => {
    try {
      const values: MenusType = await formRef.current?.validateFields();
      setLoading(true);
      V[values.result]({
        id: subForm.id,
        reason: values.reason,
      })
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
  const handleCancel = () => {
    if (loading) {
      message.warning(`数据提交中,请稍等...`);
      return;
    }
    setOpen(false);
    onReset();
    onStateChange(false);
  };
  const onFormChange = (_: MenusType) => {};

  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);
  useEffect(() => {}, [subForm]);

  const columns: FormColumnsTypes[] = [
    {
      label: '审批结果',
      dataIndex: 'result',
      formItem: (
        <Radio.Group>
          <Radio value="approve"> 通过 </Radio>
          <Radio value="reject"> 不通过 </Radio>
        </Radio.Group>
      ),
      formItemProps: {
        rules: [{ required: true, message: '请选择审批结果' }],
      },
      colNum: 24,
    },
    {
      label: '理由',
      dataIndex: 'reason',
      formItemProps: {
        rules: [{ required: true, message: '请输入理由' }],
      },
      formItem: <TextArea autoSize={{ minRows: 3, maxRows: 5 }} />,
      colNum: 24,
    },
  ];

  return (
    <Modal
      width={'500px'}
      open={open}
      title={title}
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
        key={`${JSON.stringify(subForm)}`}
        loadingTitle="提交中..."
        formRef={formRef}
        loading={loading}
        labelAlign="left"
        onFormChange={onFormChange}
        columns={columns}
        layoutStyle={{
          labelCol: { span: 5 },
          wrapperCol: { span: 19, flex: 1 },
        }}
      />
    </Modal>
  );
};
export default AddMenus;
