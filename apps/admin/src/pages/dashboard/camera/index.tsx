import { useState, useRef, useEffect } from 'react';
import { Card, Drawer, Flex } from 'antd';
import styled from 'styled-components';

import Left from './Left';
import Right from './Right';

const CustomDrawer = styled(Drawer)(() => ({
  '.ant-drawer-header': {
    display: 'none',
  },
  '.ant-drawer-body': {
    paddingBlock: '0px',
  },
}));
export default () => {
  const [visible, setVisible] = useState(false);
  const [code, setCode] = useState('');
  const rightRef = useRef(null); // 引用Right组件的容器

  const handleMouseEnter = () => {
    setVisible(true);
  };

  const handleMouseLeave = (e) => {
    if (!rightRef.current?.contains(e.relatedTarget)) {
      setVisible(false);
    }
  };

  // 关闭抽屉
  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="custom-drawer-container relative h-full">
      <div
        ref={rightRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="right-container relative w-full h-full overflow-hidden"
      >
        <Right code={code} />

        <CustomDrawer
          placement="right"
          visible={visible}
          onClose={onClose}
          width={280}
          getContainer={false}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            height: '100%',
            zIndex: 10,
            overflow: 'auto',
          }}
        >
          <Left onSelect={(id) => setCode(id)} />
        </CustomDrawer>
      </div>
    </div>
  );
};
