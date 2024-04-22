import React, { useState, useEffect, useRef } from 'react';
import { Col, Row, Switch, Space, Tag, Button, message, Modal, Tree } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';

import type { FormInstance } from 'antd/es/form';

import { AdForm, FormColumnsTypes, ProTree } from 'components';

import { RebuildTree, flattenArray, sortMenu } from 'utils';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

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
  const { server } = useBasicConfiguration();
  const { sites: S, systemRole: SR } = server;

  const formRef = useRef<FormInstance>(null);
  const treeRef = useRef<any>(null);

  const [title] = useState<string>('菜单权限');
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [menus, setMenus] = useState<MenusType>({ id: -1, code: '', name: '', menuIds: [] });

  const [treeNodes, SetTreeNodes] = useState([]);

  const onReset = () => {
    if (loading) {
      message.warning(`数据提交中,请稍等...`);
      return;
    }
    treeRef?.current?.onReset();
  };

  const handleOk = async () => {
    setLoading(true);
    SR.assignRoleMenu({
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
    const res = await S.simpleMenuList();
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
      label: '菜单权限',
      dataIndex: 'menuIds',
      formItem: (
        <ProTree
          ref={treeRef}
          treeNodes={treeNodes}
          topToolBar={true}
          defSelected={subForm.menuIds}
          onStateChange={(checked: (string | number)[]) => handlerChange('menuIds', checked)}
          //
        />
      ),
    },
    // {
    //   label: '菜单权限',
    //   dataIndex: 'menuIds',
    //   formItem: (
    //     <Row>
    //       <Col span={12}>
    //         <Space>
    //           全选/全不选
    //           <Switch
    //             checkedChildren="是"
    //             unCheckedChildren="否"
    //             value={radiorCheck}
    //             onChange={(checked: boolean) => handerRadioCheck(checked)}
    //           />
    //         </Space>
    //       </Col>
    //       <Col span={12}>
    //         <Space>
    //           全部展开/折叠
    //           <Switch
    //             checkedChildren="展开"
    //             unCheckedChildren="折叠"
    //             value={radiorExpand}
    //             onChange={(checked: boolean) => handerExpandCheck(checked)}
    //           />
    //         </Space>
    //       </Col>
    //       <Col span={24} style={{ marginTop: '10px' }}>
    //         <Tree
    //           checkable
    //           onExpand={onExpand}
    //           expandedKeys={expandedKeys}
    //           autoExpandParent={autoExpandParent}
    //           onCheck={onCheck}
    //           checkedKeys={checkedKeys}
    //           // checkStrictly={true}
    //           onSelect={onSelect}
    //           selectedKeys={selectedKeys}
    //           treeData={treeData}
    //           height={350}
    //         />
    //       </Col>
    //     </Row>
    //   ),
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
