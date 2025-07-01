import React, { useEffect, useState, useRef } from 'react';
import M3U8Player from './components/M3U8Player';
import { Spin } from 'antd';
import { FullscreenOutlined } from '@ant-design/icons';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import styled from 'styled-components';

const Box = styled.div`
  // .fullscreen {
  //   opacity: 1;
  // }
  // &:hover {
  //   .fullscreen {
  //     opacity: 1;
  //   }
  // }
`;
const CustomSpin = styled(Spin)(() => ({}));

const App = (props: {
  code?: number | string;
  playerRef?: any;
}) => {
  // api 相关
  const { server, config } = useBasicConfiguration();
  const { monitor } = server;

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

  return (
    <CustomSpin
      className="w-full h-full"
      wrapperClassName="w-full h-full"
      spinning={Boolean(!videoSrc)}
    >
      <div className="w-full h-full">
        <M3U8Player ref={props.playerRef} src={videoSrc} />
      </div>
    </CustomSpin>
  );
};

export default App;
