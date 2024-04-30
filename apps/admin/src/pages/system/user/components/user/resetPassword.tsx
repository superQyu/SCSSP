import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, message, Modal } from 'antd';
import type { FormInstance } from 'antd/es/form';

// TreeSelect
import { AdForm, FormColumnsTypes } from 'components';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

// import DictSelect from '@/components/DictSelect';

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

const AddUser: React.FC<Props> = ({ openModal, subForm, onStateChange }: Props) => {
  const { server, config } = useBasicConfiguration();
  //  api server
  const { systemUser: SU } = server;
  const [passwordVisible, setPasswordVisible] = useState(false);
  // 字段提示

  const formRef = useRef<FormInstance>(null);
  const inputRef = useRef(null);
  const [title] = useState<string>('温馨提示');
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(openModal);
  const [menus, setMenus] = useState<MenusType>({ username: '-' });

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

      let params = values;
      SU.updateUserPassword(JSON.parse(JSON.stringify({ ...menus, ...params })))
        .then(() => {
          message.success('修改成功！');
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
    if (openModal) {
      setMenus({ ...subForm });
    } else {
      formRef.current?.resetFields();
    }
  }, [openModal]);

  useEffect(() => {}, [subForm]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const columns: FormColumnsTypes[] = [
    {
      label: `请输入“${menus.username}”的新密码`,
      dataIndex: 'password',
      formItemProps: {
        rules: [{ required: true, message: '请输入新密码' }],
      },
      formItem: (
        <Input.Password
          ref={inputRef}
          placeholder="请输入密码"
          visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
        />
      ),
    },
  ];

  return (
    <Modal
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
          修改
        </Button>,
      ]}
      width={'420px'}
    >
      <AdForm
        layout="vertical"
        key={`${JSON.stringify(subForm)}`}
        loadingTitle="提交中..."
        formRef={formRef}
        initialValues={{ ...menus }}
        loading={loading}
        labelAlign="left"
        onFormChange={onFormChange}
        columns={columns}
        layoutStyle={{
          labelCol: { span: 24 },
          wrapperCol: { span: 24, flex: 1 },
        }}
      />
    </Modal>
  );
};
export default AddUser;
