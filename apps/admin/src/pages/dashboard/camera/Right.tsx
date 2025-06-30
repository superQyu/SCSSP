import React, { useEffect, useState, useRef } from 'react';
import M3U8Player from './components/M3U8Player';
import { Spin } from 'antd';
import { FullscreenOutlined } from '@ant-design/icons';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import styled from 'styled-components';

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
const CustomSpin = styled(Spin)(() => ({}));

const App = (props: { code?: number }) => {
  // api 相关
  const { server, config } = useBasicConfiguration();
  const { monitor } = server;
  const playerRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState<string>();

  useEffect(() => {
    loadData();
  }, [props.code]);

  const loadData = async () => {
    if (props.code) {
      const res = await monitor.previewURLs({
        cameraIndexCode: props.code, //取的是列表中的cameraIndexCode字段值
        streamType: 1,
        transmode: 1,
        protocol: 'hls',
        expand: 'transcode=1&videotype=h264&resolution=1080p',
      });
      setVideoSrc(res);
    }
  };

  const handleFullscreen = async () => {
    if (playerRef.current) {
      await playerRef.current.playFullscreen();
    }
  };

  return (
    <CustomSpin
      className="w-full h-full pos-relative"
      wrapperClassName="w-full h-full"
      spinning={Boolean(!videoSrc)}
    >
      <Box className="w-full h-full">
        <M3U8Player ref={playerRef} src={videoSrc} />

        <div
          className="pos-absolute left-130px bottom-15px width-50px h-50px color-#fff font-size-20px  cursor-pointer  z-999 fullscreen"
          style={{}}
          onClick={handleFullscreen}
        >
          <FullscreenOutlined />
        </div>
      </Box>
    </CustomSpin>
  );
};

export default App;
