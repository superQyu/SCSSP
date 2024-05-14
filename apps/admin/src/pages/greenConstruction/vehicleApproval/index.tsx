import { useRef, useEffect, useState } from 'react';
import { Button, message, Modal, Input, Form, Radio } from 'antd';
const { TextArea } = Input;
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  FileDoneOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons';

import { type ActionType } from '@ant-design/pro-components';
import { ProTable } from 'components';

import siteModel from './modes/menu.model';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import AddForm from './components/addForm';
import ApproveForm from './components/approveForm';

export default () => {
  const { server } = useBasicConfiguration();
  const actionRef = useRef<ActionType>();
  const { vehicle: V } = server;
  const initColumns = siteModel({ server });

  const [subForm, setSubForm] = useState<Record<string, any>>({});
  const [subApproveForm, setSubApproveForm] = useState<Record<string, any>>({});
  const [formModal, setFormModal] = useState<boolean>(false);
  const [approveFormModal, setApproveFormModal] = useState<boolean>(false);

  // 修改状态
  const handleModalStateChange = async (state: boolean) => {
    setSubForm({});
    setFormModal(state);
    await actionRef.current?.reload();
  };

  // 删除行
  const onDelete = async (id: number) => {
    const res = await V.vehicleApproveDel({ id: id }).then(async () => {
      message.success('操作成功!');
      await actionRef.current?.reload();
    });
    return res;
  };

  // 保存
  const onSave = async (params: any) => {
    const res = await V.vehicleApproveUpdate(JSON.parse(JSON.stringify(params)));
    return res;
  };

  useEffect(() => {}, []);

  return (
    <>
      <ProTable
        headerTitle="车辆进出场备案审批"
        request={async (params: any) => {
          const { list, total } = await V.vehicleApproveList(params);
          const res = list.map((item: any) => {
            return {
              ...item,
              carType: `${item.carType}`,
            };
          });
          return {
            ...params,
            data: res || [],
            total: total || 0,
          };
        }}
        actionRef={actionRef}
        columnsState={{
          persistenceKey: 'pro-table-singe-role',
          persistenceType: 'localStorage',
          onChange(_: any) {},
        }}
        scroll={{ x: '1500', y: 'auto' }}
        columns={[
          ...initColumns,
          {
            title: '操作',
            key: 'option',
            width: 180,
            valueType: 'option',
            render: (_text: any, record: any, _: any, action: any) => [
              <a
                key="editable"
                onClick={() => {
                  action?.startEditable?.(record.id);
                }}
              >
                {<EditOutlined />}
                编辑
              </a>,
              ,
              <a
                key="delete"
                onClick={() => {
                  onDelete(record.id);
                }}
              >
                <DeleteOutlined />
                删除
              </a>,
              <a
                key="approve`."
                onClick={() => {
                  setSubApproveForm(record);
                  setApproveFormModal(true);
                }}
              >
                {<FileDoneOutlined />}
                审批
              </a>,
            ],
          },
        ]}
        editable={{ onDelete, onSave }}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => setFormModal(true)}
            type="primary"
          >
            新建
          </Button>,
        ]}
        pagination={{
          pageSize: 30,
        }}
        search={{
          labelWidth: 'auto',
          optionRender: ({ searchText }: any, { form }: any, dom: any) => {
            return [
              dom[0],
              <Button
                type="primary"
                key="sub"
                icon={<SearchOutlined />}
                onClick={() => form?.submit()}
              >
                {searchText}
              </Button>,
            ];
          },
        }}
      ></ProTable>
      <AddForm subForm={subForm} openModal={formModal} onStateChange={handleModalStateChange} />
      <ApproveForm
        subForm={subApproveForm}
        openModal={approveFormModal}
        onStateChange={handleModalStateChange}
      />
    </>
  );
};
