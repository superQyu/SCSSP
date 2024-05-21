import { useRef, useState } from 'react';

import { ProTable } from 'components';
import { type ActionType } from '@ant-design/pro-components';
import { Button, message, Popconfirm } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import EditDialog from './components/editdialog';
import ExpandTable from './ExpandTable';

import dayjs from 'dayjs';

// api 相关
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
// 表格相关
import siteModel from './models/table.model';

export default ({ onChange }: any) => {
  // api 相关
  const { server } = useBasicConfiguration();
  const { materialEnter } = server;

  // 初始化表格列
  const { fColumns, cColumns } = siteModel({ server });

  // 表格的受控 DOM
  const firstTableRef = useRef<ActionType>();

  // 控制弹窗的打开与关闭
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  // 控制详情表单
  const [detail, setDetail] = useState({});

  // 修改表单打开关闭状态
  const handleModalStateChange = async (state: boolean) => {
    setDialogVisible(state);
    setDetail({});
    await firstTableRef.current?.reload();
  };

  // 点击保存
  const onSave = async (params: any) => {
    const res = await materialEnter.updateFirst(params).then(async () => {
      message.success('信息更新成功！');
      await firstTableRef.current?.reload();
    });
    return res;
  };

  // 删除行
  const onDelete = async (id: number) => {
    const res = await materialEnter.deleteEnter({ id }).then(async () => {
      message.success('信息删除成功！');
      await firstTableRef.current?.reload();
    });
    return res;
  };

  return (
    <>
      <ProTable
        // rowKey="key"
        actionRef={firstTableRef}
        // headerTitle="证件列表"
        columns={[
          ...fColumns,
          {
            title: '操作',
            width: 100,
            valueType: 'option',
            dataIndex: 'option',
            render: (_text: any, record: any, _: any, action: any) => [
              <a
                key="editable"
                onClick={() => {
                  // console.log('点击了编辑')
                  handleModalStateChange(true);
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
            ],
          },
        ]}
        request={async (params = {}) => {
          // console.log('Table 查询参数', params)
          const res = await materialEnter.getEnterList(params);
          res.list = res.list.map((item: any) => {
            item.enterDate = dayjs(item.enterDate).format('YYYY-MM-DD hh:mm:ss');
            return item;
          });
          // console.log('物料进场列表', res);
          return {
            // ...params,
            // success: true,
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
          <Button icon={<PlusOutlined />} onClick={() => setDialogVisible(true)} type="primary">
            新建
          </Button>,
        ]}
        editable={{}}
        expandable={{
          expandedRowRender: (record: any) =>
            ExpandTable({ record, server, cColumns, onChange }, firstTableRef),
        }}
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
