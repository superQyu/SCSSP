import React, { useState, useEffect, useRef } from 'react';
import { Button, InputNumber, Input, message, Modal } from 'antd';

import type { FormInstance } from 'antd/es/form';

import { AdForm, FormColumnsTypes } from 'components';

import { url2key, RebuildTree, flattenArray, sortMenu } from 'utils';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

import DictSelect from '@/components/DictSelect';

interface Props {
  /** 控制 Modal 是否显示 */
  openModal: boolean;
  /** 表单初始化 */
  subForm: {};
  /** 监听Modal状态变化 */
  onStateChange: (state: string | false) => void;
}

type MenusType = {
  [key: string]: any;
};

const AddMenus: React.FC<Props> = ({ openModal, subForm, onStateChange }: Props) => {
  const { server, config: C } = useBasicConfiguration();

  //  api server
  const { systemRole: SR } = server;
  const { COMMON_STATUS } = C?.DICT_TYPE || {};

  // 字段提示
  const formRef = useRef<FormInstance>(null);
  const [title] = useState<string>('新增角色');
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(openModal);
  const [menus, setMenus] = useState<MenusType>({
    id: '',
    name: '',
    code: '',
    sort: null,
    status: '0',
    type: '',
    remark: '',
  });

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

      SR.createRole(JSON.parse(JSON.stringify({ ...values })))
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

  useEffect(() => {
    setMenus({ ...menus, ...subForm });
  }, [subForm]);

  const columns: FormColumnsTypes[] = [
    {
      label: '角色名称',
      dataIndex: 'name',
      formItemProps: {
        rules: [{ required: true, message: '请输入角色名称' }],
      },
    },
    {
      label: '角色标识',
      dataIndex: 'code',
      formItemProps: {
        rules: [{ required: true, message: '请输入角色标识' }],
      },
    },
    {
      label: '显示排序',
      dataIndex: 'sort',
      formItem: <InputNumber min={0} />,
      formItemProps: {
        rules: [{ required: true, message: '请输入排序' }],
      },
    },
    {
      label: '状态',
      dataIndex: 'status',
      formItem: <DictSelect dictKey={`${COMMON_STATUS}`} dropdownExtend={false} />,
      formItemProps: {
        rules: [{ required: true, message: '请选中状态' }],
      },
    },
    {
      label: '备注',
      formItem: <Input.TextArea />,
      dataIndex: 'remark',
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
          提交
        </Button>,
      ]}
    >
      <AdForm
        loadingTitle="提交中..."
        formRef={formRef}
        initialValues={{ ...menus }}
        loading={loading}
        labelAlign="left"
        onFormChange={onFormChange}
        columns={columns}
      />
    </Modal>
  );
};
export default AddMenus;
