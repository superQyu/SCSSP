import { useEffect, forwardRef, useState, useRef, useImperativeHandle } from 'react';
import { AdForm, FormColumnsTypes } from 'components';

import type { FormInstance } from 'antd/es/form';

import { DatePicker, InputNumber } from 'antd';
import dayjs from 'dayjs';

import SingleTitle from '@/components/SingleTitle';

type MenusType = {
  [key: string]: any;
};

interface MenusPropsType extends MenusType {
  /** 控制 Modal 是否显示 */
  openModal: boolean;
  /** 表单初始化 */
  subForm: MenusType;
  /** 监听表单字段状态变化 */
  onFormChange: () => void;
}

const DefultForm: React.FC<MenusPropsType> = forwardRef(({ subForm, onFormChange }, ref) => {
  //   const { server, config: C } = useBasicConfiguration();

  const formRef = useRef<FormInstance>(null);
  const [menus, setMenus] = useState<MenusType>({});
  const [formKey, _] = useState<string>('projectBidInfoSaveReqVO');
  const [getFormKey] = useState<string>('projectBidInfoRespVO');

  const columns: FormColumnsTypes[] = [
    {
      label: '施工单位简称',
      dataIndex: 'constructionCompanyShortName',
      colNum: 8,
      formItemProps: {
        rules: [{ required: true }],
      },
    },
    {
      label: '统一社会信用代码',
      dataIndex: 'unifiedSocialCreditCode',
      colNum: 8,
      formItemProps: {
        rules: [{ required: true }],
      },
    },
    {
      label: '项目简称',
      dataIndex: 'projectShortName',
      colNum: 8,
    },
    {
      label: '所属国家',
      dataIndex: 'country',
      colNum: 8,
    },
    {
      label: '所属区域',
      dataIndex: 'region',
      colNum: 8,
    },
    {
      label: '工程编号',
      dataIndex: 'engineeringNo',
      colNum: 8,
    },
    {
      label: '使用资质',
      dataIndex: 'qualification',
      colNum: 8,
    },
    {
      label: '投标面积(㎡)',
      dataIndex: 'bidArea',
      formItem: <InputNumber min={0} style={{ width: '100%' }} />,
      colNum: 8,
    },
    {
      label: '土石方量(m³)',
      dataIndex: 'earthworkVolume',
      formItem: <InputNumber min={0} style={{ width: '100%' }} />,
      colNum: 8,
    },
    {
      label: '项目用途',
      dataIndex: 'projectPurpose',
      colNum: 8,
    },
    {
      label: '项目类型',
      dataIndex: 'projectType',
      colNum: 8,
    },
    {
      label: '结构类型',
      dataIndex: 'structureType',
      colNum: 8,
    },
    {
      label: '中标日期',
      dataIndex: 'bidDate',
      formItem: <DatePicker style={{ width: '100%' }} />,
      colNum: 8,
    },
    {
      label: '中标开工日期',
      dataIndex: 'bidStartDate',
      formItem: <DatePicker style={{ width: '100%' }} />,
      colNum: 8,
    },
    {
      label: '中标竣工日期',
      dataIndex: 'bidCompletionDate',
      formItem: <DatePicker style={{ width: '100%' }} />,
      colNum: 8,
    },
    {
      label: '中标金额(万元)',
      dataIndex: 'bidAmount',
      formItem: <InputNumber min={0} style={{ width: '100%' }} />,
      colNum: 8,
    },
    {
      label: '承包模式',
      dataIndex: 'contractingModel',
      colNum: 8,
    },
    {
      label: '高达精特',
      dataIndex: 'tallExquisite',
      colNum: 8,
    },
    {
      label: '投标利润率(%)',
      dataIndex: 'bidProfitMargin',
      formItem: <InputNumber min={0} style={{ width: '100%' }} />,
      colNum: 8,
    },
    {
      label: '经营模式',
      dataIndex: 'managementModel',
      colNum: 8,
    },
    {
      label: '分包模式',
      dataIndex: 'subcontractingModel',
      colNum: 8,
    },
  ];

  useEffect(() => {
    const isEmpty = !!Object.entries(subForm).length;
    const { bidDate, bidStartDate, bidCompletionDate } = subForm[getFormKey] || {};
    setMenus(
      isEmpty && subForm.hasOwnProperty(getFormKey)
        ? {
            ...{
              ...subForm[getFormKey],
              bidDate: bidDate ? dayjs(bidDate) : '',
              bidStartDate: bidStartDate ? dayjs(bidStartDate) : '',
              bidCompletionDate: bidCompletionDate ? dayjs(bidCompletionDate) : '',
            },
          }
        : subForm
    );
  }, [subForm]);

  useImperativeHandle(ref, () => ({
    key: formKey,
    sourceKey: getFormKey,
    form: formRef.current,
    // transform: (value: MenusType) => {
    //   return {
    //     ...value,
    //     bidDate: dayjs(value.bidDate).valueOf(),
    //     bidStartDate: dayjs(value.bidStartDate).valueOf(),
    //     bidCompletionDate: dayjs(value.bidCompletionDate).valueOf(),
    //   };
    // },
  }));

  return (
    <>
      <SingleTitle label={'中标信息'} />
      <AdForm
        key={`${JSON.stringify(menus)}`}
        name={`${formKey}`}
        formRef={formRef}
        initialValues={{ ...menus }}
        labelAlign="right"
        columns={columns}
        layoutStyle={{
          labelCol: { span: 10 },
          wrapperCol: { span: 16, flex: 1 },
        }}
        onFormChange={onFormChange}
        // loadingTitle="提交中..."
        // loading={loading}
      />
    </>
  );
});
export default DefultForm;
