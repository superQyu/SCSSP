import { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { ProTable } from 'components';
import { type ActionType } from '@ant-design/pro-components';
import { Button, message, Popconfirm } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

import EditDialog from './components/editdialog';

// api 相关
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import siteModel from './models/table.model';
import SingleTitle from '@/components/SingleTitle';
export default () => {
  // api 相关
  const { server } = useBasicConfiguration();
  const { certificate } = server;

  // 获取当前路由
  const location = useLocation().pathname;
  // console.log('当前路由', location)

  // 初始化表格列
  const initColumns = siteModel({ server });
  const actionRef = useRef<ActionType>();

  // 控制弹窗的打开与关闭
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  // 控制详情弹窗的内容
  const [detail, setDetail] = useState({});
  // 控制当前选择的路由 type
  const [type, setType] = useState('0');

  useEffect(() => {
    // 值分别为0, 1, 2
    setType(location.slice(-1));
  }, []);

  // 修改表单打开关闭状态
  const handleModalStateChange = async (state: boolean) => {
    setDetail({});
    setDialogVisible(state);
    await actionRef.current?.reload();
  };

  // 点击保存
  const onSave = async (params: any) => {
    const res = await certificate.updateCertificate(params).then(async () => {
      message.success('信息更新成功！');
      await actionRef.current?.reload();
    });
    return res;
  };

  // 删除行
  const onDelete = async (id: number) => {
    const res = await certificate.deleteCertificate({ id }).then(async () => {
      message.success('信息删除成功！');
      await actionRef.current?.reload();
    });
    return res;
  };

  return (
    <div className='h-full p-18px'>
      <ProTable
        actionRef={actionRef}
        headerTitle={<SingleTitle label="证件列表" />}
        columns={[
          ...initColumns[type],
          {
            title: '操作',
            width: 100,
            fixed: 'right',
            valueType: 'option',
            dataIndex: 'option',
            render: (_text: any, record: any) => [
              <a
                key="editable"
                onClick={() => {
                  // console.log('点击了编辑')
                  handleModalStateChange(true);
                  // action?.startEditable?.(record.id);
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
        params={{ certificateCategory: type }}
        request={async (params = {}) => {
          // console.log('Table 查询参数', params)
          const res = await certificate.getCertificateList(params);
          res.list = res.list.map((item: any) => {
            item.workerType = item.workerType && `${item.workerType}`
            item.jobCategory = item.jobCategory && `${item.jobCategory}`
            return item;
          });
          // console.log('证件列表', res);
          return {
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
        editable={{ onDelete, onSave }}
        pagination={{
          pageSize: 10,
        }}
      ></ProTable>
      <EditDialog
        key={`${dialogVisible}`}
        type={type}
        detail={detail}
        openModal={dialogVisible}
        onStateChange={handleModalStateChange}
      />
    </div>
  );
};
