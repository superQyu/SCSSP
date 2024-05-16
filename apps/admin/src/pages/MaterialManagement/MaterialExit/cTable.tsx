import { useRef, useState } from 'react';

import { ProTable } from 'components';
import { type ActionType } from '@ant-design/pro-components';
import { Button, message, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import EditDialog from './components/editdialog';

export default (props: any, firstTableRef: any) => {
  const { record, server, onChange, cColumns } = props;

  // api 相关
  const { materialList } = server;

  // 点击保存
  const onSave = async (params: any) => {
    const res = await materialList.updateThird(params).then(async () => {
      message.success('信息更新成功！');
      await firstTableRef.current?.reload();
    });
    return res;
  };

  return (
    <ProTable
      // rowKey="second
      className="w-full"
      columns={cColumns}
      params={{ id: record.materialsExitDetailsWithInventoryRespVOS }}
      request={async (params = {}) => {
        // console.log('Table 查询参数', params)
        // const res = await materialList.getThirdList(params);
        // console.log('三级物料列表', res);
        return {
          // ...params,
          success: true,
          data: record.materialsExitDetailsWithInventoryRespVOS,
          // total: res.total,
        };
      }}
      headerTitle={false}
      search={false}
      options={false}
      editable={{ onSave }}
      pagination={false}
      toolBarRender={false}
    />
  );
};
