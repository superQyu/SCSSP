import { useRef, useState } from 'react';

import { ProTable } from 'components';
import { type ActionType } from '@ant-design/pro-components';
import { Button, message, Popconfirm } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

import Modal from './components/Modal';

// api 相关
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
// 表格相关
import siteModel from './models/table.model';
import { ToString } from '@/utils/transform';
import { useRoute } from 'hooks';

export default () => {
  // api 相关
  const { server } = useBasicConfiguration();
  const { flowForm } = server;

  const { tabNavigate } = useRoute();

  // 初始化表格列
  const initColumns = siteModel({ server });
  const actionRef = useRef<ActionType>();

  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [detail, setDetail] = useState({});

  // 修改表单打开关闭状态
  const handleModalStateChange: ModalState.ModalStateChange<''> = async (props) => {
    const { state, detail = {} } = props;
    setDetail(detail);
    setDialogVisible(state);
    !state && (await actionRef.current?.reload());
  };

  // 点击保存
  const onSave = async (params: any) => {
    const res = await flowForm.updateGroup(params);
    return res;
  };

  // 删除行
  const onDelete = async (id: number) => {
    const res = await flowForm.deleteForm({ id }).then(async () => {
      message.success('信息删除成功！');
      await actionRef.current?.reload();
    });
    return res;
  };

  return (
    <>
      <ProTable
        actionRef={actionRef}
        headerTitle="流程表单列表"
        columns={[
          ...initColumns,
          {
            title: '操作',
            width: 130,
            fixed: 'right',
            valueType: 'option',
            dataIndex: 'option',
            render: (_text: any, record: any, _: any, action: any) => [
              <a
                key="editable"
                onClick={() => {
                  tabNavigate({
                    namePath: `工作流程/流程管理/设计流程表单${record.id}`,
                    routePath: `/workflow/bpm/form/design?id=${record.id}`,
                  });
                }}
              >
                编辑
              </a>,
              <a
                key="detail"
                onClick={() => {
                  // console.log('点击了详情');
                  handleModalStateChange({ state: true });
                  // action?.startEditable?.(record.id);
                }}
              >
                详情
              </a>,
              <Popconfirm
                key="delete"
                title="删除此项"
                onConfirm={() => onDelete(record.id)}
                okText="确认"
                cancelText="取消"
              >
                <a>删除</a>
              </Popconfirm>,
            ],
          },
        ]}
        request={async (params = {}) => {
          const res = await flowForm.getFormPage(params);
          res.list = res.list.map((item: any) => {
            item.status = ToString(item.status);
            return item;
          });
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
        toolBarRender={() => [
          <Button
            icon={<PlusOutlined />}
            onClick={() => {
              tabNavigate({
                namePath: '工作流程/流程管理/设计流程表单',
                routePath: '/workflow/bpm/form/design',
              });
            }}
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
      <Modal
        key={`${dialogVisible}`}
        detail={detail}
        openModal={dialogVisible}
        onStateChange={handleModalStateChange}
      />
    </>
  );
};
