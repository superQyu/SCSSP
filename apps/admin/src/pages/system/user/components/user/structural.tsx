import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, message, Modal } from 'antd';
import type { GetProp, TreeSelectProps } from 'antd';

import { ExclamationCircleTwoTone } from '@ant-design/icons';
import type { FormInstance } from 'antd/es/form';

import DictSelect from '@/components/DictSelect';
import { TreeSelect } from 'components';

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

type DefaultOptionType = GetProp<TreeSelectProps, 'treeData'>[number];

const AddUser: React.FC<Props> = ({ openModal, subForm, onStateChange }: Props) => {
  const { server, config: C } = useBasicConfiguration();

  //  api server
  const { systemUser: SU, systemRole: SR } = server;
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const { SYSTEM_DATA_SCOPE } = C?.DICT_TYPE || {};

  const _DefParams = {};
  // 字段提示

  // const [formKey,setFormKey] = useState<string>('新建菜单');
  const formRef = useRef<FormInstance>(null);
  const [title] = useState<string>('新建用户');
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(openModal);
  const [treeData, setTreeData] = useState<Omit<DefaultOptionType, 'label'>[]>([]);
  const [menus, setMenus] = useState<MenusType>({ ..._DefParams });
  const [isCreate, setIsCreate] = useState<boolean>(false);

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
      if (menus.id) params = { ...menus, ...values };

      SU[isCreate ? 'createUser' : 'updateUser'](JSON.parse(JSON.stringify({ ...params })))
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
  const onLoadTreeData = async () => {
    const res = await SR.deptSimpleList();
    setTreeData([...res]);
  };

  useEffect(() => {
    setOpen(openModal);
    if (openModal) {
      setMenus({ ..._DefParams, ...(!Object.entries(subForm).length ? {} : subForm) });
      onLoadTreeData();
    } else {
      formRef.current?.resetFields();
    }
  }, [openModal]);

  useEffect(() => {
    setIsCreate(!(menus.id || menus.id === 0));
  }, [menus]);

  useEffect(() => {}, [subForm]);

  const columns: FormColumnsTypes[] = [
    {
      label: '用户昵称',
      dataIndex: 'nickname',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请输入用户名称' }],
      },
    },
    {
      label: '归属部门',
      dataIndex: 'deptId', //deptName
      colNum: 12,
      formItem: (
        <TreeSelect
          flat={true}
          model={'select'}
          treeNodes={treeData as any}
          rootStyle={{ maxHeight: 320, overflow: 'auto' }}
          expandAll={true}
        />
      ),
    },
    {
      label: '手机号码',
      dataIndex: 'mobile',
      colNum: 12,
    },
    {
      label: '邮箱',
      dataIndex: 'email',
      colNum: 12,
    },
    {
      show: !menus.id,
      label: '用户名称',
      dataIndex: 'username',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请输入用户名称' }],
      },
    },
    {
      show: !menus.id,
      label: '用户密码',
      dataIndex: 'password',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请输入用户密码' }],
      },
      formItem: (
        <Input.Password
          placeholder="请输入密码"
          visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
        />
      ),
    },
    {
      label: '用户性别',
      dataIndex: 'sex',
      colNum: 12,
      formItem: <DictSelect dictKey={'system_user_sex'} />,
    },
    {
      label: '岗位',
      dataIndex: 'postIds',
      colNum: 12,
      formItem: <DictSelect mode='multiple' dictKey={'pm_job_category'} />,
    },
    {
      label: '备注',
      colNum: 24,
      dataIndex: 'remark',
      formItem: <Input.TextArea placeholder="备注" autoSize={{ minRows: 4 }} allowClear />,
      formItemProps: {
        labelCol: {
          span: 3,
        },
      },
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
          {isCreate ? '提交' : '更新'}
        </Button>,
      ]}
      width={'45%'}
    >
      <AdForm
        key={`${JSON.stringify(subForm)}`}
        loadingTitle="提交中..."
        formRef={formRef}
        initialValues={{ ...menus }}
        loading={loading}
        labelAlign="left"
        // onFormChange={onFormChange}
        columns={columns}
      />
    </Modal>
  );
};
export default AddUser;
