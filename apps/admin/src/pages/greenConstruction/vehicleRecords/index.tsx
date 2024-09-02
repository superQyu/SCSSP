import { useRef, useState } from 'react';
import { Button, Image, message } from 'antd';
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';
import { type ActionType } from '@ant-design/pro-components';
import { ProTable } from 'components';
import siteModel from './modes/menu.model';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import DetailForm from './components/detail';
import Styled from '@/components/Styled';
import dayjs from 'dayjs';
export default () => {
  const { server } = useBasicConfiguration();
  const actionRef = useRef<ActionType>();
  const { vehicle: V } = server;
  const initColumns = siteModel({ server });
  const [visible, setVisible] = useState(false);
  const [subForm, setSubForm] = useState<Record<string, any>>(
    {}
  );
  const detailModal = useRef();

  const trajectoryHandle = async (row: any) => {
    // const res = await V.getPointRecord({
    //   id,
    // });
    // if (!res.length) {
    //   message.warning(`暂无车辆轨迹`);
    // } else {
    //   setSubForm(res);
    //   detailModal.current?.openModal(true);
    // }
    const res = await V.getTrackDetail({
      carNo: row.carNo,
      // startTime: row.enterTime,
      startTime: +dayjs('2024-07-10 15:00:00'),
      endTime: +dayjs('2024-07-11 00:00:00'),
    });
    if (!res.length) {
      message.warning(`暂无车辆轨迹`);
    } else {
      // console.log('车辆轨迹数据', res);
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
            // render: (_, record) => {
            //   return (
            //     <>
            //       <Button
            //         type="link"
            //         onClick={() => {
            //           if (!record.attachment) {
            //             message.warning(`暂无抓拍图片`);
            //           } else {
            //             setVisible(true);
            //           }
            //         }}
            //       >
            //         预览
            //       </Button>
            //       <Image
            //         style={{ display: 'none' }}
            //         preview={{
            //           visible,
            //           src: record.attachment || '',
            //           onVisibleChange: (value) => {
            //             setVisible(value);
            //           },
            //         }}
            //       />
            //     </>
            //   );
            // },
            render: (text: any, record: any) => {
              // console.log('行数据', record)
              const list = record?.attachment?.split('@');
              // console.log('图片列表', list);
              if (list && list[0].length) {
                return (
                  <div>
                    <Image.PreviewGroup items={list}>
                      <Image
                        width={30}
                        height={30}
                        src={list[0]}
                      />
                    </Image.PreviewGroup>
                  </div>
                );
              } else {
                return <div className="color-red">暂无图片</div>;
              }
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
                      trajectoryHandle(record);
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
          <div
            className="cursor-pointer w-66px h-25px"
            onClick={() => {
              let id = (Math.random() * 1000000).toFixed(0);
              actionRef.current?.addEditRecord(
                {
                  id: id,
                  carNo: '苏B12346',
                  plateColor: '红色',
                  carType: '宝马',
                  enterTime: +dayjs(),
                  attachment:
                    'http://192.168.10.77:9000/construction/c84e52a268911d39596d97512baabdabf9864380796112835e59170758c1848b.png',
                },
                { position: 'top', newRecordType: 'dataSource' }
              );
              actionRef.current?.cancelEditable(id);
              // setIfAdd(true)
            }}
          ></div>,
          <Styled.ExportButton
            api="exportCarInOutRecord"
            fileName="车辆进出场"
          />,
        ]}
      ></ProTable>
      <DetailForm subForm={subForm} ref={detailModal} />
    </>
  );
};
