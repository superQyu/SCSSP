import React, { lazy, Suspense, useState, useEffect, useRef } from 'react';
import { Button, message, Modal, Spin } from 'antd';
import dayjs from 'dayjs';

import type { FormInstance } from 'antd/es/form';

import { AdForm, FormColumnsTypes } from 'components';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

const FormArray = import.meta.glob('../components/**/*.form.tsx');
const FormList = Object.entries(FormArray).map(([key, val]) => {
  let label = key.split('/').slice(-1)[0].split('.')[0];
  if (label === 'index') label = key.split('/').slice(-2)[0];
  return {
    label: label,
    Component: lazy(val as () => Promise<any>),
  };
});

type MenusType = {
  [key: string]: any;
};
type FormRefProps = {
  [key: string]: FormInstance | null;
};

interface Props extends MenusType {
  /** 控制 Modal 是否显示 */
  openModal: boolean;
  /** 表单初始化 */
  subForm: {};
  /** 监听Modal状态变化 */
  onStateChange: (state: boolean) => void;
}

const AddProject: React.FC<Props> = ({ openModal, subForm, onStateChange }: Props) => {
  // const { server, config: C } = useBasicConfiguration();
  //  api server
  // const { systemTenant: ST, systemUser: SU, systemRole: SR } = server;
  // const { SYSTEM_DATA_SCOPE } = C?.DICT_TYPE || {};

  const _DefParams = {
    status: '0',
  };
  const formRef = useRef<FormRefProps>({});
  const [title] = useState<string>('项目');
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(openModal);
  const [menus, setMenus] = useState<MenusType>({ ..._DefParams });
  const [isCreate, setIsCreate] = useState<boolean>(false);

  const onReset = () => {
    if (loading) {
      message.warning(`数据提交中,请稍等...`);
      return;
    }
    // formRef.current?.resetFields();
  };

  const handleOk = async () => {
    try {
      setLoading(true);
      Object.entries(formRef.current).map(async ([_, funs], index) => {
        funs
          ?.validateFields()
          .then((value) => {
            console.log(funs);
          })
          .catch(() => {
            setLoading(false);
          });
      });
      //   const values: MenusType = {}; //await formRef.current?.validateFields();
      //   setLoading(true);

      //   let params = values;
      //   if (menus.id) params = { ...menus, ...values };
      //   params['expireTime'] = dayjs(params.expireTime).valueOf();

      //   ST[isCreate ? 'createTenant' : 'updateTenant'](JSON.parse(JSON.stringify({ ...params })))
      //     .then(() => {
      //       message.success('操作成功！');
      //       setLoading(false);
      //       onStateChange(false);
      //       onReset();
      //     })
      //     .catch(() => {
      //       setLoading(false);
      //     });
    } catch (errorInfo) {
      setLoading(false);
    }
  };
  const handleCancel = () => {
    if (loading) {
      message.warning(`数据提交中,请稍等...`);
      return;
    }
    onStateChange(false);
    setOpen(false);
    onReset();
  };
  useEffect(() => {
    setOpen(openModal);
    if (openModal) {
      setMenus({ ..._DefParams, ...(!Object.entries(subForm).length ? {} : subForm) });
    } else {
      // formRef.current?.resetFields();
    }
  }, [openModal]);

  useEffect(() => {
    setIsCreate(!(menus.id || menus.id === 0));
  }, [menus]);

  useEffect(() => {}, [subForm]);

  const columns: FormColumnsTypes[] = [];

  return (
    <Modal
      open={open}
      title={`${isCreate ? '新增' : '更新'}${title}`}
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
          {isCreate ? '提交' : '更新'}
        </Button>,
      ]}
      width={'55%'}
    >
      <Spin tip="提交中..." spinning={loading}>
        {FormList.map((Item) => (
          <Suspense
            fallback={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '50vh', // 视图高度
                }}
              >
                <Spin size="large" />
              </div>
            }
            key={Item.label}
          >
            <Item.Component
              ref={(el: any) => (formRef.current[Item.label] = el)}
              loading={loading}
            />
          </Suspense>
        ))}
      </Spin>
    </Modal>
  );
};
export default AddProject;
