import React, { useEffect, useState } from 'react';
import M3U8Player from './components/M3U8Player';
// api 相关
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

const App = (props: { code?: number }) => {
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
    <div>
      <M3U8Player src={videoSrc} />
    </div>
  );
};

export default App;
