import React from 'react';
import { useState, useEffect } from 'react';

import { FormColumnsTypes, ProUpload } from 'components';
import {
  Select,
  Radio,
  DatePicker,
  Input,
  InputNumber,
} from 'antd';
import type { UploadFile } from 'antd';

import DictSelect from '@/components/DictSelect';
// api 相关
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

export default (subFormRef: any, picture: string[]) => {
  const getNameSpell = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value: inputValue } = e.target;
    // console.log('input改变', inputValue);
    subFormRef.current.setFieldsValue({ nameSpell: inputValue });
  };

  // api 相关
  const { server } = useBasicConfiguration();
  const { file } = server;

  // 用来初始化图片列表的初始值
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    const list = picture
      .filter((item) => item.trim())
      .map((item: string, index: number) => {
        return {
          uid: `${index}`,
          name: item?.split('/')?.slice(-1)[0],
          url: item,
        };
      });
    // console.log('当前list', list);
    setFileList(list);
  }, [picture]);

  // 单位信息
  const subColumns: FormColumnsTypes[] = [
    {
      label: '单位名称',
      dataIndex: 'realName',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请输入单位名称' }],
      },
    },
    // {
    //   label: '单位简称',
    //   dataIndex: 'shortName',
    //   colNum: 12,
    //   formItemProps: {
    //     rules: [{ required: true, message: '请输入单位简称' }],
    //   },
    //   formItem: <Input placeholder="请输入单位简称" onBlur={getNameSpell} />,
    // },
    {
      label: '单位类型',
      dataIndex: 'subcontractorType',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请选择单位类型' }],
      },
      formItem: <DictSelect dictKey={'subcontractor_type'} />,
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
    // {
    //   label: '所属区',
    //   dataIndex: 'district',
    //   colNum: 12,
    //   formItemProps: {
    //     rules: [{ required: true, message: '请输入区' }],
    //   },
    // },
    {
      label: '参建单位类型',
      dataIndex: 'corpType',
      colNum: 12,
      formItemProps: {
        rules: [
          { required: true, message: '请选择参建单位类型' },
        ],
      },
      formItem: <DictSelect dictKey={'corp_type'} />,
    },
    // {
    //   label: '等级',
    //   dataIndex: 'overallMerit',
    //   colNum: 12,
    //   formItem: <DictSelect dictKey={'overall_merit'} />,
    // },
    // {
    //   label: '是否生效',
    //   dataIndex: 'isConformity',
    //   colNum: 12,
    //   formItemProps: {
    //     rules: [{ required: true, message: '请选择是否生效' }],
    //   },
    //   formItem: <DictSelect dictKey={'is_conformity'} />,
    // },
    // {
    //   label: '单位地址',
    //   dataIndex: 'unitAddress',
    //   colNum: 12,
    //   formItemProps: {
    //     rules: [{ required: true, message: '请输入单位地址' }],
    //   },
    // },
    // {
    //   label: '法人',
    //   dataIndex: 'legalRepresentative',
    //   colNum: 12,
    //   formItemProps: {
    //     rules: [{ required: true, message: '请输入法人姓名' }],
    //   },
    // },
    // {
    //   label: '法人联系电话',
    //   dataIndex: 'legalRepresentativePhone',
    //   colNum: 12,
    // },
    // {
    //   label: '注册资金(万元)',
    //   dataIndex: 'registeredCapital',
    //   colNum: 12,
    //   formItemProps: {
    //     rules: [{ required: true, message: '请输入注册资金(万元)' }],
    //   },
    // },
    // {
    //   label: '注册时间',
    //   dataIndex: 'regDate',
    //   colNum: 12,
    //   formItem: <DatePicker />,
    // },
    {
      label: '社会信用代码',
      dataIndex: 'corpCode',
      colNum: 12,
      formItemProps: {
        rules: [
          { required: true, message: '请输入社会信用代码' },
          { max: 20, message: '社会信用代码不正确' },
        ],
      },
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
    // {
    //   label: '联系人身份证号',
    //   dataIndex: 'idCard',
    //   colNum: 12,
    // },
    // {
    //   label: '资质',
    //   dataIndex: 'quality',
    //   colNum: 12,
    // },
    // {
    //   label: '公司简称首拼',
    //   dataIndex: 'nameSpell',
    //   colNum: 12,
    //   formItemProps: {
    //     rules: [{ required: true, message: '请输入公司简称首拼' }],
    //   },
    //   formItem: <Input placeholder="请输入单位简称" onBlur={getNameSpell} disabled />,
    // },
    {
      label: '保险单',
      dataIndex: 'url',
      colNum: 12,
      formItem: (
        <ProUpload
          key={fileList.length}
          onRequest={async (params: any) =>
            await file.fileUpload(params)
          }
          onListChange={(res: any) => {
            const list = res.map((item: any) => item.url);
            subFormRef.current.setFieldsValue({
              // 证件图片
              url: list,
            });
          }}
          defaultFileList={() => fileList}
        />
      ),
    },
  ];

  // 注册地信息
  const addressColumns: FormColumnsTypes[] = [
    {
      label: '住建部投诉电话',
      dataIndex: 'buildComplaintCall',
      colNum: 12,
    },
    {
      label: '人社部投诉电话',
      dataIndex: 'societyComplaintCall',
      colNum: 12,
    },
    {
      label: '公司项目经验',
      dataIndex: 'companyScore',
      colNum: 12,
    },
    {
      label: '公司简介',
      dataIndex: 'companySummary',
      colNum: 12,
    },
  ];

  return { subColumns, addressColumns };
};
