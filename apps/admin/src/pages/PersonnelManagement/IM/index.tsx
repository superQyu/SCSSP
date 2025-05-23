import {
  cloneElement,
  useRef,
  useState,
  useEffect,
} from 'react';
import { useRoute } from 'hooks';

import { ProTable } from 'components';
// import { ProTable } from '@ant-design/pro-components';
import type {
  ProColumns,
  ActionType,
} from '@ant-design/pro-components';
import {
  Button,
  message,
  DatePicker,
  Space,
  Table,
  Alert,
  Modal,
  Popconfirm,
  Upload,
  notification,
} from 'antd';
import type { UploadProps } from 'antd';
import Styled from '@/components/Styled';

import {
  PlusOutlined,
  SearchOutlined,
  UploadOutlined,
  DownloadOutlined,
  InboxOutlined,
} from '@ant-design/icons';

import { useAppSelector } from 'hooks';
// 文件下载工具
import { downFiles } from 'utils';
const { RangePicker } = DatePicker;
const { Dragger } = Upload;

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

const ProcessMap = {
  close: 'normal',
  running: 'active',
  online: 'success',
  error: 'exception',
} as const;

export type TableListItem = {
  key: number;
  name: string;
  progress: number;
  containers: number;
  callNumber: number;
  creator: string;
  status: string;
  createdAt: number;
  memo: string;
};
const tableListDataSource: TableListItem[] = [];

const creators = [
  '付小小',
  '曲丽丽',
  '林东东',
  '陈帅帅',
  '兼某某',
];

for (let i = 0; i < 50; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName-' + i,
    containers: Math.floor(Math.random() * 20),
    callNumber: Math.floor(Math.random() * 2000),
    progress: Math.ceil(Math.random() * 100) + 1,
    creator:
      creators[Math.floor(Math.random() * creators.length)],
    status:
      valueEnum[
      ((Math.floor(Math.random() * 10) % 4) + '') as '0'
      ],
    createdAt: Date.now() - Math.floor(Math.random() * 100000),
    memo:
      i % 2 === 1
        ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴'
        : '简短备注文案',
  });
}

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

// 人员管理表格模型
import type { ModesApi } from './modes/model';
import PMmodel, {
  type ColumnsParamsProps,
} from './modes/PM.model';
import { divide } from 'lodash';

// const uploadProps: UploadProps = {
//   name: 'file',
//   maxCount: 1,
//   customRequest: (options) => {
// console.log('options',options)
//   },

//   onChange(info) {
//     console.log(2222, info.file)
//     // const { status } = info.file;
//     // if (status !== 'uploading') {
//     //   console.log(info.file, info.fileList);
//     // }
//     // if (status === 'done') {
//     //   message.success(
//     //     `${info.file.name} file uploaded successfully.`
//     //   );
//     // } else if (status === 'error') {
//     //   message.error(`${info.file.name} file upload failed.`);
//     // }
//   },
//   onDrop(e) {
//     console.log('err', e.dataTransfer.files);
//   },
// };

