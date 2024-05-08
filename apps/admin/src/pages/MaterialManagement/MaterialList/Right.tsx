import { useRef, useState } from 'react';

import { ProTable } from 'components';
import { type ActionType } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

// api 相关
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
// 表格相关
import siteModel from './models/table.model';

export default ({ code }: any) => {
  console.log('当前第三类别码', code);

  // api 相关
  const { server } = useBasicConfiguration();
  const { materialList } = server;

  // 初始化表格列
  const { rightColumns } = siteModel({ server });
  const actionRef = useRef<ActionType>();

  // 点击保存
  const onSave = async (params: any) => {
    const res = await materialList.updateMaterial(params).then(async () => {
      message.success('信息更新成功！');
      await actionRef.current?.reload();
    });
    return res;
  };

  return (
    <ProTable
      // rowKey="second"
      className="w-full"
      params={{ thirdLevelCode: code }}
      request={async (params = { thirdLevelCode: undefined }) => {
        // console.log('Table 查询参数', params)
        if (params.thirdLevelCode) {
          const res = await materialList.getMaterialList(params);
          return {
            // ...params,
            success: true,
            data: res.list,
            total: res.total,
          };
        } else {
          return {
            success: true,
            data: [],
          };
        }
        // res.list = res.list.map((item: any) => {
        //   item.picture = item.picture?.split('@');
        //   return item;
        // });
        // console.log('三级物料列表', res);
      }}
      columns={rightColumns}
      headerTitle={false}
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
      options={false}
      editable={{ onSave }}
      pagination={{
        pageSize: 10,
      }}
      toolBarRender={false}
    />
  );
};
