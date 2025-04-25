import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const M3U8Player = ({ src }) => {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);

  useEffect(() => {
    if (src) {
      const video = videoRef.current;

      if (Hls.isSupported()) {
        // 如果浏览器支持 HLS
        hlsRef.current = new Hls();
        hlsRef.current.loadSource(src);
        hlsRef.current.attachMedia(video);

        hlsRef.current.on(Hls.Events.MANIFEST_PARSED, () => {
          console.log('Manifest loaded, ready to play');
          video.play();
        });

        hlsRef.current.on(Hls.Events.ERROR, (event, data) => {
          console.error('HLS error:', event, data);
        });
      } else if (
        video.canPlayType('application/vnd.apple.mpegurl')
      ) {
        // 对于 Safari 浏览器，原生支持 .m3u8
        video.src = src;
        video.addEventListener('loadedmetadata', () => {
          video.play();
        });
      } else {
        console.error('HLS is not supported in this browser!');
      }
    }

    // 清理 HLS 实例
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [src]);

  return (
    <div>
      <video
        ref={videoRef}
        controls
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
  );
};

export default M3U8Player;
