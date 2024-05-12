import { useEffect, forwardRef, useState, useRef, useImperativeHandle } from 'react';
import { AdForm, FormColumnsTypes } from 'components';

import type { FormInstance } from 'antd/es/form';

import { InputNumber } from 'antd';

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
  const [formKey, _] = useState<string>('projectQualitySafetySaveReqVO');
  const [getFormKey] = useState<string>('projectQualitySafetyRespVO');

  const columns: FormColumnsTypes[] = [
    {
      label: '质量目标',
      dataIndex: 'qualityGoal',
      colNum: 8,
    },
    {
      label: '安全目标',
      dataIndex: 'safetyGoal',
      colNum: 8,
    },
    {
      label: '创建市优质结构',
      dataIndex: 'cityQualityStructure',
      formItem: <DictSelect dictKey={`is_public`} dropdownExtend={false} />,
      colNum: 8,
    },
    {
      label: '观感质量等级目标',
      dataIndex: 'sensoryQualityLevelGoal',
      colNum: 8,
    },
    {
      label: '优良面积(㎡)',
      formItem: <InputNumber min={0} style={{ width: '100%' }} />,

      dataIndex: 'excellentArea',
      colNum: 8,
    },
  ];

  useEffect(() => {
    const isEmpty = !!Object.entries(subForm).length;
    setMenus(isEmpty && subForm.hasOwnProperty(getFormKey) ? { ...subForm[getFormKey] } : subForm);
  }, [subForm]);

  useImperativeHandle(ref, () => ({
    key: formKey,
    form: formRef.current,
  }));

  return (
    <>
      <SingleTitle label={'质量安全精品创建'} />
      <AdForm
        key={`${formKey}`}
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
