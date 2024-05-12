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
  const [formKey, _] = useState<string>('projectManagementSystemSaveReqVO'); 
   const [getFormKey] = useState<string>('projectManagementSystemRespVO');


  const columns: FormColumnsTypes[] = [
    {
      label: '项目经理',
      dataIndex: 'projectManager',
      colNum: 8,
    },
    {
      label: '项目执行经理',
      dataIndex: 'executiveManager',
      colNum: 8,
    },
    {
      label: '项目副经理',
      dataIndex: 'deputyManager',
      colNum: 8,
    },
    {
      label: '商务经理',
      dataIndex: 'commercialManager',
      colNum: 8,
    },
    {
      label: '项目总工',
      dataIndex: 'chiefEngineer',
      colNum: 8,
    },
    {
      label: '专项质量员',
      dataIndex: 'qualityOfficer',
      colNum: 8,
    },
    {
      label: '专职安全员',
      dataIndex: 'safetyOfficer',
      colNum: 8,
    },
    {
      label: '信息化负责人',
      dataIndex: 'informaticsOfficer',
      colNum: 8,
    },
    {
      label: '材料员',
      dataIndex: 'materialOfficer',
      colNum: 8,
    },
    {
      label: '预算员',
      dataIndex: 'budgetOfficer',
      colNum: 8,
    },
    {
      label: '施工员',
      dataIndex: 'constructionOfficer',
      colNum: 8,
    },
    {
      label: '成本会计',
      dataIndex: 'costAccountant',
      colNum: 8,
    },
    {
      label: '劳务管理员',
      dataIndex: 'laborAdministrator',
      colNum: 8,
    },
    {
      label: '劳务分管领导',
      dataIndex: 'laborLeadership',
      colNum: 8,
    },
    {
      label: '劳务分管领导电话',
      dataIndex: 'laborLeadershipPhone',
      colNum: 8,
    },
    {
      label: '项目经理电话',
      dataIndex: 'projectManagerPhone',
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
      <SingleTitle label={'项目管理体系'} />
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
