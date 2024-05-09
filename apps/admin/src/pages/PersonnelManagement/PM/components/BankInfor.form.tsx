import { forwardRef, useState, useRef, useImperativeHandle } from 'react';
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
  subForm: {};
  /** 监听Modal状态变化 */
  onStateChange: (state: boolean) => void;
}

const DefultForm: React.FC<MenusPropsType> = forwardRef(({ subForm }, ref) => {
  //   const { server, config: C } = useBasicConfiguration();

  const formRef = useRef<FormInstance>(null);
  const [menus, setMenus] = useState<MenusType>({ projectBankInfoSaveReqVO: {} });

  const columns: FormColumnsTypes[] = [
    {
      label: '对公账号开户银行',
      dataIndex: 'bankName',
      colNum: 12,
      formItemProps: {
        rules: [{ required: true, message: '请输入套餐名' }],
      },
    },
    {
      label: '对公账号号码',
      dataIndex: 'bankAccountNo',
      colNum: 12,
    },
    {
      label: '代发工资银行',
      dataIndex: 'salaryBankName',
      colNum: 12,
    },
    {
      label: '代发工资银行账号',
      dataIndex: 'salaryBankAccountNo',
      colNum: 12,
    },
  ];

  useImperativeHandle(ref, () => ({
    key:'projectBankInfoSaveReqVO'
  }));
  useImperativeHandle(ref, () => formRef.current);
  return (
    <>
      <SingleTitle label={'银行信息'} />
      <AdForm
        key={`${JSON.stringify(subForm)}`}
        // loadingTitle="提交中..."
        // loading={loading}
        formRef={formRef}
        initialValues={{ ...menus }}
        labelAlign="left"
        columns={columns}
        layoutStyle={{
          labelCol: { span: 8 },
          wrapperCol: { span: 16, flex: 1 },
        }}
        // onFormChange={onFormChange}
      />
    </>
  );
});
export default DefultForm;
