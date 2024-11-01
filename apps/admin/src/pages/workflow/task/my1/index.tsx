import { useRef, useState } from 'react';

import { ProTable } from 'components';
import { type ActionType } from '@ant-design/pro-components';
import { Button, message, Popconfirm } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

import EditDialog from './components/editdialog';

import { useRoute } from 'hooks';

// api 相关
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
// 表格相关
import siteModel from './models/table.model';

export default () => {
  // api 相关
  const { server } = useBasicConfiguration();
  const { flowInstance } = server;
  const { tabNavigate } = useRoute();

  // 初始化表格列
  const initColumns = siteModel({ server });
  const actionRef = useRef<ActionType>();

  const [dialogVisible, setDialogVisible] =
    useState<boolean>(false);
  const [detail, setDetail] = useState({});

  // 修改表单打开关闭状态
  const handleModalStateChange = async (state: boolean) => {
    setDetail({});
    setDialogVisible(state);
    await actionRef.current?.reload();
  };

  // 点击保存
  const onSave = async (params: any) => {
    const res = await flowInstance
      .updateflowInstance(params)
      .then(async () => {
        message.success('信息更新成功！');
        await actionRef.current?.reload();
      });
    return res;
  };

  // 删除行
  const onDelete = async (id: number) => {
    const res = await flowInstance
      .deleteflowInstance({ id })
      .then(async () => {
        message.success('信息删除成功！');
        await actionRef.current?.reload();
      });
    return res;
  };

  return (
    <>
      <ProTable
        actionRef={actionRef}
        headerTitle="我的流程"
        columns={[
          ...initColumns,
          {
            title: '操作',
            width: 100,
            fixed: 'right',
            valueType: 'option',
            dataIndex: 'option',
            render: (
              _text: any,
              row: any,
              _: any,
              action: any
            ) => [
              <a
                onClick={() => {
                  tabNavigate({
                    tabName: '流程详情',
                    namePath: `工作流程/${row.name}`,
                    routePath: `/flow/process-instance/detail?id=${row.id}`,
                    activeMenu: '/workflow/task/my',
                  });
                }}
              >
                详情
              </a>,
              <>
                {row.result === 1 && (
                  <a
                    onClick={() => {
                      // console.log('点击了编辑')
                      handleModalStateChange(true);
                      // action?.startEditable?.(record.id);
                      setDetail(row);
                    }}
                  >
                    取消
                  </a>
                )}
              </>,
            ],
          },
        ]}
        request={async (params = {}) => {
          const res =
            await flowInstance.getMyProcessInstancePage(params);
          // console.log('工种列表', res);
          return {
            data: res.list,
            total: res.total,
          };
        }}
        form={{
          ignoreRules: false,
        }}
        scroll={{ y: 'auto' }}
        search={{
          labelWidth: 'auto',
          optionRender: (
            { searchText }: any,
            { form }: any,
            dom: any
          ) => {
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
        toolBarRender={() => [
          <Button
            icon={<PlusOutlined />}
            onClick={() => setDialogVisible(true)}
            type="primary"
          >
            新建
          </Button>,
        ]}
        editable={{ onDelete, onSave }}
        pagination={{
          pageSize: 10,
        }}
      ></ProTable>
      <EditDialog
        key={`${dialogVisible}`}
        detail={detail}
        openModal={dialogVisible}
        onStateChange={handleModalStateChange}
      />
    </>
  );
};
