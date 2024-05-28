import { useRef, useState } from 'react';
import { Button, Image, message } from 'antd';
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';
import { type ActionType } from '@ant-design/pro-components';
import { ProTable } from 'components';
import siteModel from './modes/menu.model';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import DetailForm from './components/detail';
import Styled from '@/components/Styled';
export default () => {
  const { server } = useBasicConfiguration();
  const actionRef = useRef<ActionType>();
  const { vehicle: V } = server;
  const initColumns = siteModel({ server });
  const [visible, setVisible] = useState(false);
  const [subForm, setSubForm] = useState<Record<string, any>>({});
  const detailModal = useRef();

  const trajectoryHandle = async (id: string | number) => {
    const res = await V.getPointRecord({
      id,
    });
    if (!res.length) {
      message.warning(`暂无车辆轨迹`);
    } else {
      setSubForm(res);
      detailModal.current?.openModal(true);
    }
  };

  return (
    <>
      <ProTable
        headerTitle="车辆进出记录"
        request={async (params: any) => {
          const { list, total } = await V.vehicleRecord(params);
          return {
            ...params,
            data: list || [],
            total: total || 0,
          };
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
            hideInSearch: true,
            title: '抓拍图片',
            dataIndex: 'attachment',

            render: (_, record) => {
              return (
                <>
                  <Button
                    type="link"
                    onClick={() => {
                      if (!record.attachment) {
                        message.warning(`暂无抓拍图片`);
                      } else {
                        setVisible(true);
                      }
                    }}
                  >
                    预览
                  </Button>
                  <Image
                    style={{ display: 'none' }}
                    preview={{
                      visible,
                      src: record.attachment || '',
                      onVisibleChange: (value) => {
                        setVisible(value);
                      },
                    }}
                  />
                </>
              );
            },
          },
          {
            hideInSearch: true,
            title: '轨迹',
            render: (_, record) => {
              return (
                <>
                  <Button
                    type="link"
                    onClick={() => {
                      trajectoryHandle(record.id);
                    }}
                    icon={<EyeOutlined />}
                  >
                    查看
                  </Button>
                </>
              );
            },
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
          <Styled.UploadButton api="exportCarInOutRecord" fileName="车辆进出场" />,
        ]}
      ></ProTable>
      <DetailForm subForm={subForm} ref={detailModal} />
    </>
  );
};
