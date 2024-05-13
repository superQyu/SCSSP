import { useEffect, forwardRef, useState, useRef, useImperativeHandle } from 'react';
import { AdForm, FormColumnsTypes } from 'components';

import type { FormInstance } from 'antd/es/form';

import { DatePicker, InputNumber } from 'antd';
import dayjs from 'dayjs';

import SingleTitle from '@/components/SingleTitle';
import DictSelect from '@/components/DictSelect';

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
  const [formKey, _] = useState<string>('projectEngineeringInfoSaveReqVO');
  const [getFormKey] = useState<string>('projectEngineeringInfoRespVO');

  const columns: FormColumnsTypes[] = [
    {
      label: '工程状态',
      dataIndex: 'engineeringStatus',
      colNum: 8,
      formItem: <DictSelect dictKey={`project_status`} dropdownExtend={false} />,
      formItemProps: {
        rules: [{ required: true }],
      },
    },
    {
      label: '项目级别',
      dataIndex: 'projectLevel',
      formItem: <DictSelect dictKey={`project_level`} dropdownExtend={false} />,
      colNum: 8,
    },
    {
      label: '主要施工范围',
      dataIndex: 'constructionScope',
      colNum: 8,
    },
    {
      label: '建筑檐高(m)',
      dataIndex: 'eavesHeight',
      formItem: <InputNumber min={0} style={{ width: '100%' }} />,
      colNum: 8,
    },
    {
      label: '合同开工日期',
      dataIndex: 'contractStartDate',
      formItem: <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />,
      colNum: 8,
      formItemProps: {
        rules: [{ required: true }],
      },
    },
    {
      label: '合同竣工日期',
      dataIndex: 'contractCompletionDate',
      formItem: <DatePicker style={{ width: '100%' }} />,
      colNum: 8,
      formItemProps: {
        rules: [{ required: true }],
      },
    },
    {
      label: '开工令日期',
      dataIndex: 'startOrderDate',
      formItem: <DatePicker style={{ width: '100%' }} />,
      colNum: 8,
    },
    {
      label: '计划竣工日期',
      dataIndex: 'plannedCompletionDate',
      formItem: <DatePicker style={{ width: '100%' }} />,
      colNum: 8,
    },
    {
      label: '地上面积(㎡)',
      dataIndex: 'aboveGroundArea',
      formItem: <InputNumber min={0} style={{ width: '100%' }} />,
      colNum: 8,
    },
    {
      label: '地上面积(㎡)',
      dataIndex: 'underGroundArea',
      formItem: <InputNumber min={0} style={{ width: '100%' }} />,
      colNum: 8,
    },
    {
      label: '总层数',
      dataIndex: 'totalFloors',
      formItem: <InputNumber min={0} style={{ width: '100%' }} />,
      colNum: 8,
    },
    {
      label: '单位工程数量',
      dataIndex: 'unitProjectQuantity',
      formItem: <InputNumber min={0} style={{ width: '100%' }} />,
      colNum: 8,
    },
    {
      label: '工程类别',
      dataIndex: 'engineeringType',
      formItem: <DictSelect dictKey={`structure_type`} dropdownExtend={false} />,
      colNum: 8,
    },
    {
      label: '隐患提醒天数',
      dataIndex: 'dangerReminderDays',
      formItem: <InputNumber min={0} style={{ width: '100%' }} />,
      colNum: 8,
    },
    {
      label: '隐患金录天数',
      dataIndex: 'dangerBanDays',
      formItem: <InputNumber min={0} style={{ width: '100%' }} />,
      colNum: 8,
    },
  ];

  useEffect(() => {
    const isEmpty = !!Object.entries(subForm).length;
    const { contractStartDate, contractCompletionDate, startOrderDate, plannedCompletionDate } =
      subForm[getFormKey] || {};
    setMenus(
      isEmpty && subForm.hasOwnProperty(getFormKey)
        ? {
            ...{
              ...subForm[getFormKey],
              contractStartDate: contractStartDate ? dayjs(contractStartDate) : '',
              contractCompletionDate: contractCompletionDate ? dayjs(contractCompletionDate) : '',
              startOrderDate: startOrderDate ? dayjs(startOrderDate) : '',
              plannedCompletionDate: plannedCompletionDate ? dayjs(plannedCompletionDate) : '',
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
    //     contractStartDate: dayjs(value.contractStartDate).valueOf(),
    //     contractCompletionDate: dayjs(value.contractCompletionDate).valueOf(),
    //     startOrderDate: dayjs(value.startOrderDate).valueOf(),
    //     plannedCompletionDate: dayjs(value.plannedCompletionDate).valueOf(),
    //   };
    // },
  }));

  return (
    <>
      <SingleTitle label={'工程信息'} />
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
