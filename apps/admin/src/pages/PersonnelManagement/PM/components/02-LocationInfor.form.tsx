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
  const [formKey, _] = useState<string>('projectInfoSaveReqVO');
  const [getFormKey] = useState<string>('projectInfoRespVO');

  const columns: FormColumnsTypes[] = [
    {
      label: 'WGS84经度',
      dataIndex: 'wgsLongitude',
      colNum: 8,
    },
    {
      label: 'WGS84纬度',
      dataIndex: 'wgsLatitude',
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
      <SingleTitle label={'位置信息'} />
      <AdForm
        key={`${JSON.stringify(menus)}`}
        name={`LocationInfor`}
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
