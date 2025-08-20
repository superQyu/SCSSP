import { useRef, useState } from 'react';
import { type ActionType } from '@ant-design/pro-components';
import { Button, message, Popconfirm } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

import { ProTable } from 'components';

import Styled from '@/components/Styled';
import SingleTitle from '@/components/SingleTitle';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import siteModel from './models/table.model';
import { ToString } from '@/utils/transform';
import DeviceStats from './DeviceStats';
export default () => {
  const { server } = useBasicConfiguration();
  const { subContractor } = server;

  const { alarmColums, columns: initColumns } = siteModel({
    server,
  });
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
    <div className="h-full p-18px flex flex-col">
      <DeviceStats />

      <div className="h-350px my-10px overflow-hidden">
        <ProTable
          actionRef={actionRef}
          headerTitle={<SingleTitle label="实时报警信息" />}
          columns={alarmColums}
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
          search={false}
          pagination={{}}
        ></ProTable>
      </div>
      <div className="flex-1">
        <ProTable
          actionRef={actionRef}
          headerTitle={<SingleTitle label="设备状态列表" />}
          columns={[...initColumns]}
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
          search={false}
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
      </div>
    </div>
  );
};