export default () => {
  const {
    common: { dictionary },
  } = useAppSelector((state) => state) as {
    common: { dictionary: Record<string, any> };
  };
  // 获取 redux 中存储的用户信息
  const { user }: { user: any } = useAppSelector(
    (state) => state
  );
  const [api, contextHolder2] = notification.useNotification();

  const [modal, contextHolder] = Modal.useModal();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);


  const [openApi, setOpenApi] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const { server } = useBasicConfiguration();
  //  api server
  const { PMIM, menus: M } = server;

  // 初始化 表格列表项
  const initColumns = PMmodel({ server });

  // 路由跳转
  const { tabNavigate } = useRoute();

  const [fileList, setFileList] = useState<any[]>([]);
  const [searchParams, setSearchParams] = useState<any>({
    isOverAge: '',
    isCertificated: ''
  });

  const customRequest = (options: any) => {
    setFileList([...fileList, {
      file: options.file,
      uid: Date.now(),
      name: options.file.name,
      status: 'done', // 设为已完成状态，这样会在列表中显示
    }]);
  };


  useEffect(() => {
    notification.destroy();
    PMIM.getOverAgeAndNotCertificatedCount().then((res) => {
      notification.warning({
        message: '请注意!',
        description: (
          <div className="font-size-18px color-red">
            <div>
              <span className="mr-3">超龄人数</span>
              <span>{res.overAgeCount}人</span>
            </div>
            <div>
              <span className="mr-3">证书缺失人数</span>
              <span>{res.notCertificatedCount}人</span>
            </div>
          </div>
        ),
        duration: 0,
      });
    });
  }, []);

  // 删除行
  const onDelete = async (id: number) => {
    const res = await PMIM.deletePersonnelInfo({ id: id }).then(
      async () => {
        message.success('操作成功!');
        await actionRef.current?.reload();
      }
    );
    return res;
  };

  const onSave = async (params: any) => {
    const res = await M.updateMenu(
      JSON.parse(
        JSON.stringify({ ...params })
      ) as ColumnsParamsProps
    ).then(async () => {
      message.success('信息更新成功！');
      await actionRef.current?.reload();
    });
    return res;
  };
  // 点击取消
  const handleCancel = () => {
    setOpenModal(false);
  };

  return (
    <>
      {/* <Alert message="表格字典为同步" type="warning" showIcon /> */}
      {contextHolder}
      <ProTable
        actionRef={actionRef}
        rowClassName={(record) => {
          if (
            record.isOverAge == 1 &&
            record.isCertificated == 0
          ) {
            return 'color-red';
          } else if (
            record.isOverAge == 1 &&
            record.isCertificated == 1
          ) {
            return 'color-yellow';
          } else if (
            record.isOverAge == 0 &&
            record.isCertificated == 0
          ) {
            return 'color-orange';
          } else {
            return '';
          }
        }}
        request={async (params = {}) => {
          const { isOverAge, isCertificated } = params
          const res = await PMIM.personnelInfoList({
            ...params,
          });
          setSearchParams({
            ...searchParams,
            isOverAge: isOverAge,
            isCertificated: isCertificated
          })
          return {
            ...params,
            data: res.list,
            total: res.total,
          } as unknown as ModesApi.pageItemType;
        }}
        columns={[
          ...initColumns,
          {
            title: '操作',
            width: 140,
            valueType: 'option',
            key: 'option',
            fixed: 'right',
            render: (
              _text: any,
              record: any,
              _: any,
              action: any
            ) => {
              const btns = [
                <a
                  key="editable"
                  onClick={() => {
                    tabNavigate({
                      namePath: `项目人员管理/审核人员信息`,
                      routePath: `/PersonDetail/?id=${record.id}&ifEdit=${true}`,
                      activeMenu: '/PM/IM',
 
                    });
                  }}
                >
                  审核
                </a>,
                <a
                  key="editable"
                  onClick={() => {
                    // action?.startEditable?.(record.id);
                    tabNavigate({
                      namePath: `项目人员管理/人员详情${record.id}`,
                      routePath: `/PersonDetail/?id=${record.id}`,
                      activeMenu: '/PM/IM',
                    });
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
              ]

              return user.userInfor.roles.find(
                (item: string) => item == 'project-manager' || item == 'super_admin'
              ) && !record.status ? btns : btns.slice(1)
            }
          },
        ]}
        scroll={{ x: 1900, y: 'auto' }}
        onSubmit={async (params: {}) => { }}
        pagination={{
          pageSize: 30,
        }}
        rowKey="id"
        headerTitle={
          <>
            <div>人员管理</div>
            <Styled.Tooltip>
              黄色表示超龄, 橙色表示证书缺失,
              红色表示既超龄也缺失证书
            </Styled.Tooltip>
          </>
        }
        columnsState={{
          persistenceKey: 'pro-table-pm-im',
          persistenceType: 'localStorage',
          onChange(_: any) { },
        }}
        form={{
          syncToUrl: (values: any, _: string) => ({ ...values }),
        }}
        //
        editable={{ onSave }}
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
          <Styled.ImportButton
            key="button"
            onClick={() => {
              setOpenModal(true);
            }}
            type="primary"
          />,
          <Styled.ExportButton
            api="exportPersonnelInfo"
            fileName="人员信息导出"
            params={searchParams}
          />,
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              tabNavigate({
                namePath: `项目人员管理/信息采集`,
                routePath: `/PersonDetail`,
                activeMenu: '/PM/IM',
              });
            }}
            type="primary"
          >
            新建
          </Button>,
          <Button
            key="button"
            danger
            icon={<SearchOutlined />}
            onClick={() => {
              tabNavigate({
                namePath: `项目人员管理/信息缺失人员`,
                routePath: `/PM/MIPersonInfo`,
                activeMenu: '/PM/IM',
              });
            }}
            type="primary"
          >
            信息缺失人员
          </Button>,
        ]}
      />
      <Modal
        open={openModal}
        title={
          <div className="flex items-center">
            <div>上传文件</div>
            <div className="ml-3">
              <Button
                key="button"
                icon={<DownloadOutlined />}
                onClick={() => {
                  PMIM.exportModelInfo({
                  }).then((data: any) => {
                    downFiles.excel(data, '信息管理数据模板');
                  })
                }}
                type="primary"
              >
                下载数据模板
              </Button>
            </div>
          </div>
        }
        width={1000}
        onCancel={handleCancel}
        maskClosable={false}
        footer={null}
      >
        <div>
          <Dragger
            name="file"
            fileList={fileList}
            customRequest={customRequest}
            onRemove={(file) => {
              const index = fileList.indexOf(file);
              const newFileList = fileList.slice();
              newFileList.splice(index, 1);
              setFileList(newFileList);
            }}
          >
            {fileList.length == 0 ?
              <div>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  点击或拖拽文件至此区域进行上传
                </p>
              </div> : ''
            }
          </Dragger>
          <div className="flex justify-center mt-3">
            <Button
              disabled={fileList.length < 1}
              key="button"
              icon={<DownloadOutlined />}
              onClick={async () => {
                const formData = new FormData();
                formData.append('file', fileList[0].file)
                try {
                  await PMIM.importByModel(formData)
                  message.success('导入成功！')
                } catch {
                  message.warning('导入失败！')
                }
              }}
              type="primary"
            >
              确认导入
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        open={open}
        title={<div>审批人员信息</div>}
        // onOk={handleOk}
        // onCancel={handleCancel}
        maskClosable={false}
      // footer={[
      //   <Button key="back" onClick={handleCancel} disabled={loading}>
      //     取消
      //   </Button>,
      //   <Button key="reset" htmlType="reset" onClick={onReset} disabled={loading}>
      //     通过
      //   </Button>,
      //   <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
      //     驳回
      //   </Button>,
      // ]}
      >
        {/* <AdForm
        loadingTitle="提交中..."
        formRef={formRef}
        initialValues={{ ...menus }}
        loading={loading}
        labelAlign="left"
        onFormChange={onFormChange}
        columns={columns}
      /> */}
      </Modal>
    </>
  );
};
