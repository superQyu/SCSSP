import { createElement, useRef, useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { type ActionType } from '@ant-design/pro-components';
import { ProTable, ProForm } from 'components';
import { TOKEN, buildTree, sortMenu } from 'utils';

// import AddSite from './components/sites/structural';

// 站点表格模型
import type { ModesApi } from './modes/model';
import siteModel from './modes/menu.model';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

export default () => {
  const { server } = useBasicConfiguration();
  const actionRef = useRef<ActionType>();

  //   const [subForm, _] = useState<Record<string, any>>({});
  //   const [formModal, setFormModal] = useState<boolean>(false);

  //  api server
  const { user: U } = server;

  const iinitColumns = siteModel({ apis: server });

  //   const handleModalStateChange = (state: boolean) => setFormModal(state);
  //   const handleCancel = (state: boolean) => setFormModal(state);

  return (
    <>
      <ProTable
        headerTitle="路由列表"
        request={async (params = {}) => {
          const list = await U.getRoute({ siteKey: TOKEN.replace(/^Qy_/, '') });
          const menus = buildTree(list, {
            delEmptyRoutes: true,
            intercept: (item: { [key: string]: string }) => ({ ...item, children: item.routes }),
          });
          return {
            ...params,
            data: sortMenu(menus),
            total: list.length,
          } as unknown as ModesApi.pageItemType;
        }}
        columns={iinitColumns}
        onSubmit={async (params: {}) => {
          console.log(params);
        }}
        actionRef={actionRef}
        pagination={false}
        toolBarRender={() => [
          //   <ProForm />,
          <Button
            key="button"
            icon={createElement(PlusOutlined)}
            onClick={() => {
              // setFormModal(true)
            }}
            type="primary"
          >
            新建
          </Button>,
        ]}
        form={{
          syncToUrl: (values: any, type: any) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          onChange(_: any) {},
        }}
        search={{
          labelWidth: 'auto',
        }}
      ></ProTable>
      {/* <AddSite subForm={subForm} openModal={formModal} onStateChange={handleModalStateChange} /> */}
    </>
  );
};
