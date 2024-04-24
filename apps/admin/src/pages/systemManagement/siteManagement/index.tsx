import { useState, useRef, useEffect, createRef } from 'react';
import { Col, Row, Flex, Button, message, Upload } from 'antd';
import type { GetProp, UploadProps, UploadFile } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd/es/form';

import { AdForm } from 'components';
import FunctionCom from './components/function';
import UploadFileCom from './components/uploadFile';
import styles from './index.module.scss';
import siteModel from './modes/info.model';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import type { ModesApi } from './modes/model';

export default () => {
  const { server } = useBasicConfiguration();
  const [loading, setLoading] = useState<boolean>(false);
  const [menus, setMenus] = useState<any>({});
  const { infoColumns, entryColumns, workTypeColumns } = siteModel();

  const infoRef = useRef<FormInstance>(null);
  const entryRef = useRef<FormInstance>(null);
  const workTypeRef = useRef<FormInstance>(null);
  const imgsRef = useRef<FormInstance>(null);
  const functionRef = useRef<FormInstance>(null);

  const { person: P } = server;
  const [otherInfo, setOtherInfo] = useState<any>({});
  const [certificate, setCertificates] = useState<ModesApi.PersonnelCertificateSaveReqVO[]>([]);

  // 点击确定按钮提交信息
  const handleOk = async () => {
    const [infoValue, workTypeValue, entfyValue] = await Promise.all([
      infoRef.current?.validateFields(),
      workTypeRef.current?.validateFields(),
      entryRef.current?.validateFields(),
    ]);
    // setLoading(true);
    console.log('参数1', { ...infoValue, ...workTypeValue, ...otherInfo });
    console.log('参数2', certificate);
    console.log('参数3', entfyValue);
    return;
    try {
      await P.createFullPersonInfo({
        personnelInfoSaveReqVO: { ...infoValue, ...workTypeValue, ...otherInfo },
        personnelCertificateSaveReqVO: certificate,
        entryInfoSaveReqVO: entfyValue,
      });
      message.success('信息采集成功');
    } catch {
      message.error('信息采集失败');
    } finally {
      resetForm();
      setLoading(false);
    }
  };

  //接收证书信息
  const onSubmitCertificate = (data: ModesApi.PersonnelCertificateSaveReqVO[]) => {
    setCertificates(data);
    functionRef.current?.setFormModal(false);
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
    infoRef.current?.resetFields();
    workTypeRef.current?.resetFields();
    entryRef.current?.resetFields();
    imgsRef?.current?.resetAll();
    functionRef.current?.resetAll();
    setOtherInfo({});
  };

  // 修改所属工种
  const handleModalStateChange = (any) => {
    console.log('修改所属工种', { ...otherInfo, ...any });
    setOtherInfo({ ...otherInfo, ...any });
  };

  return (
    <div className="px-10 bg-#fff">
      <div className={styles.infoTitle}>基本信息</div>
      <Row gutter={16}>
        <Col className="gutter-row" span={4}>
          <Flex justify="center" align="center" className="h-full">
            <div>
              <UploadFileCom
                ref={imgsRef}
                maxNo={1}
                callback={(url: string) =>
                  setOtherInfo({
                    ...otherInfo,
                    passportPhoto: url,
                  })
                }
              />
            </div>
          </Flex>
        </Col>
        <Col className="gutter-row" span={20}>
          <AdForm
            layout="horizontal"
            formRef={infoRef}
            initialValues={{ ...menus }}
            columns={infoColumns}
          />
        </Col>
      </Row>

      <div className={styles.infoTitle}>
        所属工种
        <span>红色为特殊工种，需要维护证件信息</span>
      </div>
      <Row gutter={8}>
        <Col className="gutter-row" span={8}>
          <AdForm
            layout="horizontal"
            formRef={workTypeRef}
            columns={workTypeColumns}
            onFormChange={(changedValues) => {
              setOtherInfo({
                ...otherInfo,
                ...changedValues,
              });
            }}
          />
        </Col>
        <Col className="gutter-row" span={16}>
          <Button
            className="pos-absolute"
            type="link"
            onClick={() => {
              if (!otherInfo.workerType) {
                message.warning('请先选择工人类型');
              } else {
                functionRef.current?.setFormModal(true);
              }
            }}
          >
            修改信息
          </Button>
        </Col>
      </Row>

      <div className={styles.infoTitle}>
        进场信息
        <span>首先录入班组长（是否班组长选【是】），再录入其他工人</span>
      </div>
      <AdForm
        layout="horizontal"
        formRef={entryRef}
        initialValues={{ ...menus }}
        columns={entryColumns}
      />

      <Flex gap="middle" justify="center" className="py-10">
        <Button size="large" key="submit" type="primary" loading={loading} onClick={handleOk}>
          确定
        </Button>
        <Button size="large" key="reset" htmlType="reset" onClick={onReset} disabled={loading}>
          重置
        </Button>
      </Flex>

      <FunctionCom
        ref={functionRef}
        subForm={otherInfo}
        onStateChange={handleModalStateChange}
        onSubmit={(data) => onSubmitCertificate(data)}
      />
    </div>
  );
};
