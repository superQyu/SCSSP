import React from 'react';

import { FormColumnsTypes } from 'components';
import { Select, Radio, DatePicker, Input } from 'antd';

export default (subFormRef: any) => {
  const getNameSpell = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    console.log('input改变', inputValue);
    subFormRef.current.setFieldsValue({ nameSpell: inputValue });
  };

  // 分包商信息
  const formColumns: FormColumnsTypes[] = [
    {
      label: '班组长',
      dataIndex: 'userId',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请输入班组长' }],
      },
    },
    {
      label: '劳务工种',
      dataIndex: 'workTypeId',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请选择劳务工种' }],
      },
      formItem: (
        <Select
          options={[
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
          ]}
        />
      ),
    },
    {
      label: '班组名称',
      dataIndex: 'teamName',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请输入班组名称' }],
      },
    },
    {
      label: '分包单位',
      dataIndex: 'subcontractorId',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请选择分包单位' }],
      },
      formItem: (
        <Select
          options={[
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
          ]}
        />
      ),
    },
    {
      label: '身份证号',
      dataIndex: 'identityCard',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请输入身份证号' }],
      },
    },
    {
      label: '联系方式',
      dataIndex: 'phone',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请输入联系方式' }],
      },
    },
    {
      label: '进场日期',
      dataIndex: 'entryDate',
      colNum: 12,
      formItem: <DatePicker />,
    },
    {
      label: '退场日期',
      dataIndex: 'exitDate',
      colNum: 12,
      formItem: <DatePicker />,
    },
    {
      label: '进场附件',
      dataIndex: 'entryAttachments',
      colNum: 12,
      formItem: <DatePicker />,
    },
    {
      label: '退场附件',
      dataIndex: 'exitAttachments',
      colNum: 12,
      formItem: <DatePicker />,
    }
  ];
  return formColumns;
};
