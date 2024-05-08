import React, { useState, useEffect, useRef } from 'react';
import { Radio, Button, Input, message, Modal, DatePicker, InputNumber } from 'antd';
import type { GetProp, TreeSelectProps } from 'antd';
import dayjs from 'dayjs';

import type { FormInstance } from 'antd/es/form';

import { ProSelect } from 'components';

import { AdForm, FormColumnsTypes, ProTree } from 'components';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

// import DictSelect from '@/components/DictSelect';

interface Props {
  /** 控制 Modal 是否显示 */
  openModal: boolean;
  /** 表单初始化 */
  subForm: Record<string, any>;
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
  const { sites: S, systemTenant: ST, systemUser: SU, systemRole: SR } = server;

  const _DefParams = {
    status: '0',
    menuIds: [],
  };

  const formRef = useRef<FormInstance>(null);
  const treeRef = useRef<any>(null);

  const [title] = useState<string>('套餐');
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(openModal);
  const [menus, setMenus] = useState<MenusType>({ ..._DefParams });
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [treeNodes, SetTreeNodes] = useState([]);

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

      ST[isCreate ? 'createTenanpackage' : 'updateTenanpackage'](JSON.parse(JSON.stringify({ ...params })))
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

  const handlerChange = (key: string, val: any) => setMenus({ ...menus, [key]: val });

  const onLoadTreeData = async () => {
    const res = await S.simpleMenuList();
    SetTreeNodes(res);
  };

  useEffect(() => {
    setOpen(openModal);
    if (openModal) {
      onLoadTreeData();
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
      label: '套餐名',
      dataIndex: 'name',
      formItemProps: {
        rules: [{ required: true, message: '请输入套餐名' }],
      },
    },
    {
      label: '菜单权限',
      dataIndex: 'menuIds',
      formItem: (
        <ProTree
          ref={treeRef}
          treeNodes={treeNodes}
          topToolBar={true}
          defSelected={subForm.menuIds}
          onChange={(checked: (string | number)[]) => handlerChange('menuIds', checked)}
        />
      ),
    },
    {
      label: '状态',
      dataIndex: 'status',
      formItemProps: {
        rules: [{ required: true, message: '请选择套餐状态' }],
      },
      formItem: (
        <Radio.Group>
          <Radio value={'0'}>显示</Radio>
          <Radio value={'1'}>隐藏</Radio>
        </Radio.Group>
      ),
    },
    {
      label: '备注',
      dataIndex: 'remark',
      formItem: <Input.TextArea />,
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
