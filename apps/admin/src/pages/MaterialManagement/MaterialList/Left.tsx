import { useRef, useState } from 'react';

import { ProTable } from 'components';
import { type ActionType } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

// api 相关
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
// 表格相关
import siteModel from './models/table.model';

const ThirdTable = (props: any) => {
  // console.log('当前行数据', record);

  const { record, server, firstTableRef, onChange } = props;

  // api 相关
  const { materialList } = server;

  // 初始化表格列
  const { leftColumns } = siteModel({ server });

  // 点击保存
  const onSave = async (params: any) => {
    const res = await materialList.updateSecond(params).then(async () => {
      message.success('信息更新成功！');
      await firstTableRef.current?.reload();
    });
    return res;
  };

  return (
    <ProTable
      // rowKey="second"
      className="w-full"
      showHeader={false}
      params={{ secondLevelCode: record.secondLevelCode }}
      request={async (params = {}) => {
        // console.log('Table 查询参数', params)
        const res = await materialList.getThirdList(params);
        // res.list = res.list.map((item: any) => {
        //   item.picture = item.picture?.split('@');
        //   return item;
        // });
        // console.log('三级物料列表', res);
        return {
          // ...params,
          success: true,
          data: res.list,
          total: res.total,
        };
      }}
      columns={leftColumns.thirdColumns}
      headerTitle={false}
      search={false}
      options={false}
      editable={{ onSave }}
      pagination={{
        pageSize: 5,
      }}
      toolBarRender={false}
      onRow={(record: any) => {
        return {
          onClick: () => {
            if (record.thirdLevelCode) {
              onChange(record.thirdLevelCode);
            }
          },
        };
      }}
    />
  );
};

const SecondTable = (props: any) => {
  // console.log('当前行数据', record);

  const { record, server, firstTableRef, onChange } = props;

  // api 相关
  const { materialList } = server;

  // 初始化表格列
  const { leftColumns } = siteModel({ server });

  // 点击保存
  const onSave = async (params: any) => {
    const res = await materialList.updateSecond(params).then(async () => {
      message.success('信息更新成功！');
      await firstTableRef.current?.reload();
    });
    return res;
  };

  return (
    <ProTable
      // rowKey="second"
      className="w-full"
      showHeader={false}
      params={{ firstLevelCode: record.firstLevelCode }}
      request={async (params = {}) => {
        // console.log('Table 查询参数', params)
        const res = await materialList.getSecondList(params);
        // res.list = res.list.map((item: any) => {
        //   item.picture = item.picture?.split('@');
        //   return item;
        // });
        // console.log('二级物料列表', res);
        return {
          // ...params,
          success: true,
          data: res.list,
          total: res.total,
        };
      }}
      columns={leftColumns.secondColumns}
      headerTitle={false}
      search={false}
      options={false}
      editable={{ onSave }}
      expandable={{
        expandedRowRender: (record: any) => ThirdTable({ record, server, firstTableRef, onChange }),
      }}
      pagination={{
        pageSize: 5,
      }}
      toolBarRender={false}
    />
  );
};

export default ({onChange}: any) => {
  // api 相关
  const { server } = useBasicConfiguration();
  const { materialList } = server;

  // 初始化表格列
  const { leftColumns } = siteModel({ server });

  // 表格的受控 DOM
  const firstTableRef = useRef<ActionType>();
  const secondTableRef = useRef<ActionType>();
  const thirdTableRef = useRef<ActionType>();

  // 控制弹窗的打开与关闭
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  // 控制详情弹窗的内容
  const [detail, setDetail] = useState({});
  // 控制传入子表格的行id
  const [expandId, setExpandId] = useState();

  // 修改表单打开关闭状态
  const handleModalStateChange = async (state: boolean) => {
    setDetail({});
    setDialogVisible(state);
    await firstTableRef.current?.reload();
  };

  // 点击保存
  const onSave = async (params: any) => {
    const res = await materialList.updateFirst(params).then(async () => {
      message.success('信息更新成功！');
      await firstTableRef.current?.reload();
    });
    return res;
  };

  return (
    <>
      <ProTable
        // rowKey="key"
        actionRef={firstTableRef}
        // headerTitle="证件列表"
        columns={leftColumns.firstColumns}
        request={async (params = {}) => {
          // console.log('Table 查询参数', params)
          const res = await materialList.getFirstList(params);
          // res.list = res.list.map((item: any) => {
          //   item.picture = item.picture?.split('@');
          //   return item;
          // });
          // console.log('一级物料列表', res);
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
          expandedRowRender: (record: any) => SecondTable({ record, server, firstTableRef, onChange }),
        }}
        pagination={{
          pageSize: 10,
        }}
      ></ProTable>
      {/* <EditDialog
        type={type}
        detail={detail}
        openModal={dialogVisible}
        onStateChange={handleModalStateChange}
      /> */}
    </>
  );
};
