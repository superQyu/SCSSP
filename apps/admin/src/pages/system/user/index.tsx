import { createElement, cloneElement, useRef, useState, useEffect } from 'react';
import { Button, message, Modal, Alert } from 'antd';
import { TableDropdown } from '@ant-design/pro-components';
import { PlusOutlined, SearchOutlined, ExclamationCircleFilled } from '@ant-design/icons';

import { type ActionType } from '@ant-design/pro-components';
import { ProTable } from 'components';

import AddRole from '../role/components/role/structural';
import MenuRole from '../role/components/role/menuRole';
import AataRole from '../role/components/role/dataRole';

// 站点表格模型
import type { ModesApi } from './modes/model';
import siteModel, { type ColumnsParamsProps } from './modes/menu.model';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

export default () => {
  const { server } = useBasicConfiguration();
  const actionRef = useRef<ActionType>();

  const [subForm, setsubForm] = useState<Record<string, any>>({});
  const [formModal, setFormModal] = useState<string | false>(false);

  //  api server
  const { menus: M, systemRole: SR } = server;

  // 修改状态
  const GetModalStateChange = async (state: string | false) => {
    setFormModal(state);
    await actionRef.current?.reload();
  };

  // 初始化 表格列表项
  const initColumns = siteModel({ server });

  // 删除行
  const onDelete = async (id: number) => {
    try {
      await M.deleteMenus({ ids: id })
        .then(async () => {
          message.success('操作成功!');
          await actionRef.current?.reload();
        })
        .catch(() => {});
    } catch (errorInfo) {}
  };

  // 重写save方法 阻止提交失败也退出编辑状态
  const onSave = async (...args: any[]) => {
    const [config, id, n, , ,] = args;
    // 更新行数据

    const res = await SR.updateRole(JSON.parse(JSON.stringify({ ...n })) as ColumnsParamsProps)
      .then(async () => {
        message.success('信息更新成功！');
        await actionRef.current?.reload();
      })
      .catch(() => false);
    if (res === false) {
      message.error('信息更新失败，请重新提交！');
      return false;
    }
    // 保存时解除编辑模式
    config.cancelEditable(id);
    return true;
  };

  useEffect(() => {}, []);

  return (
    <>
      <Alert message="未开放" type="warning" showIcon />
    </>
  );
};
