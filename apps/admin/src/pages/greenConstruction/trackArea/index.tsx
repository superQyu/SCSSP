import { useRef, useState } from 'react';
import { Button, message } from 'antd';
import { SearchOutlined, EyeOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { type ActionType } from '@ant-design/pro-components';
import { ProTable } from 'components';

import type { ModesApi } from './modes/model';
import siteModel from './modes/menu.model';
import DetailForm from './components/detail';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import AddForm from './components/addForm';
import SingleTitle from '@/components/SingleTitle';
export default () => {
  const { server } = useBasicConfiguration();
  const actionRef = useRef<ActionType>();
  const { vehicle: V } = server;
  const initColumns = siteModel({ server });
  const [subForm, setSubForm] = useState<Record<string, any>>({});
  const detailModal = useRef();

  const [formModal, setFormModal] = useState<boolean>(false);


  // 删除行
  const onDelete = async (id: number) => {
    const res = await V.delVehicleTrack({ id: id }).then(async () => {
      message.success('操作成功!');
      await actionRef.current?.reload();
    });
    return res;
  };
    // 修改状态
    const handleModalStateChange = async (state: boolean) => {
      setSubForm({});
      setFormModal(state);
      await actionRef.current?.reload();
    };
  

  return (
    <div className='h-full p-18px'>
      <ProTable
        headerTitle={<SingleTitle label="轨迹区域管理" />}
        request={async (params: ModesApi.ParamsType) => {
          const res = await V.vehicleTrackList({ ...params, pageNo: params?.current || 0 });
          res['list'] = res?.list.map((item: ModesApi.ParamsType) => {
            return { ...item, status: `${item.status}` };
          });
          return {
            ...params,
            data: res?.list || [],
            total: res?.totlal || 0,
          } as unknown as ModesApi.pageItemType;
        }}
        actionRef={actionRef}
        columnsState={{
          persistenceKey: 'pro-table-singe-role',
          persistenceType: 'localStorage',
          onChange(_: any) {},
        }}
        scroll={{ x: '1300px', y: 'auto' }}
        columns={[
          ...initColumns,
          {
            title: '操作',
            key: 'option',
            width: 200,
            valueType: 'option',
            fixed: 'right',
            render: (_text: any, record: any, _: any, action: any) => [
              <a
                key="editable"
                onClick={() => {
                  setSubForm(record);
                  detailModal.current?.openModal(true);
                }}
              >
                {<EyeOutlined />}
                查看
              </a>,

              ,
              <a
                key="delete"
                onClick={() => {
                  onDelete(record.id);
                }}
              >
                <DeleteOutlined />
                删除
              </a>,
            ],
          },
        ]}
        pagination={{
          pageSize: 30,
        }}
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
            key="button"
            icon={<PlusOutlined />}
            onClick={() => setFormModal(true)}
            type="primary"
          >
            新建
          </Button>,
        ]}
      ></ProTable>
      <AddForm  openModal={formModal}  onStateChange={handleModalStateChange} />
      <DetailForm subForm={subForm} ref={detailModal} />
    </div>
  );
};
