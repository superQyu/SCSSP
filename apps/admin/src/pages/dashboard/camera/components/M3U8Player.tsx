import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import Hls from 'hls.js';

const M3U8Player = forwardRef(({ src }, ref) => {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);

  // 暴露方法给父组件
  useImperativeHandle(ref, () => ({
    playFullscreen: async () => {
      const video = videoRef.current;

      // 检查是否已在全屏状态
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }

      // 尝试进入全屏
      if (video.requestFullscreen) {
        await video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        /* Safari */
        await video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        /* IE11 */
        await video.msRequestFullscreen();
      }
    },

    play: () => {
      videoRef.current.play();
    },

    pause: () => {
      videoRef.current.pause();
    },
  }));

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
    <video
      ref={videoRef}
      controls
      style={{ width: '100%', height: '100%' }}
    />
  );
});

export default M3U8Player;
