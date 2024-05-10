import React, { useState, useEffect, useRef } from 'react';
import { Button, InputNumber, message, Modal, DatePicker } from 'antd';
import type { GetProp, TreeSelectProps } from 'antd';

import { ExclamationCircleTwoTone } from '@ant-design/icons';
import type { FormInstance } from 'antd/es/form';

import dayjs from 'dayjs';

import DictSelect from '@/components/DictSelect';
import { AdForm, FormColumnsTypes } from 'components';

import { RebuildTree, flattenArray, sortMenu } from 'utils';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

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

const AddMenus: React.FC<Props> = ({ openModal, subForm, onStateChange }: Props) => {
  const { server } = useBasicConfiguration();
  const { vehicle: V } = server;
  const formRef = useRef<FormInstance>(null);
  const [title] = useState<string>('车辆信息');
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(openModal);

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

      V.vehicleApproveAdd(values)
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

  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);
  useEffect(() => {}, [subForm]);

  const columns: FormColumnsTypes[] = [
    {
      label: '车牌号',
      dataIndex: 'carNo',
      formItemProps: {
        rules: [{ required: true, message: '请输入车牌号' }],
      },
      colNum: 12,
    },
    {
      label: '行驶证号',
      dataIndex: 'carLicense',
      formItemProps: {
        rules: [{ required: true, message: '请输入行驶证号' }],
      },
      colNum: 12,
    },
    {
      label: '车辆品牌',
      dataIndex: 'carBrand',
      formItemProps: {
        rules: [{ required: true, message: '请输入车辆品牌' }],
      },
      colNum: 12,
    },
    {
      label: '车辆型号',
      dataIndex: 'carModel',
      formItemProps: {
        rules: [{ required: true, message: '请输入车辆型号' }],
      },
      colNum: 12,
    },
    {
      label: '车型',
      dataIndex: 'carType',
      formItem: <DictSelect dictKey={'cm_car_type'} />,
      formItemProps: {
        rules: [{ required: true, message: '请选择车型' }],
      },
      colNum: 12,
    },
    {
      label: '车辆颜色',
      dataIndex: 'carColor',
      formItemProps: {
        rules: [{ required: true, message: '请输入车辆颜色' }],
      },
      colNum: 12,
    },

    {
      label: '车辆识别代号/车架号',
      dataIndex: 'frameNo',

      formItemProps: {
        rules: [{ required: true, message: '请输入车辆识别代号/车架号' }],
      },
      colNum: 12,
    },
    {
      label: '发动机号',
      dataIndex: 'engineNo',

      formItemProps: {
        rules: [{ required: true, message: '请输入发动机号' }],
      },
      colNum: 12,
    },
    {
      label: '能源种类',
      dataIndex: 'energyType',
      formItem: <DictSelect dictKey={'cm_energy_type'} />,
      formItemProps: {
        rules: [{ required: true, message: '请输入能源种类' }],
      },
      colNum: 12,
    },
    {
      label: '核定载客',
      dataIndex: 'approvalSeats',
      formItem: <InputNumber min={1} style={{ width: '100%' }} placeholder="请输入核定载荷" />,
      formItemProps: {
        rules: [{ required: true, message: '请输入核定载客' }],
      },
      colNum: 12,
    },
    {
      label: '年审时间',
      dataIndex: 'examinedDate',
      formItem: <DatePicker className="w-full" format="YYYY-MM-DD" />,
      formItemProps: {
        getValueFromEvent: (...[, dateString]) => dateString,
        getValueProps: (value) => ({
          value: value ? dayjs(value) : undefined,
        }),
        rules: [{ required: true, message: '请选择年审时间' }],
      },
      colNum: 12,
    },
    {
      label: '保险时间',
      dataIndex: 'insuranceDate',
      formItem: <DatePicker className="w-full" format="YYYY-MM-DD" />,
      formItemProps: {
        getValueFromEvent: (...[, dateString]) => dateString,
        getValueProps: (value) => ({
          value: value ? dayjs(value) : undefined,
        }),
        rules: [{ required: true, message: '请选择保险时间' }],
      },
      colNum: 12,
    },
  ];

  return (
    <Modal
      width={'50%'}
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
      <AdForm
        key={`${JSON.stringify(subForm)}`}
        loadingTitle="提交中..."
        formRef={formRef}
        loading={loading}
        labelAlign="left"
        onFormChange={onFormChange}
        columns={columns}
      />
    </Modal>
  );
};
export default AddMenus;
