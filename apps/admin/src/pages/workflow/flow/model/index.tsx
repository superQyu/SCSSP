import { useRef, useState } from 'react';

import { ProTable } from 'components';
import { TableDropdown, type ActionType } from '@ant-design/pro-components';
import { Button, message, Popconfirm } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

import { type modalType } from './models/model';
import EditDialog from './components/editdialog';
import FlowChartModal from './components/FlowChartModal';
import FormCreateModal from './components/FormCreateModal';

import { Navigate, useNavigate } from 'react-router-dom';

// api 相关
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
// 表格相关
import siteModel from './models/table.model';
import { ToString } from '@/utils/transform';

export default () => {
  // api 相关
  const { server } = useBasicConfiguration();
  const { flowModel } = server;

  // 修改表单打开关闭状态
  const handleModalStateChange: ModalState.ModalStateChange<modalType> = async (props) => {
    const { state, type, detail = {} } = props;
    setDetail(detail);
    if (type == 'flowChart') setFlowChartModal(state);
    else if (type == 'formCreate') setFormCreateModal(state);
    !state && (await actionRef.current?.reload());
  };

  // 初始化表格列
  const initColumns = siteModel({ server, handleModalStateChange: handleModalStateChange });
  const actionRef = useRef<ActionType>();

  // 弹窗相关
  // 流程图弹窗
  const [flowChartModal, setFlowChartModal] = useState<boolean>(false);
  // 表单信息弹窗
  const [formCreateModal, setFormCreateModal] = useState<boolean>(false);
  const [detail, setDetail] = useState({});

  // 点击保存
  const onSave = async (params: any) => {
    const res = await flowModel.updateGroup(params);
    return res;
  };

  // 删除行
  const onDelete = async (id: number) => {
    const res = await flowModel.deleteGroup({ id }).then(async () => {
      message.success('信息删除成功！');
      await actionRef.current?.reload();
    });
    return res;
  };

  return (
    <>
      <ProTable
        actionRef={actionRef}
        headerTitle="班组列表"
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
                  // console.log('点击了编辑')
                  // handleModalStateChange(true);
                  // action?.startEditable?.(record.id);
                  setDetail(record);
                }}
              >
                编辑
              </a>,
              <TableDropdown
                key="actionGroup"
                onSelect={(key) => {
                  console.log('点击的按钮', key);

                  // action?.reload()
                }}
                menus={[
                  { key: 'design', name: '设计流程' },
                  { key: 'distribute', name: '分配规则' },
                  { key: 'release', name: '发布流程' },
                  { key: 'define', name: '流程定义' },
                ]}
              />,
              <Popconfirm
                key="delete"
                title="删除此项"
                onConfirm={() => onDelete(record.id)}
                okText="确认"
                cancelText="取消"
              >
                <a className="color-red">删除</a>
              </Popconfirm>,
            ],
          },
        ]}
        request={async (params = {}) => {
          const res = await flowModel.getModelPage(params);
          res.list = res.list.map((item: any) => {
            item.category = ToString(item.category);
            return item;
          });
          // console.log('流程模型列表', res);
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
            onClick={() => handleModalStateChange({ state: false, type: 'flowChart' })}
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
      {/* <EditDialog
        key={`${flowChartModal}`}
        detail={detail}
        openModal={flowChartModal}
        onStateChange={handleModalStateChange}
      /> */}
      {/* 点击流程名称列打开 */}
      <FlowChartModal
        key={`FlowChartModal${flowChartModal}`}
        detail={detail}
        openModal={flowChartModal}
        onStateChange={handleModalStateChange}
      />
      <FormCreateModal
        key={`FormCreateModal${formCreateModal}`}
        detail={detail}
        openModal={formCreateModal}
        onStateChange={handleModalStateChange}
      />
    </>
  );
};
