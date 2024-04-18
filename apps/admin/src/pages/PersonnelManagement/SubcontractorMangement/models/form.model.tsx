import React from 'react';

import { FormColumnsTypes } from 'components';
import { Select, Radio, DatePicker, Input } from 'antd';

export default (subFormRef: any) => {
  const getNameSpell = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    console.log('input改变', inputValue);
    subFormRef.current.setFieldsValue({nameSpell: inputValue})
  };

  // 分包商信息
  const subColumns: FormColumnsTypes[] = [
    {
      label: '分包商名称',
      dataIndex: 'realName',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请输入分包商名称' }],
      },
    },
    {
      label: '分包商简称',
      dataIndex: 'shortName',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请输入分包商简称' }],
      },
      formItem: <Input placeholder="请输入分包商简称" onBlur={getNameSpell} />,
    },
    {
      label: '分包商类型',
      dataIndex: 'subcontractorType',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请选择分包商类型' }],
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
      label: '所属省',
      dataIndex: 'province',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请输入省' }],
      },
    },
    {
      label: '所属市',
      dataIndex: 'city',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请输入市' }],
      },
    },
    {
      label: '所属区',
      dataIndex: 'district',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请输入区' }],
      },
    },
    {
      label: '参建单位类型',
      dataIndex: 'corpType',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请选择参建单位类型' }],
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
      label: '等级',
      dataIndex: 'overallMerit',
      colNum: 12,
    },
    {
      label: '是否生效',
      dataIndex: 'isConformity',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请选择是否生效' }],
      },
      formItem: (
        <Radio.Group>
          <Radio value={1}>是</Radio>
          <Radio value={0}>否</Radio>
        </Radio.Group>
      ),
    },
    {
      label: '单位地址',
      dataIndex: 'unitAddress',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请输入单位地址' }],
      },
    },
    {
      label: '法人',
      dataIndex: 'legalRepresentative',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请输入法人姓名' }],
      },
    },
    {
      label: '法人联系电话',
      dataIndex: 'legalRepresentativePhone',
      colNum: 12,
    },
    {
      label: '注册资金(万元)',
      dataIndex: 'registeredCapital',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请输入注册资金(万元)' }],
      },
    },
    {
      label: '注册时间',
      dataIndex: 'regDate',
      colNum: 12,
      formItem: <DatePicker />,
    },
    {
      label: '联系人',
      dataIndex: 'principal',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请输入联系人姓名' }],
      },
    },
    {
      label: '联系电话',
      dataIndex: 'principalTel',
      colNum: 12,
    },
    {
      label: '联系人身份证号',
      dataIndex: 'idCard',
      colNum: 12,
    },
    {
      label: '资质',
      dataIndex: 'quality',
      colNum: 12,
    },
    {
      label: '公司简称首拼',
      dataIndex: 'nameSpell',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请输入公司简称首拼' }],
      },
      formItem: <Input placeholder="请输入分包商简称" onBlur={getNameSpell} disabled />,
    },
    {
      label: '社会信用代码',
      dataIndex: 'corpCode',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请输入社会信用代码' }],
      },
    },
  ];

  // 注册地信息
  const addressColumns: FormColumnsTypes[] = [
    {
      label: '住建部投诉电话',
      dataIndex: 'buildComplaintCall',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请输入住建部投诉电话' }],
      },
    },
    {
      label: '人社部投诉电话',
      dataIndex: 'societyComplaintCall',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请输入人社部投诉电话' }],
      },
    },
    {
      label: '公司项目经验',
      dataIndex: 'companyScore',
      colNum: 12,
      formItem: (
        <Radio.Group>
          <Radio value={1}>是</Radio>
          <Radio value={0}>否</Radio>
        </Radio.Group>
      ),
    },
    {
      label: '公司简介',
      dataIndex: 'companySummary',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请输入公司简介' }],
      },
    },
  ];

  return { subColumns, addressColumns };
};
