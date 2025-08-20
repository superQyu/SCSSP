import { useRef, useState } from 'react';
import { type ActionType } from '@ant-design/pro-components';
import { Button, message, Popconfirm } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

import { ProTable } from 'components';
import EditDialog from './components/editdialog';
import Styled from '@/components/Styled';
import SingleTitle from '@/components/SingleTitle';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import siteModel from './models/table.model';
import { ToString } from '@/utils/transform';

export default () => {
  const { server } = useBasicConfiguration();
  const { subContractor } = server;

  const initColumns = siteModel({ server });
  const actionRef = useRef<ActionType>();

  const [dialogVisible, setDialogVisible] =
    useState<boolean>(false);
  const [detail, setDetail] = useState({});
  const [type, setType] = useState('');

  // 修改表单打开关闭状态
  const handleModalStateChange = async (state: boolean) => {
    setDetail({});
    setDialogVisible(state);
    await actionRef.current?.reload();
  };

  // 点击保存
  const onSave = async (params: any) => {
    // console.log('编辑单位时的参数', params);
    const res = await subContractor.updateSubContractor(params);
    return res;
  };

  // 删除行
  const onDelete = async (id: number) => {
    const res = await subContractor
      .deleteSubContractor({ id })
      .then(async () => {
        message.success('信息删除成功！');
        await actionRef.current?.reload();
      });
    return res;
  };

  return (
    <div className="h-full p-18px">
      <ProTable
        actionRef={actionRef}
        headerTitle={<SingleTitle label="设备列表" />}
        columns={[
          ...initColumns,
          {
            title: '操作',
            width: 160,
            fixed: 'right',
            valueType: 'option',
            dataIndex: 'option',
            render: (
              _text: any,
              record: any,
              _: any,
              action: any
            ) => [
              <a
                key="editable"
                onClick={() => {
                  setType('edit');
                  setDialogVisible(true);
                  setDetail(record);
                }}
              >
                编辑
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
              <a
                key="view"
                onClick={() => {
                  setType('view');
                  setDialogVisible(true);
                  setDetail(record);
                }}
              >
                查看
              </a>,
            ],
          },
        ]}
        request={async (params = {}) => {
          const res = await subContractor.getSubContractorList(
            params
          );
          res.list = res.list.map((item: any) => {
            item.subcontractorType = ToString(
              item.subcontractorType
            );
            item.corpType = ToString(item.corpType);
            item.overallMerit = ToString(item.overallMerit);
            item.isConformity = ToString(item.isConformity);
            return item;
          });
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
        editable={{ onSave }}
        pagination={{}}
      ></ProTable>
      <EditDialog
        key={`${dialogVisible}`}
        detail={detail}
        openModal={dialogVisible}
        onStateChange={handleModalStateChange}
        type={type}
      />
    </div>
  );
};
