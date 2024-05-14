import { useEffect, forwardRef, useState, useRef, useImperativeHandle } from 'react';
import { AdForm, FormColumnsTypes } from 'components';

import type { FormInstance } from 'antd/es/form';

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
  const [formKey, _] = useState<string>('projectRelatedUnitsSaveReqVO');
  const [getFormKey] = useState<string>('projectRelatedUnitsRespVO');

  const columns: FormColumnsTypes[] = [
    {
      label: '监理单位',
      dataIndex: 'supervisionCompany',
      colNum: 8,
    },
    {
      label: '设计单位',
      dataIndex: 'designCompany',
      colNum: 8,
    },
    {
      label: '勘察单位',
      dataIndex: 'surveyCompany',
      colNum: 8,
    },
    {
      label: '工程所在地人社部投诉电话',
      dataIndex: 'localHumanResourcesComplaintsPhone',
      colNum: 8,
    },
    {
      label: '甲方人社部投诉电话',
      dataIndex: 'partyAHumanResourcesComplaintsPhone',
      colNum: 8,
    },
    {
      label: '工程所在地住建部投诉电话',
      dataIndex: 'localConstructionDepartmentComplaintsPhone',
      colNum: 8,
    },
    {
      label: '甲方住建部投诉电话',
      dataIndex: 'partyAConstructionDepartmentComplaintsPhone',
      colNum: 8,
    },
    {
      label: '劳务分包',
      dataIndex: 'laborSubcontract',
      colNum: 8,
    },
    {
      label: '专业分包',
      dataIndex: 'specialtySubcontract',
      colNum: 8,
    },
  ];

  useEffect(() => {
    const isEmpty = !!Object.entries(subForm).length;
    setMenus(isEmpty && subForm.hasOwnProperty(getFormKey) ? { ...subForm[getFormKey] } : subForm);
  }, [subForm]);

  useImperativeHandle(ref, () => ({
    key: formKey,
    sourceKey: getFormKey,
    form: formRef.current,
  }));

  return (
    <>
      <SingleTitle label={'相关单位'} />
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
