import React, { useState, useEffect, useRef } from 'react';
import { Radio, Card, Tag, Button, InputNumber, Input, message, Modal, TreeSelect } from 'antd';
import type { GetProp, TreeSelectProps } from 'antd';

import { ExclamationCircleTwoTone } from '@ant-design/icons';
import type { FormInstance } from 'antd/es/form';

import { IconSelect } from 'ui';
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
  onStateChange: (state: boolean) => void;
}

type MenusType = {
  [key: string]: any;
};

type DefaultOptionType = GetProp<TreeSelectProps, 'treeData'>[number];

const AddMenus: React.FC<Props> = ({ openModal, subForm, onStateChange }: Props) => {
  const { server, config } = useBasicConfiguration();

  //  api server
  const { user: U, menus: M, sites: S } = server;
  const { PLATFORMID } = config as Record<string, any>;
  // 字段提示

  const formRef = useRef<FormInstance>(null);
  const [title] = useState<string>('新建菜单');
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(openModal);
  const [treeData, setTreeData] = useState<Omit<DefaultOptionType, 'label'>[]>([]);
  const [menus, setMenus] = useState<MenusType>({
    name: '',
    type: '',
    menuIds: [],
  });

  const ItemTooltip = (tips: string | Array<string>) => {
    if (typeof tips === 'string') tips = [tips];
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ExclamationCircleTwoTone style={{ color: '#1677ff', marginRight: '5px' }} />
        <div style={{ display: 'inline-block' }}>
          {tips.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      </div>
    );
  };
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

      M.createMenu(JSON.parse(JSON.stringify({ ...values, siteKey: url2key() })))
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

  const handlerChange = (key: string, val: any) => {
    setMenus({ ...menus, [key]: val });
  };

  const onLoadTreeData = async () => {
    const res = await S.menuList();
    // * 筛选出 华光智慧监管 平台 id:2583  相关菜单表
    const M =
      RebuildTree(res, {
        intercept: (item: { [key: string]: string }) => ({ ...item, children: item.routes }),
      }).filter((item) => item.id === PLATFORMID)[0] || {};
    const roorId = M[0]?.id || 0;
    const menus = RebuildTree(flattenArray([M]), {
      delEmptyRoutes: true,
      intercept: (item: { [key: string]: string }) => {
        return {
          ...item,
          children: item.routes,
          key: item.id,
          value: item.id,
          title: item.name,
        };
      },
      _rootId: roorId,
    });
    setTreeData([...sortMenu(menus)]);
  };

  useEffect(() => {
    setOpen(openModal);
    if (openModal) onLoadTreeData();
  }, [openModal]);

  useEffect(() => {
    setMenus(subForm);
  }, [subForm]);
  useEffect(() => {
    console.log(menus)
  }, [menus]);
  const columns: FormColumnsTypes[] = [
    {
      label: '菜单名称:',
      dataIndex: 'name',
      formItem: <Tag color="blue">{menus.name}</Tag>,
    },
    {
      label: '角色类型:',
      dataIndex: 'code',
      formItem: <Tag color="blue">{menus.code}</Tag>,
    },
    {
      label: '菜单权限:',
      dataIndex: 'menuIds',
      formItem: (
        <>
          <TreeSelect
            treeDataSimpleMode
            treeCheckable={true}
            showCheckedStrategy={'SHOW_PARENT'}
            style={{ width: '100%' }}
            value={menus.parentId}
            dropdownStyle={{ maxHeight: 480, overflow: 'auto' }}
            treeDefaultExpandedKeys={[PLATFORMID]}
            placeholder="请选择上级"
            onChange={(vs: string[]) => handlerChange('menuIds', vs)}
            treeData={treeData}
          />
        </>
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
