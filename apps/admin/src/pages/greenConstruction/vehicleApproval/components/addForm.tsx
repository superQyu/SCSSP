import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
  message,
  Modal,
  DatePicker,
  Row,
  Col,
  Flex,
} from 'antd';
import { ProUpload } from 'components';
import type { GetProp, TreeSelectProps } from 'antd';

import { ExclamationCircleTwoTone } from '@ant-design/icons';
import type { FormInstance } from 'antd/es/form';

import { AdForm, FormColumnsTypes } from 'components';

import { RebuildTree, flattenArray, sortMenu } from 'utils';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import setModel from '../modes/form.model';
import { ToString } from '@/utils/transform';

interface Props {
  /** 控制 Modal 是否显示 */
  openModal: boolean;
  /** 表单初始化 */
  subForm: Record<string, any>;
  /** 监听Modal状态变化 */
  onStateChange: (state: boolean) => void;
}

type MenusType = {
  [key: string]: any;
};

const AddMenus: React.FC<Props> = ({
  openModal,
  subForm,
  onStateChange,
}: Props) => {
  const { server } = useBasicConfiguration();
  const { vehicle: V } = server;
  const formRef = useRef<FormInstance>(null);
  const [title] = useState<string>('新增车辆进出场备案');
  const [loading, setLoading] = useState<boolean>(false);
  // 对传入的图片进行控制
  const [picture, setPicture] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(openModal);

  // 单位信息表单的默认值
  const [formData, setFormData] = useState<MenusType>({
    ...subForm,
    energyType: ToString(subForm.energyType),
  });

  const { formColumns } = setModel(formRef, picture);

  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);
  useEffect(() => {
    setPicture(subForm.attachment?.split('@'));
  }, [subForm]);

  const onReset = () => {
    if (loading) {
      message.warning(`数据提交中,请稍等...`);
      return;
    }
    formRef.current?.resetFields();
  };

  const handleOk = async () => {
    try {
      const values: MenusType =
        await formRef.current?.validateFields();
      console.log('表单校验后的值', values);
      setLoading(true);
      V[
        subForm.id ? 'vehicleApproveUpdate' : 'vehicleApproveAdd'
      ]({
        ...values,
        id: subForm.id,
        attachment:
          values.attachment && values.attachment?.join('@'),
      })
        .then(() => {
          message.success('操作成功！');
          setLoading(false);
          onStateChange(false);
          onReset();
        })
        .catch(() => {
          setLoading(false);
        });
    } catch (errorInfo) {}
  };
  const handleCancel = () => {
    if (loading) {
      message.warning(`数据提交中,请稍等...`);
      return;
    }
    setOpen(false);
    onReset();
    onStateChange(false);
  };
  const onFormChange = (_: MenusType) => {};

  return (
    <Modal
      width={'900px'}
      open={open}
      // title={title}
      title={subForm.id ? '编辑' : '新增'}
      onOk={handleOk}
      onCancel={handleCancel}
      maskClosable={false}
      footer={[
        <Button
          key="back"
          onClick={handleCancel}
          disabled={loading}
        >
          取消
        </Button>,
        <Button
          key="reset"
          htmlType="reset"
          onClick={onReset}
          disabled={loading}
        >
          重置
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleOk}
        >
          {subForm.id ? '更新' : '提交'}
        </Button>,
      ]}
    >
      {/* <div className="mr-8 ml-8"> */}
      {/* <Row gutter={10} className="mt-5">
          <Col span={4}>
            <Flex
              justify="center"
              align="center"
              className="h-full"
            >
              <div>
                <ProUpload
                  key={JSON.stringify(subForm.passportPhoto)}
                  tip="请上传行驶证正面图片"
                  // defaultFileList={() => defaultUrl}
                  // onRequest={async (params: any) =>
                  //   await F.fileUpload(params)
                  // }
                  onUploadSuccess={async (res) => {
                    const { url } = Object.values(res)[0] as {
                      url: string;
                    };
                    // setDefaultUrl([...defaultUrl, { url: url }]);
                    formRef.current?.setFieldValue(
                      'passportPhoto',
                      url
                    );
                  }}
                  maxCount={1}
                  showUploadList={true}
                />
              </div>
            </Flex>
          </Col>
          <Col span={20}>
            <AdForm
              key={`${JSON.stringify(subForm)}`}
              initialValues={formData}
              loadingTitle="提交中..."
              formRef={formRef}
              loading={loading}
              labelAlign="right"
              onFormChange={onFormChange}
              columns={formColumns}
              layoutStyle={{
                labelCol: { span: 12 },
                wrapperCol: { span: 12, flex: 1 },
              }}
            />
          </Col>
        </Row> */}
      <AdForm
        key={`${JSON.stringify(subForm)}`}
        initialValues={formData}
        loadingTitle="提交中..."
        formRef={formRef}
        loading={loading}
        labelAlign="right"
        onFormChange={onFormChange}
        columns={formColumns}
        // layoutStyle={{
        //   labelCol: { span: 12 },
        //   wrapperCol: { span: 12, flex: 1 },
        // }}
      />
      {/* </div> */}
    </Modal>
  );
};
export default AddMenus;
