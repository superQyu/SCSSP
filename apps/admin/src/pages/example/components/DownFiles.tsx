import type { ProColumns } from '@ant-design/pro-components';
import { Alert, Typography } from 'antd';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import { ProTable } from 'components';

import { downFiles } from 'utils';

interface Unlimit {
  [key: string]: any;
}
export type Status = {
  color: string;
  text: string;
};

export type TableListItem = {
  name: string;
  function: string;
};

const tableListDataSource: TableListItem[] = Object.entries(downFiles).map(([name, v]) => {
  return {
    name,
    function: `downFiles.${name}(data:文件流, fileName：文件名称)`,
  };
});

const columns: ProColumns<TableListItem>[] = [
  {
    title: '名称',
    width: 120,
    dataIndex: 'name',
    render: (_) => <a>{_}</a>,
  },
  {
    title: '调用方法',
    hideInSearch: true,
    dataIndex: 'function',
    render: (_) => (
      <Typography.Text style={{ whiteSpace: 'pre-wrap' }} type="success" code>
        {`${_}`}
      </Typography.Text>
    ),
  },
];

export default () => {
  const { server, config: C } = useBasicConfiguration();

  return (
    <>
      <Alert
        onClick={() => {
          server.basic.exportCarDispatchRecord().then((data) => {
            downFiles.excel(data, '模板文件');
          });
        }}
        message={'文件下载'}
        type="success"
        style={{ marginBlockEnd: '25px' }}
        showIcon
      />
      <Typography.Paragraph style={{ whiteSpace: 'pre-wrap' }} code={true} strong={true}>
        <Typography.Text type="success" code>
          {`import { downFiles } from 'utils';`}
        </Typography.Text>
      </Typography.Paragraph>

      <div style={{ height: 'calc(100% - 65px)' }}>
        <ProTable
          columns={columns}
          request={({}: Unlimit) => {
            let tableList = tableListDataSource;
            return Promise.resolve({
              data: tableList,
              success: true,
            });
          }}
          rowKey="name"
          dateFormatter="string"
          headerTitle={false}
          options={false}
          search={false}
          pagination={false}
          scroll={{ y: 'auto' }}
          columnsState={{
            persistenceKey: 'pro-table-downFiles-list',
            persistenceType: 'localStorage',
            onChange(_: any) {},
          }}
          toolBarRender={false}
        />
      </div>
    </>
  );
};
