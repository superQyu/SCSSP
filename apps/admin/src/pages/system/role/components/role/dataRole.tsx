import React, { useState, useEffect, useRef } from 'react';
import { Tag, Button, message, Modal } from 'antd';

import type { FormInstance } from 'antd/es/form';

import { AdForm, FormColumnsTypes, ProTree } from 'components';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

import DictSelect from '@/components/DictSelect';

interface Props {
  /** 控制 Modal 是否显示 */
  openModal: boolean;
  /** 表单初始化 */
  subForm: Record<string, any>;
  /** 监听Modal状态变化 */
  onStateChange: (state: string | false) => void;
}

type MenusType = {
  [key: string]: any;
};

const AddMenus: React.FC<Props> = ({ openModal, subForm, onStateChange }: Props) => {
  //  api server && config
  const { server, config: C } = useBasicConfiguration();
  const { systemRole: SR } = server;
  const { SYSTEM_DATA_SCOPE } = C?.DICT_TYPE || {};

  const formRef = useRef<FormInstance>(null);
  const treeRef = useRef<any>(null);

  const [title] = useState<string>('菜单权限');
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [menus, setMenus] = useState<MenusType>({ id: -1, dataScope: '', dataScopeDeptIds: [] });

  const [treeNodes, SetTreeNodes] = useState([]);

  const onReset = () => {
    if (loading) {
      message.warning(`数据提交中,请稍等...`);
      return;
    }
    treeRef.current?.onReset();
    formRef.current?.resetFields();
  };

  const handleOk = async () => {
    try {
      setLoading(true);
      SR.assignRoleData({
        ...menus,
        roleId: menus.id,
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
    } catch (errorInfo: any) {}
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

  const handlerChange = (key: string, val: any) => setMenus({ ...menus, [key]: val });

  const onLoadTreeData = async () => {
    const res = await SR.deptSimpleList();
    SetTreeNodes(res);
  };

  useEffect(() => {
    setOpen(openModal);
    if (openModal) onLoadTreeData();
  }, [openModal]);

  useEffect(() => {
    setMenus({ ...menus, ...subForm });
  }, [subForm]);

  const columns: FormColumnsTypes[] = [
    {
      label: '菜单名称',
      dataIndex: 'name',
      formItem: (
        <Tag style={{ fontSize: '14px' }} color="#2db7f5">
          {menus.name}
        </Tag>
      ),
    },
    {
      label: '角色类型',
      dataIndex: 'code',
      formItem: <Tag color="#2db7f5">{menus.code}</Tag>,
    },
    {
      label: '权限范围',
      dataIndex: 'dataScope',
      formItem: (
        <DictSelect
          dictKey={`${SYSTEM_DATA_SCOPE}`}
          initValue={`${subForm.dataScope}`}
          dropdownExtend={false}
          onChange={(val) => setMenus({ ...menus, dataScope: val, dataScopeDeptIds: [] })}
        />
      ),
    },
    {
      show: menus.dataScope == '2',
      label: '具体范围',
      dataIndex: 'dataScopeDeptIds',
      formItem: (
        <ProTree
          ref={treeRef}
          treeNodes={treeNodes}
          // flat={true}
          topToolBar={true}
          defSelected={subForm.dataScopeDeptIds}
          // expandAll={true}
          onStateChange={(checked: (string | number)[]) =>
            handlerChange('dataScopeDeptIds', checked)
          }
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
