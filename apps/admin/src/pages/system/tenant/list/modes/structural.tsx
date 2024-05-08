import React, { useState, useEffect, useRef } from 'react';
import { Radio, Button, Input, message, Modal, DatePicker, InputNumber } from 'antd';
import type { GetProp, TreeSelectProps } from 'antd';
import dayjs from 'dayjs';

import type { FormInstance } from 'antd/es/form';

import { ProSelect } from 'components';

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
  const { systemTenant: ST, systemUser: SU, systemRole: SR } = server;
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const { SYSTEM_DATA_SCOPE } = C?.DICT_TYPE || {};

  const _DefParams = {
    status: '0',
  };
  const formRef = useRef<FormInstance>(null);
  const [title] = useState<string>('用户');
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(openModal);
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
      params['expireTime'] = dayjs(params.expireTime).valueOf();

      ST[isCreate ? 'createTenant' : 'updateTenant'](JSON.parse(JSON.stringify({ ...params })))
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
    onStateChange(false);
    setOpen(false);
    onReset();
  };
  useEffect(() => {
    setOpen(openModal);
    if (openModal) {
      setMenus({ ..._DefParams, ...(!Object.entries(subForm).length ? {} : subForm) });
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
      label: '租户名',
      dataIndex: 'name',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请输入租户名' }],
      },
    },
    {
      label: '租户套餐',
      dataIndex: 'packageId',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请选择租户套餐' }],
      },
      formItem: (
        <ProSelect
          asyncData={() => ST.tenantPackageList()}
          transform={{
            formatter: (res: MenusType[]) =>
              res.map((item) => ({ label: item.name, value: item.id })),
          }}
        />
      ),
    },
    {
      label: '联系人',
      dataIndex: 'contactName',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请输入联系人' }],
      },
    },
    {
      label: '联系手机',
      dataIndex: 'contactMobile',
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
      label: '账号额度',
      dataIndex: 'accountCount',
      colNum: 12,
      formItem: <InputNumber placeholder="请输入账号余额" className="w-full" />,
      formItemProps: {
        rules: [{ required: true, message: '请输入用户名称' }],
      },
    },
    {
      label: '过期时间',
      dataIndex: 'expireTime',
      colNum: 12,
      formItem: <DatePicker format="YYYY-MM-DD" className="w-full" />,
      formItemProps: {
        rules: [{ required: true, message: '请输入用户名称' }],
      },
    },
    {
      label: '绑定域名',
      colNum: 12,
      dataIndex: 'website',
    },
    {
      label: '租户状态',
      colNum: 12,
      dataIndex: 'status',
      formItem: (
        <Radio.Group>
          <Radio value={'0'}>显示</Radio>
          <Radio value={'1'}>隐藏</Radio>
        </Radio.Group>
      ),
    },
  ];

  return (
    <Modal
      open={open}
      title={`${isCreate ? '新增' : '更新'}${title}`}
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
