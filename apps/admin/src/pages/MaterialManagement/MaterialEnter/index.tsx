import { useRef, useState } from 'react';

import { ProTable } from 'components';
import { type ActionType } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Spin } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import EditDialog from './components/editdialog';
import ExpandTable from './ExpandTable';
import Styled from '@/components/Styled';
import SingleTitle from '@/components/SingleTitle';
import dayjs from 'dayjs';

import './index.scss';

// redux 相关
import { useAppSelector } from 'hooks';

// api 相关
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
// 表格相关
import siteModel from './models/table.model';

export default ({ onChange }: any) => {
  // api 相关
  const { server } = useBasicConfiguration();
  const { materialEnter } = server;

  // 获取 redux 中存储的用户信息
  const { user }: { user: any } = useAppSelector(
    (state) => state
  );

  // 初始化表格列
  const { fColumns, cColumns } = siteModel({ server });

  // 表格的受控 DOM
  const firstTableRef = useRef<ActionType>();

  // 控制弹窗的打开与关闭
  const [dialogVisible, setDialogVisible] =
    useState<boolean>(false);
  // 控制详情表单
  const [detail, setDetail] = useState({});
  // 流程状态
  const [status, setStatus] = useState('0');
  // 数据加载中，主要用于发起流程
  const [spinning, setSpinning] = useState(false);

  // 修改表单打开关闭状态
  const handleModalStateChange = async (state: boolean) => {
    setDialogVisible(state);
    setDetail({});
    await firstTableRef.current?.reload();
  };

  // 点击保存
  const onSave = async (params: any) => {
    const res = await materialEnter
      .updateFirst(params)
      .then(async () => {
        message.success('信息更新成功！');
        await firstTableRef.current?.reload();
      });
    return res;
  };

  // 删除行
  const onDelete = async (id: number) => {
    const res = await materialEnter
      .deleteEnter({ id })
      .then(async () => {
        message.success('信息删除成功！');
        await firstTableRef.current?.reload();
      });
    return res;
  };

  // 发起流程
  const onBpm = async (id: number) => {
    setSpinning(true);
    materialEnter.startBpm({ materialsEnterId: id }).then(() => {
      setSpinning(false);
      firstTableRef.current?.reload();
    });
  };

  return (
    <div className='h-full m-18px'>
      <Spin spinning={spinning}>
        <ProTable
          // rowKey="key"
          actionRef={firstTableRef}
          headerTitle={<SingleTitle label="物料/机械进场" />}
          columns={[
            ...fColumns,
            {
              title: '操作',
              width: 160,
              valueType: 'option',
              dataIndex: 'option',
              render: (
                _text: any,
                record: any,
                _: any,
                action: any
              ) => {
                if (
                  // 计划员,进行新增/编辑/删除/发起申请
                  record.status == '0' &&
                  user.userInfor.roles.find(
                    (item: string) => item == 'plan'
                  )
                ) {
                  return [
                    <div key="1">
                      <Popconfirm
                        title="发起申请后将无法编辑"
                        onConfirm={() => onBpm(record.id)}
                        okText="确认"
                        cancelText="取消"
                      >
                        <a>发起申请</a>
                      </Popconfirm>
                    </div>,
                    <div key="2">
                      <a
                        onClick={() => {
                          // console.log('点击了编辑')
                          setStatus('0');
                          handleModalStateChange(true);
                          setDetail(record);
                        }}
                      >
                        编辑
                      </a>
                    </div>,
                    <div key="3">
                      <Popconfirm
                        title="删除此项"
                        onConfirm={() => onDelete(record.id)}
                        okText="确认"
                        cancelText="取消"
                      >
                        <a>删除</a>
                      </Popconfirm>
                    </div>,
                  ];
                } else if (
                  // 项目经理,进行审核
                  record.status == '11' &&
                  user.userInfor.roles.find(
                    (item: string) => item == 'project-manager'
                  )
                ) {
                  return [
                    <div key="4">
                      <a
                        onClick={() => {
                          // console.log('点击了编辑')
                          setStatus('11');
                          handleModalStateChange(true);
                          setDetail(record);
                        }}
                      >
                        审核
                      </a>
                    </div>,
                  ];
                } else {
                  // 验收员,进行验收,填写验收数量等内容
                  return [
                    <div key="5">
                      {record.status == '1' &&
                        user.userInfor.roles.find(
                          (item: string) => item == 'wlys'
                        ) && (
                          <a
                            onClick={() => {
                              // console.log('点击了编辑')
                              setStatus('1');
                              handleModalStateChange(true);
                              setDetail(record);
                            }}
                          >
                            验收
                          </a>
                        )}
                    </div>,
                  ];
                }
              },
            },
          ]}
          request={async (params = {}) => {
            // console.log('Table 查询参数', params)
            const res = await materialEnter.getEnterList(params);
            res.list = res.list.map((item: any) => {
              item.enterDate = dayjs(item.enterDate).format(
                'YYYY-MM-DD HH:mm:ss'
              );
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
          toolBarRender={() => {
            if (
              user.userInfor.roles.find(
                (item: string) => item == 'plan'
              )
            ) {
              return [
                // <Styled.ExportButton
                //   api="exportMaterialsEnter"
                //   fileName="物料进场导出"
                // />,
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setStatus('0');
                    handleModalStateChange(true);
                    setDetail({});
                  }}
                  type="primary"
                >
                  新建
                </Button>,
              ];
            } else {
              return [];
            }
          }}
          editable={{ onSave }}
          expandable={{
            expandedRowRender: (record: any) =>
              ExpandTable(
                { record, server, cColumns, onChange },
                firstTableRef
              ),
          }}
          pagination={{
            pageSize: 10,
          }}
        ></ProTable>
      </Spin>
      <EditDialog
        key={`${dialogVisible}`}
        status={status}
        detail={detail}
        openModal={dialogVisible}
        onStateChange={handleModalStateChange}
      />
    </div>
  );
};
