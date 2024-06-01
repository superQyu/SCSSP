import { useState, useEffect, useRef } from 'react';
import { Modal, Button, message } from 'antd';

import { type modalType } from '../models/model';

interface Props {
  /** 控制 Modal 是否显示 */
  openModal: boolean;
  /** 监听 Modal 状态变化 */
  onStateChange: ModalState.ModalStateChange<modalType>;
  // 当为详情表单时, 有该属性
  detail: Record<string, any>;
}

export default ({ openModal, onStateChange, detail }: Props) => {
  const [open, setOpen] = useState<boolean>(openModal);

  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  return (
    <>
      <Modal
        open={open}
        title="表单详情"
        // width={1000}
        footer={null}
        // maskClosable={false}
        onCancel={() => onStateChange({ state: false, type: 'formCreate' })}
      >
        <div className="color-red text-size-5">此处包裹一个form-create组件</div>
      </Modal>
    </>
  );
};
