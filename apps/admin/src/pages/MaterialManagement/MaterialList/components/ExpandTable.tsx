import { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { ProTable } from 'components';
import { type ActionType } from '@ant-design/pro-components';
import { Button, message, Popconfirm } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

import ExpandTable from './ExpandTable';

// api 相关
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
// 表格相关
import siteModel from '../models/table.model';

export default () => {
  // api 相关
  // const { server } = useBasicConfiguration();
  // const { materialList } = server;

  // 初始化表格列
  // const { leftColumns } = siteModel({ server });
  // const actionRef = useRef<ActionType>();

  // 点击保存
  // const onSave = async (params: any) => {
  //   const res = await materialList.updateFirst(params).then(async () => {
  //     message.success('信息更新成功！');
  //     await actionRef.current?.reload();
  //   });
  //   return res;
  // };

  return (
    <>
      {/* <ProTable
        actionRef={actionRef}
        // headerTitle="证件列表"
        columns={leftColumns.firstColumns}
        request={async (params = {}) => {
          // console.log('Table 查询参数', params)
          const res = await materialList.getFirstList(params);
          // res.list = res.list.map((item: any) => {
          //   item.picture = item.picture?.split('@');
          //   return item;
          // });
          console.log('一级物料列表', res);
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
        search={false}
        toolBarRender={() => [
          <Button icon={<PlusOutlined />} onClick={() => setDialogVisible(true)} type="primary">
            新建
          </Button>,
        ]}
        editable={{ onSave }}
        expandable={{
          expandedRowRender: ExpandTable
        }}
        pagination={{
          pageSize: 10,
        }}
      ></ProTable> */}
      {/* <EditDialog
        type={type}
        detail={detail}
        openModal={dialogVisible}
        onStateChange={handleModalStateChange}
      /> */}
      <div>1111</div>
    </>
  );
};
