import { useRef, useEffect, useState } from 'react';
import { Button, message, Popconfirm } from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  FileDoneOutlined,
} from '@ant-design/icons';
import { type ActionType } from '@ant-design/pro-components';

import { useAppSelector } from 'hooks';
import { ProTable } from 'components';
import siteModel from './modes/menu.model';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import AddForm from './components/addForm';
// import ApproveForm from './components/approveForm';
import Styled from '@/components/Styled';
import SingleTitle from '@/components/SingleTitle';
import dayjs from 'dayjs';
export default () => {
  const { user }: { user: any } = useAppSelector(
    (state) => state
  );
  const { server } = useBasicConfiguration();
  const actionRef = useRef<ActionType>();
  const { vehicle: V, materialEnter: M } = server;
  const initColumns = siteModel({ server });

  const [subForm, setSubForm] = useState<Record<string, any>>(
    {}
  );
  const [materials, setMaterials] = useState([]);
  const [formModal, setFormModal] = useState<boolean>(false);
  // const [approveFormModal, setApproveFormModal] = useState<boolean>(false);
  // const [subApproveForm, setSubApproveForm] = useState<Record<string, any>>({});

  const checkApprove = async (id: string) => {
    const res = await V.check({
      id,
    });
    if (res) {
      message.success('提交成功');
    }
    actionRef.current?.reload();
  };

  // 修改状态
  const handleModalStateChange = async (state: boolean) => {
    setSubForm({});
    setFormModal(state);
    await actionRef.current?.reload();
  };

  // 删除行
  const onDelete = async (id: number) => {
    const res = await V.vehicleApproveDel({ id: id }).then(
      async () => {
        message.success('操作成功!');
        await actionRef.current?.reload();
      }
    );
    return res;
  };

  // 保存
  const onSave = async (params: any) => {
    const res = await V.vehicleApproveUpdate(
      JSON.parse(JSON.stringify(params))
    );
    return res;
  };

  const queryMaterial = async () => {
    const res = await M.getEnterList({});
    const options = res.list.map((item: any) => {
      const materials = item.materialsDetailsWithInventoryRespVOS
        .map((el, i) => {
          return `${el.materialName}`;
        })
        .join('和');
      return {
        label: `${dayjs(item.enterDate).format(
          'YYYY-MM-DD HH:mm:ss'
        )} ${materials}`,
        value: item.id,
      };
    });
    setMaterials(options);
  };

  useEffect(() => {
    queryMaterial();
  }, []);

  return (
    <div className="h-full p-18px">
      <ProTable
        headerTitle={<SingleTitle label="车辆进出场备案审批" />}
        request={async (params: any) => {
          const { list, total } = await V.vehicleApproveList(
            params
          );
          const res = list.map((item: any) => {
            return {
              ...item,
              carType: `${item.carType}`,
            };
          });
          return {
            ...params,
            data: res || [],
            total: total || 0,
          };
        }}
        actionRef={actionRef}
        columnsState={{
          persistenceKey: 'pro-table-singe-role',
          persistenceType: 'localStorage',
          onChange(_: any) {},
        }}
        // scroll={{ x: '1800px', y: 'auto' }}
        scroll={{ y: 'auto' }}
        columns={[
          ...initColumns,
          {
            title: '操作',
            key: 'option',
            width: 200,
            valueType: 'option',
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
                  handleModalStateChange(true);

                  setSubForm({
                    ...record,
                    attachment: record.attachment,
                    materialEnterName:
                      materials.find(
                        (item: any) =>
                          item.value == record.materialEnterId
                      )?.label || '',
                  });
                }}
              >
                {<EditOutlined />}
                编辑
              </a>,
              <Popconfirm
                key="delete"
                title="删除此项"
                onConfirm={() => {
                  onDelete(record.id);
                }}
                okText="确认"
                cancelText="取消"
              >
                <a>删除</a>
              </Popconfirm>,

              !record.result &&
                user.userInfor.roles.find(
                  (item: string) =>
                    item == 'project-manager' ||
                    item == 'super_admin'
                ) && (
                  <a
                    key="approve"
                    onClick={() => {
                      checkApprove(record.id);
                    }}
                  >
                    {<FileDoneOutlined />}
                    提交审核
                  </a>
                ),
            ],
          },
        ]}
        editable={{ onDelete, onSave }}
        toolBarRender={() => [
          <Styled.ExportButton
            api="exportCarDispatchRecord"
            fileName="车辆导出"
          />,
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => setFormModal(true)}
            type="primary"
          >
            新建
          </Button>,
        ]}
        // pagination={{
        //   pageSize: 30,
        // }}
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
      ></ProTable>
      <AddForm
        key={`${formModal}`}
        subForm={subForm}
        openModal={formModal}
        onStateChange={handleModalStateChange}
      />
      {/* <ApproveForm
        subForm={subApproveForm}
        openModal={approveFormModal}
        onStateChange={handleModalStateChange}
      /> */}
    </div>
  );
};
