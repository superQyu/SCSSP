import { useState, useEffect, useRef } from 'react';
import { Modal, Button, message } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { AdForm } from 'components';

import initColumns from '../models/form.model';

// api 相关
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

// 代表任意对象
type MenusType = {
  [key: string]: any;
};
interface Props {
  /** 控制 Modal 是否显示 */
  openModal: boolean;
  /** 监听 Modal 状态变化 */
  onStateChange: (state: boolean) => void;
}

export default ({ openModal, onStateChange }: Props) => {
  // api 相关
  const { server } = useBasicConfiguration();
  const { materialList } = server;

  const [open, setOpen] = useState<boolean>(openModal);
  const [title] = useState<string>('添加证件信息');
  const [loading, setLoading] = useState<boolean>(false);

  const formRef = useRef<FormInstance>(null);

  // 表单项配置
  // 只能放在外面, 因为调用该方法中使用 hook, 只能放在函数式组件的外部
  const formColumns = initColumns(formRef);

  // 分包商信息表单的默认值
  const [initValue] = useState<MenusType>({
    type: '1',
  });

  useEffect(() => {
    setOpen(openModal);
    formRef.current?.resetFields();
  }, [openModal]);

  // 点击重置
  const onReset = () => {
    if (loading) {
      message.warning(`数据提交中,请稍等...`);
      return;
    }
    formRef.current?.resetFields();
  };

  // 点击保存
  const handleOk = async () => {
    const values: MenusType = await formRef.current?.validateFields();
    // console.log('表单提交时的数据', values);
    const func = values.secondLevelCode
      ? 'createThird'
      : values.firstLevelCode
      ? 'createSecond'
      : 'createFirst';
    setLoading(true);
    materialList[func](values)
      .then(() => {
        message.success('操作成功！');
        setLoading(false);
        onStateChange(false);
        onReset();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  // 点击取消
  const handleCancel = () => {
    if (loading) {
      message.warning(`数据提交中,请稍等...`);
      return;
    }
    setOpen(false);
    onReset();
    onStateChange(false);
  };

  return (
    <>
      <Modal
        destroyOnClose
        open={open}
        title={title}
        // width={1000}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        footer={[
          <Button key="back" onClick={handleCancel} disabled={loading}>
            取消
          </Button>,
          <Button key="reset" htmlType="reset" onClick={onReset} disabled={loading}>
            重置
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            提交
          </Button>,
        ]}
      >
        <AdForm
          loadingTitle="提交中..."
          formRef={formRef}
          initialValues={initValue}
          loading={loading}
          labelAlign="left"
          columns={formColumns}
        />
      </Modal>
    </>
  );
};
