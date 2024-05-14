import { useState, lazy, Suspense, useRef } from 'react';
import { Flex, Button, message } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

import WorkerCom from './components/WorkerCom';
import type { ModesApi } from './modes/model';

type FormRefProps = {
  [key: string]: FormInstance | null | any;
};

type MenusType = {
  [key: string]: any;
};

const list = import.meta.glob('./components/**/*.form.tsx');
const FormList = Object.entries(list).map(([key, val]) => {
  const reg = /\.\/components\/(\d+)-(?<label>\w+)\.form\.tsx/;
  const { label } = key.match(reg)?.groups as { label: string };
  return {
    label,
    Component: lazy(val),
  };
});

export default () => {
  const { server } = useBasicConfiguration();
  const [loading, setLoading] = useState<boolean>(false);
  const formRef = useRef<FormRefProps>({});
  const workerRef = useRef<FormInstance>(null);
  const [workerType, setWorkerType] = useState<string>('');
  const [certificate, setCertificates] = useState<ModesApi.PersonnelCertificateSaveReqVO[]>([]);
  const { person: P } = server;

  // 点击确定按钮提交信息
  const handleOk = async () => {
    let params: MenusType = {};
    let len = FormList.length;
    setLoading(true);
    Object.entries(formRef.current).map(([_, funs]) => {
      const { key, form } = funs || {};
      form
        ?.validateFields()
        .then((value: MenusType) => {
          !key || key == ''
            ? (params = { ...params, ...value })
            : (params[key] = { ...(params[key] || {}), ...value });
          len--;

          if (len === 0) SubmitEvent(params);
        })
        .catch(() => {
          setLoading(false);
        });
    });
  };

  const SubmitEvent = async (params: MenusType) => {
    try {
      await P.createFullPersonInfo({
        ...params,
        personnelCertificateSaveReqVOS: certificate,
      });
      message.success('信息采集成功');
      resetForm();
    } catch {
      message.error('信息采集失败');
    } finally {
      setLoading(false);
    }
  };

  // 点击重置按钮
  const onReset = () => {
    if (loading) {
      message.warning(`数据提交中,请稍等...`);
      return;
    }
    resetForm();
  };

  //重置表单
  const resetForm = () => {
    Object.entries(formRef.current).map(([_, funs]) => {
      const { form, resetAll } = funs || {};
      form?.resetFields();
      resetAll && resetAll();
    });
    workerRef.current?.resetAll();
    setCertificates([]);
  };

  //接收证书信息
  const onSubmitCertificate = (data: MenusType[]) => {
    setCertificates(data);
    workerRef.current?.setFormModal(false);
  };

  return (
    <div className="h-full px-20px overflow-y-auto overflow-x-hidden bg-#fff">
      {FormList.map((Item) => {
        return (
          <Suspense fallback={<div>Loading...</div>} key={Item.label}>
            <Item.Component
              ref={(el: any) => (formRef.current[Item.label] = el)}
              openModel={(val: string) => {
                setWorkerType(val);
                workerRef?.current?.setFormModal(true);
              }}
            />
          </Suspense>
        );
      })}

      <Flex gap="middle" justify="center" className="py-10">
        <Button size="large" key="submit" type="primary" loading={loading} onClick={handleOk}>
          确定
        </Button>
        <Button size="large" key="reset" htmlType="reset" onClick={onReset} disabled={loading}>
          重置
        </Button>
      </Flex>

      <WorkerCom
        subForm={{
          workerType: workerType,
        }}
        ref={workerRef}
        onSubmit={(data) => onSubmitCertificate(data)}
      />
    </div>
  );
};
