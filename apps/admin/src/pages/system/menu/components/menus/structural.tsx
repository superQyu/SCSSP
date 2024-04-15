import React, { useState, useEffect, useRef } from 'react';
import { Radio, Button, InputNumber, Input, message, Modal, TreeSelect } from 'antd';
import type { GetProp, TreeSelectProps } from 'antd';

import { ExclamationCircleTwoTone } from '@ant-design/icons';
import type { FormInstance } from 'antd/es/form';

import { IconSelect } from 'ui';
import { AdForm, FormColumnsTypes } from 'components';

import { url2key, TOKEN, buildTree, sortMenu } from 'utils';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

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

const AddMenus: React.FC<Props> = ({ openModal, onStateChange }: Props) => {
  const { server } = useBasicConfiguration();
  const formRef = useRef<FormInstance>(null);
  const [title] = useState<string>('新建菜单');
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(openModal);
  const [treeData, setTreeData] = useState<Omit<DefaultOptionType, 'label'>[]>([]);
  const [menus, setMenus] = useState<MenusType>({
    name: '',
    ico: '',
    path: '',
    filepath: '',
    orderNum: '',
    isDelete: 0,
    isHidden: 0,
    description: '',
    parentId: '0',
    menuType: 'dir',
  });

  //  api server
  const { user: U, menus: M } = server;
  // 字段提示
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
          onStateChange(false);
          message.success('站点创建成功！');
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
    const updated = { ...menus };
    updated[key] = val;
    setMenus(updated);
  };
  const validatorPath = async (_: any, value: any) => {
    const { menuType } = menus;
    if (menuType == 'menu' && value && value.indexOf('/') === 0) {
      return Promise.reject('不允许"/"开头');
    }

    return Promise.resolve();
  };

  const onLoadTreeData = async () => {
    const list = await U.getRoute({ siteKey: TOKEN.replace(/^Qy_/, '') });
    const menus = buildTree(list, {
      delEmptyRoutes: true,
      intercept: (item: { [key: string]: string }) => ({
        ...item,
        children: item.routes,
        key: item.id,
        value: item.id,
        title: item.name,
      }),
    });
    setTreeData([
      { id: 1, pId: 0, key: '0', value: '0', title: '主类目', children: sortMenu(menus) },
    ]);
  };

  useEffect(() => {
    setOpen(openModal);
    if (openModal) onLoadTreeData();
  }, [openModal]);

  useEffect(() => {
    formRef.current?.resetFields(['filepath']);
  }, [menus.menuType]);

  const columns: FormColumnsTypes[] = [
    {
      label: '上级菜单',
      dataIndex: 'parentId',
      formItem: (
        <TreeSelect
          treeDataSimpleMode
          style={{ width: '100%' }}
          value={menus.parentId}
          dropdownStyle={{ maxHeight: 480, overflow: 'auto' }}
          treeDefaultExpandedKeys={['0']}
          placeholder="请选择上级"
          onChange={(v: string) => handlerChange('parentId', `${v}`)}
          treeData={treeData}
        />
      ),
    },
    {
      label: '菜单名称',
      dataIndex: 'name',
      formItemProps: {
        rules: [{ required: true, message: '请输入菜单名称' }],
      },
    },
    {
      label: '菜单类型',
      dataIndex: 'menuType',
      defaultValue: 'dir',
      formItem: (
        <Radio.Group
          onChange={(e) => handlerChange('menuType', e.target.value)}
          buttonStyle="solid"
        >
          <Radio.Button value="dir">目录</Radio.Button>
          <Radio.Button value="menu">菜单</Radio.Button>
          <Radio.Button disabled value="button">
            按钮
          </Radio.Button>
        </Radio.Group>
      ),
      formItemProps: {
        rules: [{ required: true, message: '请输入菜单名称' }],
      },
    },
    {
      label: '图标',
      dataIndex: 'ico',
      formItem: <IconSelect />,
    },
    {
      label: '路由地址',
      dataIndex: 'path',
      formItemProps: {
        tooltip: ItemTooltip([
          '访问的路由地址，如：`user` `/user`。',
          '如需外网地址时，则以 `http(s)://` 开头',
        ]),
        rules: [{ required: true, message: '请输入路由地址' }, { validator: validatorPath }],
      },
    },
    {
      label: '组件地址',
      dataIndex: 'filepath',
      show: menus.menuType === 'menu',
      formItemProps: {
        rules: [
          {
            validator: (_: any, value: any) => {
              if (value && value.startsWith('/')) return Promise.reject('不能以/开头');
              return Promise.resolve();
            },
          },
        ],
      },
    },
    {
      label: '显示排序',
      dataIndex: 'orderNum',
      formItem: <InputNumber min={0} />,
      formItemProps: {
        rules: [{ required: true, message: '请输入排序' }],
      },
    },
    {
      label: '菜单状态',
      dataIndex: 'isDelete',
      defaultValue: '0',
      formItem: (
        <Radio.Group>
          <Radio value={0}>开启</Radio>
          <Radio value={1}>关闭</Radio>
        </Radio.Group>
      ),
      formItemProps: {
        rules: [{ required: true }],
      },
    },
    {
      label: '显示状态',
      dataIndex: 'isHidden',
      defaultValue: '0',
      formItem: (
        <Radio.Group>
          <Radio value={0}>显示</Radio>
          <Radio value={1}>隐藏</Radio>
        </Radio.Group>
      ),
      formItemProps: {
        tooltip: ItemTooltip('选择隐藏时，路由将不会出现在侧边栏，但仍然可以访问'),
      },
    },
    {
      label: '菜单描述',
      dataIndex: 'description',
      formItem: <Input.TextArea placeholder="菜单描述" autoSize={{ minRows: 4 }} allowClear />,
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
