import { useState, useRef, useEffect } from 'react';
import { Card, Drawer, Flex } from 'antd';
import styled from 'styled-components';
import { FullscreenOutlined } from '@ant-design/icons';

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

const Box = styled.div`
  .fullscreen {
    opacity: 0;
  }
  &:hover {
    .fullscreen {
      opacity: 1;
    }
  }
`;

export default () => {
  const [visible, setVisible] = useState(false);
  const [code, setCode] = useState('');
  const rightRef = useRef(null); // 引用Right组件的容器
  const playerRef = useRef(null);
  const handleMouseEnter = () => {
    setVisible(true);
  };

  const handleMouseLeave = (e) => {
    if (!rightRef.current?.contains(e.relatedTarget)) {
      setVisible(false);
    }
  };

  const handleFullscreen = async () => {
    if (playerRef.current) {
      playerRef.current.playFullscreen();
    }
  };

  // 关闭抽屉
  const onClose = () => {
    setVisible(false);
  };

  return (
    <Box className="custom-drawer-container relative h-full ">
      <div
        className="pos-absolute left-20px bottom-10px width-50px h-30px color-#fff font-size-20px  cursor-pointer  z-9999 fullscreen"
        onClick={handleFullscreen}
      >
        <FullscreenOutlined />
      </div>
      <div
        ref={rightRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="right-container relative  overflow-hidden"
      >
        <Right code={code} playerRef={playerRef} />

        <CustomDrawer
          placement="right"
          visible={visible}
          onClose={onClose}
          width={280}
          mask={false}
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
    </Box>
  );
};
