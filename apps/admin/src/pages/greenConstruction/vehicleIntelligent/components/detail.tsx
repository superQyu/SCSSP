import React, { useState, useEffect, useRef } from 'react';
import { Input, Modal, Image } from 'antd';
import { styled } from 'styled-components';
import type { FormInstance } from 'antd/es/form';

import DictSelect from '@/components/DictSelect';
import { AdForm, FormColumnsTypes } from 'components';

interface Props {
  /** 控制 Modal 是否显示 */
  openModal: boolean;
  /** 表单初始化 */
  subForm: {};
  /** 监听Modal状态变化 */
  onStateChange?: (state: boolean) => void;
}

const CustomTitle = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  &::before {
    content: '';
    display: inline-block;
    width: 7px;
    height: 17px;
    margin-right: 6px;
    background: #3662ec;
    border-radius: 4px;
  }
`;

const DetailForm: React.FC<Props> = ({ openModal, subForm }: Props) => {
  const formRef = useRef<FormInstance>(null);
  const [title] = useState<string>('详情');
  const [open, setOpen] = useState<boolean>(openModal);

  const handleCancel = () => {
    setOpen(false);
    formRef.current?.resetFields();
  };

  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);
  useEffect(() => {}, [subForm]);

  const columns: FormColumnsTypes[] = [
    {
      label: '编号',
      dataIndex: 'id',
      formItem: <Input disabled />,
      colNum: 12,
    },
    {
      label: '车牌号',
      dataIndex: 'carNo',
      formItem: <Input disabled />,
      colNum: 12,
    },
    {
      label: '车辆颜色',
      dataIndex: 'carColor',
      formItem: <Input disabled />,
      colNum: 12,
    },
    {
      label: '车型',
      dataIndex: 'carType',
      formItem: (
        <div
          className="color-#b8b8b8 bg-#f5f5f5 px-11px py-4px border-rd-6px"
          style={{ border: '1px solid #d9d9d9' }}
        >
          {subForm.carType ? (
            <DictSelect type={'text'} value={subForm.carType} dictKey={'cm_car_type'} />
          ) : (
            '-'
          )}
        </div>
      ),
      colNum: 12,
    },
    {
      label: '报警时间',
      dataIndex: 'alarmTime',
      formItem: <Input disabled />,
      colNum: 12,
    },
    {
      label: '报警类型',
      dataIndex: 'alarmType',
      formItem: (
        <div
          className="color-#b8b8b8 bg-#f5f5f5 px-11px py-4px border-rd-6px"
          style={{ border: '1px solid #d9d9d9' }}
        >
          {subForm.alarmType ? (
            <DictSelect type={'text'} value={subForm.alarmType} dictKey={'cm_car_type'} />
          ) : (
            '-'
          )}
        </div>
      ),
      colNum: 12,
    },

    {
      label: '报警内容',
      dataIndex: 'alarmContent',
      formItem: <textarea disabled className="w-full" />,
      formItemProps: {
        labelCol: { span: 3 },
        wrapperCol: { span: 21, flex: 1 },
      },
      colNum: 24,
    },
    {
      label: '处理人',
      dataIndex: 'disposeUserName',
      formItem: <Input disabled />,
      colNum: 12,
    },

    {
      label: '处理时间',
      dataIndex: 'disposeTime',
      formItem: <Input disabled />,
      colNum: 12,
    },
    {
      label: '处理内容',
      dataIndex: 'disposeContent',
      formItem: <textarea disabled className="w-full" />,
      formItemProps: {
        labelCol: { span: 3 },
        wrapperCol: { span: 21, flex: 1 },
      },
      colNum: 24,
    },
  ];

  return (
    <Modal
      width={'50%'}
      open={open}
      title={title}
      maskClosable={false}
      footer={[]}
      onCancel={handleCancel}
    >
      {subForm.snapPicture && (
        <>
          <CustomTitle>抓拍图片</CustomTitle>
          <Image width={200} src={subForm.snapPicture} />
        </>
      )}

      <CustomTitle>基本信息</CustomTitle>
      <AdForm
        key={`${JSON.stringify(subForm)}`}
        loadingTitle="提交中..."
        formRef={formRef}
        labelAlign="left"
        columns={columns}
        initialValues={subForm}
      />
    </Modal>
  );
};
export default DetailForm;
