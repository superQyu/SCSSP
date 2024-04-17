import React, { useState, useEffect, useRef } from 'react';
import { Radio, Button, InputNumber, Input, message, Modal, TreeSelect } from 'antd';
import type { GetProp, TreeSelectProps } from 'antd';

import { ExclamationCircleTwoTone } from '@ant-design/icons';
import type { FormInstance } from 'antd/es/form';

import { IconSelect } from 'ui';
import { AdForm, FormColumnsTypes } from 'components';

import { url2key, RebuildTree, flattenArray, sortMenu } from 'utils';
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
    icon: '',
    path: '',
    component: '',
    sort: '',
    status: '0',
    description: '',
    parentId: `${PLATFORMID}`,
    type: '1',
    permission: '',
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
          message.success('菜单创建成功！');
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
    const updated = { ...menus };
    updated[key] = val;
    setMenus(updated);
  };
  const validatorPath = async (_: any, value: any) => {
    const { type } = menus;
    if (type == 'menu' && value && value.indexOf('/') === 0) {
      return Promise.reject('不允许"/"开头');
    }

    return Promise.resolve();
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
    formRef.current?.resetFields(['filepath']);
  }, [menus.type]);

  const columns: FormColumnsTypes[] = [
    // {
    //   label: '测试字典',
    //   dataIndex: 'dir',
    //   valueType: 'select',
    //   options={[
    //     {
    //       value: 'time',
    //       label: '履行完终止',
    //     },
    //   ]}
    // },
    {
      label: '上级菜单',
      dataIndex: 'parentId',
      formItem: (
        <TreeSelect
          treeDataSimpleMode
          style={{ width: '100%' }}
          value={menus.parentId}
          dropdownStyle={{ maxHeight: 480, overflow: 'auto' }}
          treeDefaultExpandedKeys={[PLATFORMID]}
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
      dataIndex: 'type',
      defaultValue: '1',
      formItem: (
        <Radio.Group onChange={(e) => handlerChange('type', e.target.value)} buttonStyle="solid">
          <Radio.Button value="1">目录</Radio.Button>
          <Radio.Button value="2">菜单</Radio.Button>
          <Radio.Button value="3">按钮</Radio.Button>
        </Radio.Group>
      ),
      formItemProps: {
        rules: [{ required: true, message: '请输入菜单名称' }],
      },
    },
    {
      label: '图标',
      show: menus.type != '3',
      dataIndex: 'icon',
      formItem: <IconSelect />,
    },
    {
      label: '路由地址',
      show: menus.type != '3',
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
      dataIndex: 'component',
      show: menus.type == '2',
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
      label: '权限标识',
      show: menus.type === '3',
      dataIndex: 'permission',
      formItemProps: {
        tooltip: ItemTooltip(['Controller 方法上的权限字符', '如：system:user:list']),
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
      label: '显示状态',
      dataIndex: 'status',
      defaultValue: '0',
      formItem: (
        <Radio.Group>
          <Radio value={'0'}>显示</Radio>
          <Radio value={'1'}>隐藏</Radio>
        </Radio.Group>
      ),
      formItemProps: {
        tooltip: ItemTooltip('选择隐藏时，路由将不会出现在侧边栏，但仍然可以访问'),
      },
    },
    // {
    //   label: '菜单描述',
    //   dataIndex: 'description',
    //   formItem: <Input.TextArea placeholder="菜单描述" autoSize={{ minRows: 4 }} allowClear />,
    // },
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
