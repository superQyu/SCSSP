import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Modal } from 'antd';

interface Props {
  /** 表单初始化 */
  subForm: {};
  /** 监听Modal状态变化 */
  onStateChange?: (state: boolean) => void;
}

const DetailForm: React.FC<Props> = forwardRef(({ subForm }: Props, ref) => {
  const [title] = useState<string>('查看车辆轨迹');
  const [open, setOpen] = useState<boolean>(false);

  const handleCancel = () => {
    setOpen(false);
  };

  const initData = () => {};

  useEffect(() => {
    initData();
  }, [subForm]);

  useImperativeHandle(ref, () => ({
    openModal: (openModal: boolean) => setOpen(openModal),
  }));

  return (
    <Modal width={'50%'} open={open} title={title} maskClosable={false} onCancel={handleCancel}>
      地图
    </Modal>
  );
});
export default DetailForm;
