import {
  useRef,
  useState,
} from 'react';
import { useRoute } from 'hooks';

import { ProTable } from 'components';
import type {
  ActionType,
} from '@ant-design/pro-components';
import {
  Button,
  message,
  Modal,
  Popconfirm,
  notification,
} from 'antd';
import type { UploadProps } from 'antd';

import {
  RollbackOutlined
} from '@ant-design/icons';

import { useAppSelector } from 'hooks';

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

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

const uploadProps: UploadProps = {
  name: 'file',
  multiple: true,
  action:
    'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(
        `${info.file.name} file uploaded successfully.`
      );
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

export default () => {
  const {
    common: { dictionary },
  } = useAppSelector((state) => state) as {
    common: { dictionary: Record<string, any> };
  };
  const [api, contextHolder2] = notification.useNotification();

  const [modal, contextHolder] = Modal.useModal();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openApi, setOpenApi] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const { server } = useBasicConfiguration();
  //  api server
  const { PMIM, menus: M } = server;

  // 初始化 表格列表项
  const initColumns = PMmodel({ server });

  // 路由跳转
  const { tabNavigate } = useRoute();



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
        request={async (params = {}) => {
          const res = await PMIM.getPersonnelNeedUpdateList({
            ...params,
          });
          return {
            ...params,
            data: res,

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
            ) => [
                <a
                  key="editable"
                  onClick={() => {
                    // action?.startEditable?.(record.id);
                    tabNavigate({
                      namePath: `项目人员管理/人员详情${record.id}`,
                      routePath: `/PersonDetail/?id=${record.id}&missing=${true}`,
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
              ],
          },
        ]}
        scroll={{ x: 1900, y: 'auto' }}
        onSubmit={async (params: {}) => { }}
        pagination={false}
        rowKey="id"

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
        headerTitle={
          <Button

            type="primary"
            icon={<RollbackOutlined />}
            onClick={() => {
              tabNavigate({
                namePath: `项目人员管理/信息管理`,
                routePath: `/PM/IM`,
                activeMenu: '/PM/IM',
              });
            }}
          >
            返回
          </Button>
        }

      />

    </>
  );
};
