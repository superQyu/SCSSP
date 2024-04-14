import React, { useState, useEffect, useRef } from 'react';
import { Radio, Button, InputNumber, Form, Input, message, Modal, Spin, TreeSelect } from 'antd';
import type { GetProp, TreeSelectProps } from 'antd';

import { ExclamationCircleTwoTone } from '@ant-design/icons';
import type { FormInstance } from 'antd/es/form';

import { IconSelect } from 'ui';

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

type FieldType = {
  /** 站点标识 */
  siteKey?: string;
  /** 站点名称 */
  name?: string;
  /** 地址 */
  address?: string;
  /** 域名 */
  domainName?: string;
  /** 站点图标 */
  ico?: string;
  /** 描述 */
  description?: string;
  [key: string]: any;
};

type MenusType = {
  [key: string]: any;
};

type DefaultOptionType = GetProp<TreeSelectProps, 'treeData'>[number];

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18, flex: 1 },
};

const AddMenus: React.FC<Props> = ({ subForm, openModal, onStateChange }: Props) => {
  const { server } = useBasicConfiguration();
  const formRef = useRef<FormInstance>(null);
  const [title, setTitle] = useState<string>('新建菜单');
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
  const onFormChange = (data: MenusType) => {};

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
      <Spin spinning={loading} tip="提交中...">
        <Form
          {...layout}
          ref={formRef}
          name="control-ref"
          labelAlign="left"
          onValuesChange={onFormChange}
          colon={false}
          initialValues={{ ...menus }}
        >
          <Form.Item<FieldType> name="parentId" label="上级菜单">
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
          </Form.Item>
          <Form.Item<FieldType>
            name="name"
            label="菜单名称"
            rules={[{ required: true, message: '请输入菜单名称' }]}
          >
            <Input placeholder="请输入菜单名称" />
          </Form.Item>
          <Form.Item<FieldType> name="menuType" label="菜单类型">
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
          </Form.Item>
          <Form.Item<FieldType> name="ico" label="图标">
            <IconSelect />
          </Form.Item>
          <Form.Item<FieldType>
            name="path"
            tooltip={ItemTooltip([
              '访问的路由地址，如：`user` `/user`。',
              '如需外网地址时，则以 `http(s)://` 开头',
            ])}
            label="路由地址"
            rules={[{ required: true }, { validator: validatorPath }]}
          >
            <Input placeholder="请输入路由地址" />
          </Form.Item>
          {menus.menuType === 'menu' && (
            <Form.Item<FieldType>
              name="filepath"
              label="组件地址"
              rules={[
                {
                  validator: (rule: any, value: any) => {
                    if (value && value.startsWith('/')) return Promise.reject('不能以/开头');
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input placeholder="请输入路由地址" />
            </Form.Item>
          )}
          <Form.Item<FieldType> name="orderNum" label="显示排序" rules={[{ required: true }]}>
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item<FieldType> name="isDelete" label="菜单状态" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value={0}>开启</Radio>
              <Radio value={1}>关闭</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item<FieldType>
            name="isHidden"
            label="显示状态"
            tooltip={ItemTooltip('选择隐藏时，路由将不会出现在侧边栏，但仍然可以访问')}
          >
            <Radio.Group>
              <Radio value={0}>显示</Radio>
              <Radio value={1}>隐藏</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item<FieldType> name="description" label="菜单描述">
            <Input.TextArea placeholder="菜单描述" autoSize={{ minRows: 4 }} allowClear />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};
export default AddMenus;
