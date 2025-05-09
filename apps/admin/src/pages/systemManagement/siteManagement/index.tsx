import {
  useState,
  lazy,
  Suspense,
  useRef,
  useEffect,
} from 'react';
import { Flex, Button, message } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import { useLocation, useSearchParams } from 'react-router-dom';

import WorkerCom from './components/WorkerCom';
import type { ModesApi } from './modes/model';
import { useRoute } from 'hooks';

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
    Component: lazy(val as () => Promise<any>),
  };
});
console.log('组件列表', FormList);

export default () => {
  const { tabNavigate, deleteTab } = useRoute();
  const [routerParams] = useSearchParams();
  const { server } = useBasicConfiguration();
  const [loading, setLoading] = useState<boolean>(false);
  const formRef = useRef<FormRefProps>({});
  const workerRef = useRef<FormInstance>(null);
  const [workerType, setWorkerType] = useState<string>('');
  /** 证书相关信息 */
  // const [certificate, setCertificates] = useState<
  //   ModesApi.PersonnelCertificateSaveReqVO[]
  // >([]);
  const certificate = useRef<any>([]);
  const setCertificates = (arr: any[]) => {
    certificate.current = arr;
  };
  // 详情数据
  const [detail, setDetail] = useState<any>({});
  /** 额外的参数，主要是人员的工种(workTypeId)或职位(jobCategory) */
  const [extraParam, setExtraParam] = useState<any>({});
  // api 相关
  const { person: P, certificate: C } = server;

  useEffect(() => {
    const id = routerParams.get('id');
    // console.log('id', id);
    if (id) getDetail(id);
  }, [routerParams]);

  const getDetail = async (id: any) => {
    const res = await C.getPersonInfoDetail({ id });
    // console.log('res', res);
    setDetail(res);
  };

  //接收证书信息
  const onSubmitCertificate = (data: any) => {
    console.log('证书表单带出的数据', data);
    const obj: Record<string, any> = {};
    const res: [string, any] | undefined =
      Object.entries(data)?.at(-1);
    res && (obj[res?.[0]] = res?.[1]);
    // console.log('额外参数', obj);
    setExtraParam(obj);
    setCertificates(data.certificate);
    workerRef.current?.setFormModal(false);
  };

  // 点击确定按钮提交信息
  const handleOk = async () => {
    let params: MenusType = {};
    let len = FormList.length;
    let isError = false;
    // 先把证书信息加上来
    formRef.current['certificate'].handleOk();
    setLoading(true);
    // console.log('workerRef.current?.form', workerRef.current);

    Object.entries(formRef.current).forEach(([_, funs]) => {
      const { key, form } = funs || {};
      form
        ?.validateFields()
        .then((value: MenusType) => {
          !key || key == ''
            ? (params = { ...params, ...value })
            : (params[key] = {
                ...(params[key] || {}),
                ...value,
              });
          len--;

          // 因为要跳过证书的校验,所以是1,而不是 0
          if (len === 1) {
            const ifCertificate =
              formRef.current['function'].workerListForm
                .ifCertificate;
            // console.log('是否必须上传证书', ifCertificate);
            console.log('证书相关信息', certificate.current);
            if (
              ifCertificate &&
              certificate.current.length == 0
            ) {
              setLoading(false);
              !isError &&
                message.warning(
                  `当前人员属于特殊工种,请上传证书`
                );
              isError = true;
            } else {
              SubmitEvent(params);
            }
          }
        })
        .catch((error: any) => {
          setLoading(false);
          console.log('表单提交错误信息', error);
          !isError && message.warning(`数据填写不完整,请完善!`);
          isError = true;
        });
    });
    // goBack();
  };

  // 返回列表页面
  const goBack = () => {
    const id = routerParams.get('id');
    if (id) {
      deleteTab(`人员详情${id}`, false);
      tabNavigate({
        namePath: '项目人员管理/信息管理',
        routePath: '/PM/IM',
      });
    } else {
      deleteTab(`信息采集`, false);
      tabNavigate({
        namePath: '项目人员管理/信息管理',
        routePath: '/PM/IM',
      });
    }
  };

  const SubmitEvent = async (params: MenusType) => {
    // console.log('extraParam', extraParam);
    params.personnelInfoSaveReqVO = {
      ...params.personnelInfoSaveReqVO,
      // ...extraParam,
      id: detail.personnelInfoRespVO?.id,
      passportPhoto:
        params.personnelInfoSaveReqVO?.passportPhoto?.join('@'),
    };
    console.log(
      '信息采集的最终表单信息',
      params,
      certificate.current
    );
    params.entryInfoSaveReqVO = {
      ...params.entryInfoSaveReqVO,
      id: detail.entryInfoRespVO?.id,
      userId: detail.entryInfoRespVO?.userId,
    };
    try {
      await P[
        routerParams.get('id')
          ? 'updateFullPersonInfo'
          : 'createFullPersonInfo'
      ]({
        ...params,
        personnelCertificateSaveReqVOS: certificate.current,
      });
      message.success('信息采集成功');
      resetForm();
      goBack();
    } catch (error: any) {
      message.error('信息采集失败');
      throw new Error(error.message);
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

  return (
    <div className="h-full pl-20px pr-100px overflow-y-auto overflow-x-hidden bg-#fff">
      {FormList.map((Item) => {
        return (
          <Suspense
            fallback={<div>Loading...</div>}
            key={Item.label}
          >
            <Item.Component
              ref={(el: any) =>
                (formRef.current[Item.label] = el)
              }
              openModel={(val: string) => {
                // console.log('当前选择的工人类型', val);
                setWorkerType(val);
                workerRef?.current?.setFormModal(true);
              }}
              detail={detail}
              server={server}
              otherFormRef={formRef}
              subForm={{
                workerType: workerType,
              }}
              onSubmit={(data) => onSubmitCertificate(data)}
            />
          </Suspense>
        );
      })}

      <Flex gap="middle" justify="center" className="py-10">
        <Button
          size="large"
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleOk}
        >
          确定
        </Button>
        {/* {Object.keys(detail).length ? (
          <Button
            size="large"
            key="reset"
            htmlType="reset"
            onClick={goBack}
            disabled={loading}
          >
            取消
          </Button>
        ) : (
          <Button
            size="large"
            key="reset"
            htmlType="reset"
            onClick={onReset}
            disabled={loading}
          >
            重置
          </Button>
        )} */}
        <Button
          size="large"
          key="cancle"
          htmlType="reset"
          onClick={goBack}
          disabled={loading}
        >
          取消
        </Button>
        <Button
          size="large"
          key="reset"
          htmlType="reset"
          onClick={onReset}
          disabled={loading}
        >
          重置
        </Button>
      </Flex>

      {/* <WorkerCom
        subForm={{
          workerType: workerType,
        }}
        ref={workerRef}
        onSubmit={(data) => onSubmitCertificate(data)}
        detail={detail}
      /> */}
    </div>
  );
};
