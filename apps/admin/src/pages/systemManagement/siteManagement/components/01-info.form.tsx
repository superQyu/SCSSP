import React, { useRef, forwardRef, useImperativeHandle, useState } from 'react';
import { DatePicker, Col, Row, Flex } from 'antd';
import type { UploadFile } from 'antd';
import DictSelect from '@/components/DictSelect';
import type { FormInstance } from 'antd/es/form';
import dayjs from 'dayjs';

import { AdForm, ProUpload, FormColumnsTypes } from 'components';
import SingleTitle from '@/components/SingleTitle';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

interface Props {
  /** 表单初始化 */
  subForm: Record<string, any>;
}

const InfoCom: React.FC<Props> = forwardRef(({ subForm }: Props, ref) => {
  const { server } = useBasicConfiguration();
  const { file: F } = server;

  const formRef = useRef<FormInstance>(null);
  const [formKey, _] = useState<string>('personnelInfoSaveReqVO');
  const [defaultUrl, setDefaultUrl] = useState<(UploadFile & { url?: string })[]>([]);

  const columns: FormColumnsTypes[] = [
    {
      label: '姓名',
      dataIndex: 'name',
      formItemProps: {
        rules: [{ required: true, message: '请输入姓名' }],
      },
      colNum: 8,
    },
    {
      label: '性别',
      dataIndex: 'gender',
      formItem: <DictSelect dictKey={'system_user_sex'} />,
      formItemProps: {
        rules: [{ required: true, message: '请选择性别' }],
      },
      colNum: 8,
    },
    {
      label: '联系电话',
      dataIndex: 'phone',
      formItemProps: {
        rules: [
          { required: true, message: '请输入联系电话' },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: '请输入正确的联系电话',
          },
        ],
      },
      colNum: 8,
    },
    {
      label: '电子邮件',
      dataIndex: 'email',
      formItemProps: {
        rules: [
          {
            type: 'email',
            message: '请输入正确的电子邮件',
          },
        ],
      },
      colNum: 8,
    },
    {
      label: '出生日期',
      dataIndex: 'birthday',
      formItem: <DatePicker className="w-full" format="YYYY-MM-DD" />,
      formItemProps: {
        getValueFromEvent: (...[, dateString]) => dateString,
        getValueProps: (value) => ({
          value: value ? dayjs(value) : undefined,
        }),
      },
      colNum: 8,
    },
    {
      label: '年龄',
      dataIndex: 'age',
      formItemProps: {
        rules: [
          {
            pattern: /^[1-9][0-9]$/,
            message: '请输入正确的年龄',
          },
        ],
      },
      colNum: 8,
    },
    {
      label: '联系人',
      dataIndex: 'contact',
      colNum: 8,
    },
    {
      label: '文化程度',
      dataIndex: 'educational',
      formItem: <DictSelect dictKey={'pm_educational'} />,
      colNum: 8,
    },
    {
      label: '政治面貌',
      dataIndex: 'policitalStatus',
      colNum: 8,
    },
    {
      label: '户口所在地',
      dataIndex: 'registeredPlace',
      colNum: 8,
    },
    {
      label: '民族',
      dataIndex: 'nationality',
      formItem: <DictSelect dictKey={'pm_nationality'} />,
      colNum: 8,
    },
    {
      label: '身份证号',
      dataIndex: 'identityCard',
      formItemProps: {
        rules: [
          { required: true, message: '请输入身份证号' },
          {
            pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
            message: '请输入正确的身份证号',
          },
        ],
      },
      colNum: 8,
    },
    {
      label: '身份证到期时间',
      dataIndex: 'expiressEnd',
      formItem: <DatePicker className="w-full" format="YYYY-MM-DD" />,
      formItemProps: {
        getValueFromEvent: (...[, dateString]) => dateString,
        getValueProps: (value) => ({
          value: value ? dayjs(value) : undefined,
        }),
      },
      colNum: 8,
    },
    {
      label: '职称',
      dataIndex: 'competent',
      colNum: 8,
    },
    {
      label: '工号',
      dataIndex: 'jobNo',
      colNum: 8,
    },
    {
      label: '公司名称',
      dataIndex: 'companyName',
      formItemProps: {
        rules: [{ required: true, message: '请输入公司名称' }],
      },
      colNum: 8,
    },
    {
      label: '单位信用代码',
      dataIndex: 'creditCode',
      formItemProps: {
        rules: [{ required: true, message: '请输入单位信用代码' }],
      },
      colNum: 8,
    },
    {
      label: '公司角色',
      dataIndex: 'companyType',
      formItem: <DictSelect dictKey={'pm_company_type'} />,
      colNum: 8,
    },
    {
      label: '职能',
      dataIndex: 'function',
      colNum: 8,
    },
    {
      label: '详细地址',
      dataIndex: 'address',
      colNum: 8,
    },
    {
      label: '在岗情况',
      dataIndex: 'jobState',
      formItem: <DictSelect dictKey={'pm_job_state'} />,
      colNum: 8,
    },
    {
      label: '是否启用',
      dataIndex: 'enabled',
      formItem: <DictSelect dictKey={'pm_enabled'} />,
      colNum: 8,
    },
    {
      label: '发证机关',
      dataIndex: 'issuingAuthority',
      colNum: 8,
    },
    {
      label: '有效期起',
      dataIndex: 'validityStartDate',
      formItem: <DatePicker className="w-full" format="YYYY-MM-DD" />,
      formItemProps: {
        getValueFromEvent: (...[, dateString]) => dateString,
        getValueProps: (value) => ({
          value: value ? dayjs(value) : undefined,
        }),
      },
      colNum: 8,
    },
    {
      label: '有效期止',
      dataIndex: 'validityEndDate',
      formItem: <DatePicker className="w-full" format="YYYY-MM-DD" />,
      formItemProps: {
        getValueFromEvent: (...[, dateString]) => dateString,
        getValueProps: (value) => ({
          value: value ? dayjs(value) : undefined,
        }),
      },
      colNum: 8,
    },
    {
      label: '职业健康',
      dataIndex: 'occupationalHealth',
      colNum: 8,
    },

    {
      label: '婚姻状况',
      dataIndex: 'maritalStatus',
      formItem: <DictSelect dictKey={'pm_marital_status'} />,
      colNum: 8,
    },
    {
      label: '工龄',
      dataIndex: 'workYears',
      colNum: 8,
    },
    {
      label: '特长',
      dataIndex: 'specialty',
      colNum: 8,
    },
    {
      label: '是否有重大病史',
      dataIndex: 'hasMajorMedicalHistory',
      formItem: <DictSelect dictKey={'pm_has_major_medical_history'} />,
      colNum: 8,
    },
    {
      label: '紧急联系人姓名',
      dataIndex: 'emergencyContactName',
      colNum: 8,
    },
    {
      label: '紧急联系方式',
      dataIndex: 'emergencyContactMethod',
      formItemProps: {
        rules: [
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: '请输入正确的紧急联系方式',
          },
        ],
      },
      colNum: 8,
    },
    {
      label: '',
      dataIndex: 'passportPhoto',
      formItem: <div className="hidden"></div>,
      colNum: 8,
    },
  ];

  useImperativeHandle(ref, () => ({
    key: formKey,
    form: formRef.current,
    resetAll: () => {
      setDefaultUrl([]);
    },
  }));

  return (
    <>
      <SingleTitle label="基础信息" />
      <Row gutter={16}>
        <Col className="gutter-row" span={4}>
          <Flex justify="center" align="center" className="h-full">
            <div>
              <ProUpload
                key={JSON.stringify(defaultUrl)}
                defaultFileList={defaultUrl}
                onRequest={async (params: any) => await F.fileUpload(params)}
                onUploadSuccess={async (res) => {
                  const { url } = Object.values(res)[0] as { url: string };
                  setDefaultUrl([...defaultUrl, { url: url }]);
                  formRef.current?.setFieldValue('passportPhoto', url);
                }}
                maxCount={1}
                showUploadList={true}
              />
            </div>
          </Flex>
        </Col>
        <Col className="gutter-row" span={20}>
          <AdForm
            name={formKey}
            initialValues={subForm}
            formRef={formRef}
            labelAlign="right"
            columns={columns}
          />
        </Col>
      </Row>
    </>
  );
});
export default InfoCom;
