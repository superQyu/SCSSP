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
  const [menus, setMenus] = useState<MenusType>({});
  const [formKey, _] = useState<string>('projectInfoSaveReqVO');

  const columns: FormColumnsTypes[] = [
    {
      label: 'WGS84经度',
      dataIndex: 'xcoordinate',
      colNum: 8,
    },
    {
      label: 'WGS84纬度',
      dataIndex: 'ycoordinate',
      colNum: 8,
    },
  ];

  useImperativeHandle(ref, () => ({
    key: formKey,
    form: formRef.current,
  }));

  return (
    <>
      <SingleTitle label={'位置信息'} />
      <AdForm
        key={`LocationInfor`}
        name={`LocationInfor`}
        formRef={formRef}
        initialValues={{ ...menus }}
        labelAlign="right"
        columns={columns}
        layoutStyle={{
          labelCol: { span: 8 },
          wrapperCol: { span: 16, flex: 1 },
        }}
        // onFormChange={onFormChange}
        // loadingTitle="提交中..."
        // loading={loading}
      />
    </>
  );
});
export default DefultForm;
