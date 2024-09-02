import React, { useRef, forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import { DatePicker } from 'antd';
import type { FormInstance } from 'antd/es/form';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { ToString } from '@/utils/transform';

import DictSelect from '@/components/DictSelect';
import { FormColumnsTypes, AdForm } from 'components';
import AsyncSelect from '@/components/DictSelect/AsyncSelect';
import SingleTitle from '@/components/SingleTitle';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

interface Props {
  /** 表单初始化 */
  detail: Record<string, any>;
}

const CustomsDiv = styled.div`
  font-size: 12px;
  color: #454545;
  &::before {
    content: '*';
    margin: 0 2px 0 10px;
    color: red;
  }
`;

const EntryCom: React.FC<Props> = forwardRef(({ detail }: Props, ref) => {
  const { server } = useBasicConfiguration();
  const { group: G } = server;
  const formRef = useRef<FormInstance>(null);
  const [formKey, _] = useState<string>('entryInfoSaveReqVO');
  const [subForm, setSubForm] = useState({});

  useEffect(() => {
    if (Object.keys(detail).length) {
      const subForm = { ...detail.entryInfoRespVO };
      subForm.isTeamLeader = ToString(subForm.isTeamLeader);
      subForm.subcontractorId = ToString(subForm.subcontractorId);
      subForm.entryStatus = ToString(subForm.entryStatus);
      subForm.valuationMethod = ToString(subForm.valuationMethod);
      subForm.hasInsurance = ToString(subForm.hasInsurance);
      subForm.laborContractStatus = ToString(subForm.laborContractStatus);
      subForm.governmentPlatformUpload = ToString(subForm.governmentPlatformUpload);
      // console.log('subForm', subForm);
      setSubForm(subForm);
    }
  }, [detail]);

  const columns: FormColumnsTypes[] = [
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
      dataIndex: 'teamId',
      formItemProps: {
        rules: [{ required: true, message: '请选择班组名称' }],
      },
      formItem: (
        <AsyncSelect
          dropdownExtend={true}
          asyncData={async () => {
            const { list } = await G.getGroupList();
            return list.map((item: { teamName: string; id: number }) => {
              return {
                label: item.teamName,
                value: item.id,
              };
            });
          }}
          onChange={async (val) => {
            console.log('val', val, typeof val);

            if (typeof val == 'string') {
              formRef.current?.setFieldsValue({
                teamName: val,
              });
              formRef.current?.setFieldsValue({
                teamId: null,
              });
            } else {
              const { list } = await G.getGroupList();
              const name = list.find(
                (item: { label: string; value: number }) => item.value == val
              )?.label;
              formRef.current?.setFieldsValue({
                teamId: val,
              });
              formRef.current?.setFieldsValue({
                teamName: name,
              });
            }
          }}
        />
      ),
      colNum: 8,
    },
    {
      label: '分包单位',
      dataIndex: 'subcontractorId',
      formItem: <DictSelect dictKey={'subcontractor_type'} />,
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
      label: '邮政编码',
      dataIndex: 'postalCode',
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
    {
      label: '计价方式',
      dataIndex: 'valuationMethod',
      formItem: <DictSelect dictKey={'pm_valuation_method'} />,
      colNum: 8,
    },
    {
      label: '每日工资',
      dataIndex: 'dailyWage',
      formItemProps: {
        rules: [
          {
            pattern: /^[0-9]+([.]{1}[0-9]{1,2})?$/,
            message: '请输入正确的每日工资',
          },
        ],
      },
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
    // {
    //   label: '',
    //   dataIndex: 'teamName',
    //   formItem: <div className="hidden"></div>,
    // },
    // {
    //   label: '',
    //   dataIndex: 'teamId',
    //   formItem: <div className="hidden"></div>,
    // },
  ];

  useImperativeHandle(ref, () => ({
    key: formKey,
    form: formRef.current,
  }));
  return (
    <>
      <SingleTitle
        label="进场信息"
        subLabel={<CustomsDiv>首先录入班组长（是否班组长选【是】），再录入其他工人</CustomsDiv>}
      />
      <div className="mt-5">
        <AdForm
          loadingTitle="提交中..."
          initialValues={subForm}
          formRef={formRef}
          labelAlign="right"
          columns={columns}
          layoutStyle={{
            labelCol: { span: 12 },
            wrapperCol: { span: 12, flex: 1 },
          }}
        />
      </div>
    </>
  );
});
export default EntryCom;
