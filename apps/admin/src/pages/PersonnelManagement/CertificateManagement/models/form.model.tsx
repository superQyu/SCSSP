import React, { useState, useEffect } from 'react';

import { FormColumnsTypes } from 'components';
import { Select, Radio, DatePicker, Input, InputNumber } from 'antd';

import DictSelect from '@/components/DictSelect';

// api 相关
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

export default (subFormRef: any) => {
  // api 相关
  const { server } = useBasicConfiguration();
  const { file } = server;

  // 表单交互相关
  // 选择人员后，带出人员相关信息
  const getPersonInfo = (value: string) => {
    console.log('选择项改变', value);

    // subFormRef.current.setFieldsValue({ nameSpell: value });
  };

  const [personInfoList, setPersonInfoList] = useState([]);

  useEffect(() => {
    getPersonSelect();
  }, []);

  // 通过接口获取隶属人员下拉框的内容
  const getPersonSelect = async () => {
    const res = await file.getPersonInfoList;
    console.log('人员列表', res.list);
    // const list = res.list.map((item: any) => {
    //   label: item.label;
    // });
  };

  // 基本信息
  const subColumns: FormColumnsTypes[] = [
    {
      label: '隶属人员',
      dataIndex: 'personId',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请选择隶属人员' }],
      },
      formItem: <Select placeholder="请选择隶属人员" options={personInfoList} onChange={getPersonInfo}/>,
    },
    {
      // 通过 personnelInfoRespVO 获取
      label: '分包单位',
      dataIndex: 'companyName',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请选择隶属人员' }],
      },
      formItem: <Select placeholder="请选择隶属人员" disabled />,
    },
    {
      // 建筑工人 || 管理人员(字典查询)
      label: '人员类型',
      dataIndex: 'workerType',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请选择隶属人员' }],
      },
      formItem: <Select placeholder="请选择隶属人员" disabled />,
    },
    {
      // 字典查询
      label: '岗位/职位',
      dataIndex: 'jobCategory',
      colNum: 12,
      formItem: <Select placeholder="请选择隶属人员" disabled />,
    },
  ];

  // 证件信息
  const addressColumns: FormColumnsTypes[] = [
    {
      label: '证书名称',
      dataIndex: 'credentialName',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请输入证书名称' }],
      },
    },
    {
      label: '证书编号',
      dataIndex: 'credentialNumber',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请选择证书编号' }],
      },
    },
    {
      label: '证书种类',
      dataIndex: 'certificateType',
      colNum: 12,
    },
    {
      label: '证书类型',
      dataIndex: 'certificateCategory',
      colNum: 12,
    },
    {
      label: '证书等级',
      dataIndex: 'certificateLevel',
      colNum: 12,
    },
    {
      label: '岗位名称',
      dataIndex: 'positionTitle',
      colNum: 12,
    },
    {
      label: '第一次发证日期',
      dataIndex: 'firstIssuedDate',
      colNum: 12,
      formItem: <DatePicker />,
    },
    {
      label: '有效期起',
      dataIndex: 'validityStartDate',
      colNum: 12,
      formItem: <DatePicker />,
    },
    {
      label: '有效期止',
      dataIndex: 'validityEndDate',
      colNum: 12,
      formItem: <DatePicker />,
    },
    {
      label: '发证机关',
      dataIndex: 'issuingAuthority',
      colNum: 12,
    },
    {
      label: '复核日期',
      dataIndex: 'reviewDate',
      colNum: 12,
      formItem: <DatePicker />,
    },
    {
      // 只有请求特殊工种证件时，出现该字段
      label: '特攻证网络核验日期',
      dataIndex: 'certificateDateSpecialWork',
      colNum: 12,
      formItem: <DatePicker />,
    },
    {
      label: '备注',
      dataIndex: 'remark',
      colNum: 12,
    },
    {
      label: '图片上传',
      dataIndex: 'picture',
      colNum: 12,
      // formItem: <ImageUpload />,
    },
  ];

  return { subColumns, addressColumns };
};
