import React, {
  cloneElement,
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Modal, Image } from 'antd';
import type { DescriptionsProps } from 'antd';
import type { FormInstance } from 'antd/es/form';
import dayjs from 'dayjs';
import { ProDescriptions } from 'components';
import SingleTitle from '@/components/SingleTitle';
import DictSelect from '@/components/DictSelect';

interface Props {
  /** 表单初始化 */
  subForm: {};
  /** 监听Modal状态变化 */
  onStateChange?: (state: boolean) => void;
}

const DetailForm: React.FC<Props> = forwardRef(({ subForm }: Props, ref) => {
  const [title] = useState<string>('查看轨迹区域');
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
