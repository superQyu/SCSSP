import { useEffect, forwardRef, useState, useRef, useImperativeHandle } from 'react';
import { AdForm, FormColumnsTypes } from 'components';

import type { FormInstance } from 'antd/es/form';

import { ProUpload } from 'components';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
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
  const { server } = useBasicConfiguration();
  const { file: F, basic: B } = server;

  const formRef = useRef<FormInstance>(null);
  const [menus, setMenus] = useState<MenusType>({});
  const [formKey, _] = useState<string>('projectInfoSaveReqVO');
  const [getFormKey] = useState<string>('projectInfoRespVO');

  const columns: FormColumnsTypes[] = [
    {
      label: '施工平面图',
      dataIndex: 'constructionPlanImage',
      formItem: (
        <div style={{ paddingInlineStart: '13px' }}>
          <ProUpload
            onRequest={async (params: any) => await F.fileUpload(params)}
            onUploadSuccess={(res: any) => {
              console.log('上传成功:', res);
            }}
            onUploadError={(err: any) => {
              console.log('上传失败');
            }}
            onDeleted={(uid: string) => {
              console.log('文件ID:', uid);
            }}
          />
        </div>
      ),
      colNum: 24,
      formItemProps: {
        labelCol: { span: 3 },
        wrapperCol: { span: 21, flex: 1 },
      },
    },
    {
      label: '横向坐标',
      dataIndex: 'xcoordinate',
      colNum: 8,
      formItemProps: {
        rules: [{ required: true }],
      },
    },
    {
      label: '纵向坐标',
      dataIndex: 'ycoordinate',
      colNum: 8,
      formItemProps: {
        rules: [{ required: true }],
      },
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
      <SingleTitle label={'施工平面图'} />
      <AdForm
        key={`${JSON.stringify(menus)}`}
        name={`ConstructionPlan`}
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
