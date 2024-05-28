import React, { useState, useEffect, useRef } from 'react';
import { Button, message, Modal } from 'antd';
import type { FormInstance } from 'antd/es/form';
import styled from 'styled-components';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import { AdForm, FormColumnsTypes } from 'components';
import MapServer from '@/components/React-BMapGL';

interface Props {
  /** 控制 Modal 是否显示 */
  openModal: boolean;
  /** 表单初始化 */
  subForm: {};
  /** 监听Modal状态变化 */
  onStateChange: (state: boolean) => void;
}

type MenusType = {
  [key: string]: any;
};

const MapDiv = styled.div`
  .BMapGLLib_marker,
  .BMapGLLib_circle {
    display: none;
  }
`;

const AddMenus: React.FC<Props> = ({ openModal, subForm, onStateChange }: Props) => {
  const { server } = useBasicConfiguration();
  const { vehicle: V } = server;
  const formRef = useRef<FormInstance>(null);
  const [title] = useState<string>('新增轨迹区域');
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(openModal);
  const mapRef = useRef();
  const [center, setCenter] = useState<Unlimit>({
    lng: 120.31224857818925,
    lat: 31.495985112865068,
  });
  const [zoom, _] = useState<number>(17);

  const onReset = () => {
    if (loading) {
      message.warning(`数据提交中,请稍等...`);
      return;
    }
    formRef.current?.resetFields();
  };

  const handleOk = async () => {
    try {
      const values: MenusType = await formRef.current?.validateFields();
      setLoading(true);

      V.createTrack(values)
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

  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);
  useEffect(() => {}, [subForm]);

  const columns: FormColumnsTypes[] = [
    {
      label: '区域名称',
      dataIndex: 'name',
      colNum: 24,
      formItemProps: {
        rules: [{ required: true, message: '请输入区域名称' }],
      },
    },
    {
      label: '轨迹范围',
      dataIndex: 'points',
      colNum: 24,
      formItemProps: {
        rules: [{ required: true, message: '请绘制轨迹范围' }],
      },
      formItem: (
        <div className="w-full h-500px">
          <MapServer
            ref={mapRef}
            center={{ ...center }}
            style={{ position: 'relative', height: 'calc(100%)' }}
            zoom={zoom}
            // 画图工具
            DrawingManager={{
              isEnabled: true,
              style: { position: 'absolute', left: 0, top: 0, width: 360 },
              enableLimit: false,
              limitOptions: { area: 5000, distance: 30 },
              enableCalculate: true,
              onOverlaycomplete: (e: Event) => {
                const points = e
                  .map(({ lng, lat }: { lng: string; lat: string }) => `${lng},${lat}`)
                  .join(';');
                formRef.current?.setFieldValue('points', points);
                // 获取合理的中心点
                // const centerPoint = map.getViewport(points)

              },
            }}
            graphicDraw={{}}
          ></MapServer>
        </div>
      ),
    },
  ];

  return (
    <Modal
      width={'1000px'}
      open={open}
      title={title}
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
      <MapDiv>
        <AdForm
          key={`${JSON.stringify(subForm)}`}
          loadingTitle="提交中..."
          formRef={formRef}
          loading={loading}
          labelAlign="left"
          columns={columns}
          layoutStyle={{
            labelCol: { span: 3 },
            wrapperCol: { span: 20, flex: 1 },
          }}
        />
      </MapDiv>
    </Modal>
  );
};
export default AddMenus;
