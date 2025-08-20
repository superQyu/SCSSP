import { useRef, useState } from 'react';
import { type ActionType } from '@ant-design/pro-components';
import { Button, message, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { ProTable } from 'components';
import SingleTitle from '@/components/SingleTitle';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import siteModel from './models/table.model';
import { ToString } from '@/utils/transform';

export default () => {
  const { server } = useBasicConfiguration();
  const { subContractor } = server;
  const initColumns = siteModel({ server });
  const actionRef = useRef<ActionType>();

  const [ifAllOpen, setIfAllOpen] = useState(true);
  const [loading, setLoading] = useState(true);
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

  const handleAllClick = () => {
    setLoading(true);
    setTimeout(() => {
      message.success('操作成功!');
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="h-full p-18px">
      {/* <Spin spinning={loading}> */}
        <ProTable
          actionRef={actionRef}
          headerTitle={<SingleTitle label="闸机列表" />}
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
            setLoading(false);
            return {
              data: res.list,
              total: res.total,
            };
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
          toolBarRender={() => [
            <Button
              onClick={() => handleAllClick()}
              type="primary"
            >
              一键{ifAllOpen ? '常闭' : '常开'}
            </Button>,
          ]}
          pagination={{
            pageSize: 10,
          }}
        ></ProTable>
      {/* </Spin> */}
    </div>
  );
};
