import React, { useState, useRef } from 'react';
import { Button, message, Modal, DatePicker } from 'antd';
import type {
  DescriptionsProps,
  RadioChangeEvent,
  DatePickerProps,
  GetProps,
} from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import type {
  EditableFormInstance,
  ProColumns,
  ProFormInstance,
} from '@ant-design/pro-components';
import {
  EditableProTable,
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormField,
  ProFormSegmented,
  ProFormSwitch,
} from '@ant-design/pro-components';
import dayjs from 'dayjs';
import { ProTable } from 'components';
import SingleTitle from '@/components/SingleTitle';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

import { ToString } from '@/utils/transform';
const { RangePicker } = DatePicker;
export default () => {
  const { server } = useBasicConfiguration();
  const { subContractor } = server;
  const actionRef = useRef<ActionType>();
  const [loading, setLoading] = useState(true);

  const formRef = useRef<ProFormInstance<any>>();
  const editorFormRef =
    useRef<EditableFormInstance<DataSourceType>>();
  const columns: ProColumns<DataSourceType>[] = [
    {
      hideInTable: true,
      title: '日期',
      dataIndex: 'date',
      valueType: 'date',
      fieldProps: {
        showTime: true,
        placeholder: '请选择日期',
        dateFormat: 'YYYY-MM-DD',
        format: 'YYYY-MM-DD',
      },
      render: (_, record) => (
        <>
          {dayjs(record.clockTime).format('YYYY-MM-DD HH:mm:ss')}
        </>
      ),
    },
    {
      hideInSearch: true,
      title: '时间划线',
      dataIndex: 'clockTime',
      valueType: 'date',
      fieldProps: {
        showTime: true,
        placeholder: '请选择时间划线',
        dateFormat: 'YYYY-MM-DD HH:mm:ss',
        format: 'YYYY-MM-DD HH:mm:ss',
      },
      render: (_, record) => (
        <>
          {dayjs(record.clockTime).format('YYYY-MM-DD HH:mm:ss')}
        </>
      ),
    },

    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id, record);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            const tableDataSource =
              formRef.current?.getFieldValue(
                'table'
              ) as DataSourceType[];
            formRef.current?.setFieldsValue({
              table: tableDataSource.filter(
                (item) => item.id !== record.id
              ),
            });
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onOk = (
    value: DatePickerProps['value'] | RangePickerProps['value']
  ) => {
    console.log('onOk: ', value);
  };

  return (
    <div className="h-full p-18px">
      {/* <Spin spinning={loading}> */}
      <ProTable
        actionRef={actionRef}
        headerTitle={<SingleTitle label="考勤分割时间线列表" />}
        columns={columns}
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
        pagination={{}}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setIsModalOpen(true)}
          >
            新建
          </Button>,
        ]}
      ></ProTable>
      {/* </Spin> */}

      <Modal
        title="选择时间划线"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <DatePicker
          showTime
          onChange={(value, dateString) => {
            console.log('Selected Time: ', value);
            console.log('Formatted Selected Time: ', dateString);
          }}
          onOk={onOk}
        />
      </Modal>
    </div>
  );
};
