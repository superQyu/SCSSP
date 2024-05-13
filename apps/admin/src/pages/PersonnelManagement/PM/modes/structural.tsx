import React, { lazy, Suspense, useState, useEffect, useRef } from 'react';
import { Button, message, Modal, Row, Col, Spin } from 'antd';

import type { FormInstance } from 'antd/es/form';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

const FormArray = import.meta.glob('../components/**/*.form.tsx');
// [0], Object.entries(FormArray)[1]
const FormList = [...Object.entries(FormArray)].map(([key, val]) => {
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
  [key: string]: FormInstance | null | any;
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
  const { server, config: C } = useBasicConfiguration();
  //  api server
  const { PMPM: P } = server;
  // const { SYSTEM_DATA_SCOPE } = C?.DICT_TYPE || {};

  // 定义状态用于跟踪表单是否被修改
  const [isFormChanged, setIsFormChanged] = useState(false);

  const rowRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<FormRefProps>({});
  const [title] = useState<string>('项目');
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(openModal);
  const [menus, setMenus] = useState<MenusType>({});
  const [isCreate, setIsCreate] = useState<boolean>(false);

  const onReset = () => {
    if (loading) {
      message.warning(`数据提交中,请稍等...`);
      return;
    }
    Object.entries(formRef.current).map(async ([_, funs]) => {
      await (funs?.form?.resetFields && funs.form.resetFields());
    });

    rowRef.current && (rowRef.current.scrollTop = 0);
  };

  const handleOk = async () => {
    try {
      setLoading(true);
      let params: MenusType = {};
      let len = FormList.length;
      let isError = false;
      Object.entries(formRef.current).map(([_, funs]) => {
        const { key, sourceKey, form, transform } = funs || {};
        form
          ?.validateFields()
          .then((value: MenusType | MenusType[]) => {
            let v = transform ? transform(value) : value;
            if (Array.isArray(v)) {
              !key || key == '' ? (params = v) : (params[key] = v);
              if (sourceKey && menus.hasOwnProperty(sourceKey)) {
                // params[key] = [...menus[sourceKey], ...params[key]];
              }
            } else {
              !key || key == ''
                ? (params = { ...params, ...v })
                : (params[key] = { ...(params[key] || {}), ...v });

              if (sourceKey && menus.hasOwnProperty(sourceKey)) {
                params[key] = { ...menus[sourceKey], ...params[key] };
              }
            }

            len--;
            if (len === 0) SubmitEvent(params);
          })
          .catch(() => {
            setLoading(false);
            !isError && message.warning(`数据填写不完整,请完善!`);

            isError = true;
          });
      });
    } catch (errorInfo) {
      setLoading(false);
    }
  };

  const SubmitEvent = (params: MenusType) => {
    P[isCreate ? 'createProjectUnity' : 'updateProjectUnity']({ ...params })
      .then(() => {
        message.success('操作成功！');
        setLoading(false);
        onStateChange(false);
        setTimeout(onReset, 250);
      })
      .catch(() => {
        setLoading(false);
      });
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
      setMenus({ ...(!Object.entries(subForm).length ? {} : subForm) });
    } else {
      setIsFormChanged(false);
    }
  }, [openModal]);

  useEffect(() => {
    setIsCreate(!Object.entries(menus).length);
  }, [menus]);

  useEffect(() => {
    setMenus({ ...subForm });
  }, [subForm]);

  // 监听页面即将卸载事件
  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      if (isFormChanged) {
        // 当表单被修改时，提示用户是否需要刷新页面
        const confirmationMessage = '表单已经修改，确定要离开吗？';
        event.preventDefault();
        event.returnValue = confirmationMessage; // 兼容不同浏览器的提示信息
        return confirmationMessage; // 兼容不同浏览器的提示信息
      }
    };
    const handleUnload = (event: any) => {
      setIsFormChanged(false);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
    };
  }, [isFormChanged]);

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
      width={'78%'}
    >
      <Spin tip="数据提交中..." spinning={loading}>
        <Row
          ref={rowRef}
          style={{ maxHeight: '70vh', overflow: 'hidden auto', paddingInlineEnd: '15px' }}
        >
          {FormList.map((Item) => (
            <Col span={24} key={Item.label}>
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
              >
                <Item.Component
                  ref={(el: any) => (formRef.current[Item.label] = el)}
                  onFormChange={() => {
                    setIsFormChanged(true);
                  }}
                  subForm={{ ...menus }}
                />
              </Suspense>
            </Col>
          ))}
        </Row>
      </Spin>
    </Modal>
  );
};
export default AddProject;
