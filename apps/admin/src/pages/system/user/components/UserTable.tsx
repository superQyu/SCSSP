import { useRef, useState, useEffect, Suspense, lazy } from 'react';
import { Button, message, Modal } from 'antd';
import { TableDropdown } from '@ant-design/pro-components';
import {
  PlusOutlined,
  EditOutlined,
  SearchOutlined,
  ExclamationCircleFilled,
  DoubleRightOutlined,
  DeleteOutlined,
  KeyOutlined,
  CheckCircleOutlined,
  InfoOutlined,
  LoadingOutlined,
} from '@ant-design/icons';

import { type ActionType } from '@ant-design/pro-components';
import { ProTable } from 'components';

const compLists = import.meta.glob('./user/*.tsx');
const menuLists = Object.entries(compLists).map(([key, val]) => {
  let keyName = key.split('/').slice(-1)[0].split('.')[0];
  if (keyName === 'index') keyName = key.split('/').slice(-2)[0];
  return {
    key: keyName,
    Component: lazy(val as () => Promise<any>),
  };
}) as { key: string; Component: React.LazyExoticComponent<React.ComponentType<any>> }[];

// 站点表格模型
import type { ModesApi } from '../modes/model';
import siteModel, { type ColumnsParamsProps } from '../modes/menu.model';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

interface Props {
  queryParams?: Record<string, any>;
}
export default ({ queryParams = {} }: Props) => {
  const { server } = useBasicConfiguration();
  const actionRef = useRef<ActionType>();

  const [subForm, setSubForm] = useState<Record<string, any>>({});
  const [formModal, setFormModal] = useState<string | false>(false);

  //  api server
  const { systemUser: SU } = server;

  const DynamicComp = () => {
    const isExsit = menuLists.filter((item) => item.key == formModal);
    if (!formModal || !isExsit[0]) return <></>;
    const Comp = isExsit[0].Component;
    return (
      <Comp subForm={subForm} openModal={!!formModal} onStateChange={handleModalStateChange} />
    );
  };

  // 修改状态
  const handleModalStateChange = async (state: string | false) => {
    setSubForm({});
    setFormModal(state);
    await actionRef.current?.reload();
  };

  // 初始化 表格列表项
  const initColumns = siteModel({ server });

  // 删除行
  const onDelete = async (id: number) => {
    const res = await SU.deleteUser({ id }).then(async () => {
      message.success('操作成功!');
    });
    return res;
  };

  // 保存save
  const onSave = async (params: any) => {
    const res = await SU.updateUser(
      JSON.parse(JSON.stringify({ ...params })) as ColumnsParamsProps
    );
    return res;
  };

  useEffect(() => {
    actionRef.current?.reload();
  }, [queryParams]);

  return (
    <>
      <ProTable
        headerTitle="用户列表"
        request={async (params: ModesApi.ParamsType) => {
          const res = await SU.userList({
            ...params,
            pageNo: params?.current || 0,
            ...queryParams,
          });
          res['list'] = res?.list.map((item: ModesApi.ParamsType) => {
            return { ...item, status: `${item.status}`, sex: `${item.sex}` };
          });
          return {
            ...params,
            data: res?.list || [],
            total: res?.totlal || 0,
          } as unknown as ModesApi.pageItemType;
        }}
        pagination={{
          pageSize: 30,
        }}
        onSubmit={async (params: {}) => {
          console.log(params);
        }}
        actionRef={actionRef}
        form={{
          syncToUrl: (values: any, _: string) => ({ ...values }),
        }}
        editable={{ onDelete, onSave }}
        columnsState={{
          persistenceKey: 'pro-table-singe-role',
          persistenceType: 'localStorage',
          onChange(_: any) {},
        }}
        toolBarRender={() => [
          <Button
            key="button"
            // @ts-ignore
            icon={<PlusOutlined />}
            onClick={() => setFormModal('structural')}
            type="primary"
          >
            新建
          </Button>,
        ]}
        search={{
          labelWidth: 'auto',
          optionRender: ({ searchText }: any, { form }: any, dom: any) => {
            return [
              dom[0],
              <Button
                type="primary"
                key="sub"
                // @ts-ignore
                icon={<SearchOutlined />}
                onClick={() => form?.submit()}
              >
                {searchText}
              </Button>,
            ];
          },
        }}
        scroll={{ y: 'auto' }}
        columns={[
          ...initColumns,
          {
            title: '操作',
            width: 140,
            valueType: 'option',
            key: 'option',
            render: (_text: any, record: any, _: any, action: any) => [
              <a
                key="editable"
                onClick={() => {
                  action?.startEditable?.(record.id);
                }}
              >
                {/* @ts-ignore  */}
                <EditOutlined style={{ marginInlineEnd: '5px' }} />
                编辑
              </a>,
              <TableDropdown
                key="actionGroup"
                onSelect={(key) => {
                  if (key === 'delete') {
                    try {
                      Modal.confirm({
                        title: `删除操作`,
                        // @ts-ignore
                        icon: <ExclamationCircleFilled />,
                        content: `确定删除用户 [${record.username}]?`,
                        okText: '删除',
                        okType: 'danger',
                        cancelText: '取消',
                        onOk: async () => {
                          await SU.deleteUser({ id: record.id });
                          action.reload();
                        },
                        onCancel() {},
                      });
                    } catch (errorInfo) {}
                  } else if (key === 'detail') {
                    setSubForm({ ...record });
                    setFormModal('structural');
                  } else if (key === 'resetPassword') {
                    setSubForm({ ...record });
                    setFormModal('resetPassword');
                  }
                }}
                menus={[
                  {
                    key: 'detail',
                    name: (
                      <>
                        {/* @ts-ignore */}
                        <InfoOutlined /> 详情
                      </>
                    ),
                  },
                  {
                    key: 'resetPassword',
                    name: (
                      <>
                        {/* @ts-ignore */}
                        <KeyOutlined /> 重置密码
                      </>
                    ),
                  },
                  {
                    key: 'assignRoles',
                    name: (
                      <>
                        {/* @ts-ignore */}
                        <CheckCircleOutlined /> 分配角色
                      </>
                    ),
                  },
                  {
                    key: 'delete',
                    name: (
                      <>
                        {/* @ts-ignore */}
                        <DeleteOutlined /> 删除
                      </>
                    ),
                  },
                ]}
              >
                {/* @ts-ignore  */}
                <DoubleRightOutlined />
                更多
              </TableDropdown>,
            ],
          },
        ]}
      ></ProTable>

      <Suspense
        fallback={
          //  @ts-ignore
          <LoadingOutlined size={20} />
        }
      >
        <DynamicComp />
      </Suspense>
    </>
  );
};
