// M3U8Player.jsx - 修复 ref 和方法实现
import React, { forwardRef, useEffect, useRef, useImperativeHandle } from 'react';
import Hls from 'hls.js';

export default forwardRef((props, ref) => {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);

  useImperativeHandle(ref, () => ({
    // 修正：使用 videoRef 而不是传入的 ref
    playFullscreen: async () => {
      if (videoRef.current) {
        try {
          await videoRef.current.requestFullscreen();
          await videoRef.current.play();
        } catch (error) {
          console.error('Failed to enter fullscreen:', error);
        }
      }
    },
    // 添加一个公开的 play 方法
    play: () => {
      videoRef.current?.play();
    }
  }));

  useEffect(() => {
    const video = videoRef.current;
    
    // 清理之前的 HLS 实例
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    if (props.src) {
      if (Hls.isSupported()) {
        hlsRef.current = new Hls();
        hlsRef.current.loadSource(props.src);
        hlsRef.current.attachMedia(video);

        hlsRef.current.on(Hls.Events.MANIFEST_PARSED, () => {
          console.log('Manifest loaded, ready to play');
          // 尝试播放视频
          video.play().catch(error => {
            console.error('Auto-play prevented:', error);
            // 可以在这里提示用户点击播放
          });
        });

        hlsRef.current.on(Hls.Events.ERROR, (event, data) => {
          console.error('HLS error:', event, data);
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = props.src;
        video.addEventListener('loadedmetadata', () => {
          video.play().catch(error => {
            console.error('Auto-play prevented:', error);
          });
        });
      } else {
        console.error('HLS is not supported in this browser!');
      }
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [props.src]);

  return (
    <video
      ref={videoRef}
      controls
      style={{ width: '100%', height: '100%' }}
    />
  );
});