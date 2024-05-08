import { useEffect, useRef, useState } from 'react';
import { RadarChartOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { Button, Tag, Modal, message, Input, Alert, Typography } from 'antd';

import { JsonEditor } from 'ui';
import { ProTable, AdForm, FormColumnsTypes } from 'components';
import type { FormInstance } from 'antd/es/form';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import ApiListSummary from '@/apis';

interface Unlimit {
  [key: string]: any;
}
export type Status = {
  color: string;
  text: string;
};

export type TableListItem = {
  name: string;
  path: string;
  function: string;
  lists: Unlimit[];
};
const tableListDataSource: TableListItem[] = Object.entries(ApiListSummary).map(([name, v]) => {
  let _lists = v;
  if (!Array.isArray(v)) {
    _lists = Object.entries(_lists).map(([_, list]) => list);
  }

  return {
    name,
    path: `@/apis/${name}.api.ts`,
    function: `await ${name}[key]()|${name}[key]().then().catch()`,
    lists: _lists,
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
    title: '路径',
    hideInSearch: true,
    dataIndex: 'path',
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

const CusTagColor = (type: string) => {
  const colors = [
    {
      type: ['POST'],
      color: '#49cc90',
    },
    {
      type: ['PUT', 'PATCH'],
      color: '#fca130',
    },
    {
      type: ['GET', 'HEAD'],
      color: '#61affe',
    },
    {
      type: ['DELETE'],
      color: '#f93e3e',
    },
  ];
  return colors.filter((item) => item.type.indexOf(type) != -1)[0].color || '';
};

const expandedRowRender = ({ lists = [], name }: Unlimit, setSubForm: any, setOpen: any) => {
  return (
    <div style={{ marginBlockEnd: '20px', width: 'calc(100% - 40px)' }}>
      <ProTable
        request={() => {
          return Promise.resolve({
            data: lists,
            success: true,
          });
        }}
        columns={[
          { title: '主函数名称', dataIndex: 'key', key: 'key' },
          {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            render: (_: any, record: Unlimit) => (
              <Tag color={CusTagColor(record.type.toUpperCase())}>{record.type}</Tag>
            ),
          },
          { title: '接口地址', dataIndex: 'url', key: 'url' },
          { title: '描述', dataIndex: 'description', key: 'description' },
          {
            title: '操作',
            width: 140,
            valueType: 'option',
            key: 'option',
            render: (_text: any, record: any) => [
              <a
                key="editable"
                onClick={() => {
                  setSubForm({ ...record, parentName: name });
                  setOpen(true);
                }}
              >
                {/* @ts-ignore */}
                {<RadarChartOutlined style={{ marginInlineEnd: '5px' }} />}
                测试
              </a>,
            ],
          },
        ]}
        rowKey={'key'}
        headerTitle={false}
        search={false}
        options={false}
        pagination={false}
        toolBarRender={false}
      />
    </div>
  );
};

const GetDefaultParams = (params: Unlimit[]) => {
  return params.reduce((acc, cur: Unlimit) => {
    const flag = Object.hasOwnProperty.call(cur, 'location');
    if (!flag || cur.location === 'query') {
      return { ...acc, [cur.key]: '' };
    }
    return acc;
  }, {});
};

export default () => {
  const { server } = useBasicConfiguration();
  const formRef = useRef<FormInstance>(null);

  const [title] = useState<string>('接口测试');

  const [subForm, setSubForm] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const [testParams, setTestParams] = useState<Unlimit>({});
  const [testResult, setTestResult] = useState<Unlimit>({});

  const [columnsForm, setColumnsForm] = useState<FormColumnsTypes[]>([]);

  const onReset = () => {
    if (loading) {
      message.warning(`数据提交中,请稍等...`);
      return;
    }
    formRef.current?.resetFields();
    setTestResult({});
  };
  const handleOk = async () => {
    try {
      const { parentName, key } = subForm;
      setLoading(true);
      server[parentName][key](JSON.parse(JSON.stringify({ ...testParams })))
        .then((res: any) => {
          message.success('操作成功！');
          setLoading(false);
          setTestResult(res);
        })
        .catch((err: any) => {
          setTestResult({ msg: err.message });
          setLoading(false);
        });
    } catch (errorInfo) {}
  };
  const handleCancel = () => {
    if (loading) {
      message.warning(`数据提交中,请稍等...`);
      return;
    }
    setOpen(false);
    onReset();
  };
  const onFormChange = (_: Unlimit) => {};

  useEffect(() => {
    if (Object.entries(subForm).length) {
      const ncloumns = [
        {
          label: '接口地址',
          dataIndex: 'url',
          formItem: (
            <Input
              disabled
              addonBefore={
                <Tag color={CusTagColor(subForm.type.toUpperCase())}>{subForm.type}</Tag>
              }
            />
          ),
        },
        {
          label: '参数',
          dataIndex: 'params',
          columns: 12,
          formItem: (
            <JsonEditor
              onChange={(params: any) => setTestParams(params)}
              defaultParams={GetDefaultParams(subForm.params || [])}
            />
          ),
        },
        {
          label: '结果',
          dataIndex: `result-${new Date().getTime()}`,
          columns: 12,
          formItem: <JsonEditor disabled defaultParams={testResult} />,
        },
      ];
      setColumnsForm(ncloumns);
    }
  }, [subForm]);

  useEffect(() => {
    const ncloumns = [...columnsForm];
    ncloumns[2] = {
      label: '结果',
      dataIndex: `result-${new Date().getTime()}`,
      columns: 12,
      formItem: <JsonEditor disabled defaultParams={testResult} />,
    };
    setColumnsForm(ncloumns);
  }, [testResult]);

  return (
    <>
      <Alert
        message={'Api 接口列表汇总'}
        type="success"
        style={{ marginBlockEnd: '25px' }}
        showIcon
      />
      <div style={{ height: 'calc(100% - 65px)' }}>
        <ProTable
          columns={columns}
          request={({ name }: Unlimit) => {
            let tableList = tableListDataSource;
            if (name && name != '') {
              let k = name.toLocaleLowerCase() as string;
              tableList = tableListDataSource.filter(({ lists }) => {
                const isExsit = lists.filter(({ description = '', key: itemk, url: u }) => {
                  return (
                    description.indexOf(k) != -1 ||
                    itemk.toLocaleLowerCase().indexOf(k) != -1 ||
                    u.toLocaleLowerCase().indexOf(k) != -1
                  );
                });
                return isExsit.length;
              });
            }
            return Promise.resolve({
              data: tableList,
              success: true,
            });
          }}
          rowKey="name"
          expandable={{
            expandedRowRender: (record: any) => expandedRowRender(record, setSubForm, setOpen),
          }}
          dateFormatter="string"
          headerTitle={false}
          options={false}
          search={true}
          pagination={false}
          scroll={{ y: 'auto' }}
          columnsState={{
            persistenceKey: 'pro-table-api-list',
            persistenceType: 'localStorage',
            onChange(_: any) {},
          }}
          toolBarRender={false}
        />
      </div>

      <Modal
        open={open}
        title={title}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        footer={[
          <Button key="back" onClick={handleCancel} disabled={loading}>
            取消
          </Button>,
          <Button key="reset" htmlType="reset" onClick={onReset} disabled={loading}>
            重置
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            提交
          </Button>,
        ]}
        width={'50%'}
      >
        <AdForm
          key={`${JSON.stringify(subForm)}`}
          loadingTitle="提交中..."
          formRef={formRef}
          initialValues={{ ...subForm }}
          loading={loading}
          labelAlign="left"
          layout="vertical"
          onFormChange={onFormChange}
          columns={columnsForm}
          layoutStyle={{
            labelCol: { span: 24 },
            wrapperCol: { span: 24, flex: 1 },
          }}
        />
      </Modal>
    </>
  );
};
