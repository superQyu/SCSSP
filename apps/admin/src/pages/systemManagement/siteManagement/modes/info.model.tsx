import { FormColumnsTypes } from 'components';
import { DatePicker, Button } from 'antd';
import DictSelect from '@/components/DictSelect';
import dayjs from 'dayjs';
export default () => {
  const infoColumns: FormColumnsTypes[] = [
    {
      label: '姓名',
      dataIndex: 'name',
      // formItemProps: {
      //   rules: [{ required: true, message: '请输入姓名' }],
      // },
      colNum: 8,
    },
    {
      label: '性别',
      dataIndex: 'gender',
      formItem: <DictSelect dictKey={'system_user_sex'} />,
      // formItemProps: {
      //   rules: [{ required: true, message: '请选择性别' }],
      // },
      colNum: 8,
    },
    {
      label: '联系电话',
      dataIndex: 'phone',
      // formItemProps: {
      //   rules: [{ required: true, message: '请输入联系电话' }],
      // },
      colNum: 8,
    },
    {
      label: '电子邮件',
      dataIndex: 'email',

      colNum: 8,
    },

    {
      label: '账户类型',
      dataIndex: 'accountType',

      colNum: 8,
    },
    {
      label: '上级账号',
      dataIndex: 'upAccount',
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
      // formItemProps: {
      //   rules: [{ required: true, message: '请输入身份证号' }],
      // },
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
      // formItemProps: {
      //   rules: [{ required: true, message: '请输入公司名称' }],
      // },
      colNum: 8,
    },
    {
      label: '单位信用代码',
      dataIndex: 'creditCode',
      // formItemProps: {
      //   rules: [{ required: true, message: '请输入单位信用代码' }],
      // },
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
      colNum: 8,
    },
    {
      label: '是否启用',
      dataIndex: 'enabled',
      formItem: <DictSelect dictKey={'infra_boolean_string'} />,
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
      formItem: <DictSelect dictKey={'infra_boolean_string'} />,
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
      colNum: 8,
    },
  ];

  const entryColumns: FormColumnsTypes[] = [
    {
      label: '是否班组长',
      dataIndex: 'isTeamLeader',
      formItemProps: {
        rules: [{ required: true, message: '请选择是否班组长' }],
      },
      formItem: <DictSelect dictKey={'pm_is_team_leader'} />,
      colNum: 8,
    },
    {
      label: '班组名称',
      dataIndex: 'teamName',
      colNum: 8,
    },
    {
      label: '分包单位',
      dataIndex: 'subcontractorId',
      colNum: 8,
    },
    {
      label: '进场状态',
      dataIndex: 'entryStatus',
      formItem: <DictSelect dictKey={'pm_entry_status'} />,
      colNum: 8,
    },
    {
      label: '进场日期',
      dataIndex: 'entryDate',
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
      label: '计价方式',
      dataIndex: 'valuationMethod',
      formItem: <DictSelect dictKey={'pm_valuation_method'} />,
      colNum: 8,
    },
    {
      label: '每日工资',
      dataIndex: 'dailyWage',
      colNum: 8,
    },
    {
      label: '开户银行',
      dataIndex: 'bankName',
      colNum: 8,
    },
    {
      label: '银行联号',
      dataIndex: 'bankLinkNumber',
      colNum: 8,
    },
    {
      label: '银行卡号',
      dataIndex: 'bankCardNumber',
      colNum: 8,
    },
    {
      label: '邮政编码',
      dataIndex: 'postalCode',
      colNum: 8,
    },
    {
      label: '发卡时间',
      dataIndex: 'cardIssuanceDate',
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
      label: '考勤卡号',
      dataIndex: 'attendanceCardNumber',
      colNum: 8,
    },
    {
      label: '是否购买工伤或意外伤害保险',
      dataIndex: 'hasInsurance',
      formItem: <DictSelect dictKey={'pm_has_insurance'} />,
      colNum: 8,
    },
    {
      label: '加入公会时间',
      dataIndex: 'unionJoinDate',
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
      label: '劳动合同状态',
      dataIndex: 'laborContractStatus',
      formItem: <DictSelect dictKey={'pm_labor_contract_status'} />,
      colNum: 8,
    },
    {
      label: '上传政府平台状态',
      dataIndex: 'governmentPlatformUpload',
      formItem: <DictSelect dictKey={'pm_government_platform_upload'} />,
      colNum: 8,
    },
  ];

  const workTypeColumns: FormColumnsTypes[] = [
    {
      label: '工人类型',
      dataIndex: 'workerType',
      formItemProps: {
        rules: [{ required: true, message: '请选择工人类型' }],
      },
      formItem: <DictSelect dictKey={'pm_worker_type'} />,
      colNum: 24,
    },
  ];

  const certificateColumns: FormColumnsTypes[] = [
    {
      label: '证书名称',
      dataIndex: 'credentialName',
      formItemProps: {
        rules: [{ required: true, message: '请输入证书名称' }],
      },
      colNum: 12,
    },
    {
      label: '证书编号',
      dataIndex: 'credentialNumber',
      colNum: 12,
    },
    {
      label: '证书种类',
      dataIndex: 'certificateType',
      // formItem: <Select options={functionOptions} />,
      colNum: 12,
    },
    {
      label: '证书类型',
      dataIndex: 'certificateCategory',
      // formItem: <Select options={functionOptions} />,
      colNum: 12,
    },
    {
      label: '证书等级',
      dataIndex: 'certificateLevel',
      // formItem: <Select options={functionOptions} />,
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
      formItem: <DatePicker className="w-full" format="YYYY-MM-DD" />,

      formItemProps: {
        getValueFromEvent: (...[, dateString]) => dateString,
        getValueProps: (value) => ({
          value: value ? dayjs(value) : undefined,
        }),
      },
      colNum: 12,
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
      colNum: 12,
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
      colNum: 12,
    },
    {
      label: '发证机关',
      dataIndex: 'issuingAuthority',
      colNum: 12,
    },
    {
      label: '复核日期',
      dataIndex: 'reviewDate',
      formItem: <DatePicker className="w-full" format="YYYY-MM-DD" />,
      formItemProps: {
        getValueFromEvent: (...[, dateString]) => dateString,
        getValueProps: (value) => ({
          value: value ? dayjs(value) : undefined,
        }),
      },
      colNum: 12,
    },
    {
      label: '证书验证',
      dataIndex: 'certificateVerification',
      formItem: <Button>点击进行证书验证</Button>,
      colNum: 12,
    },
  ];

  return {
    infoColumns,
    workTypeColumns,
    entryColumns,
    certificateColumns,
  };
};
