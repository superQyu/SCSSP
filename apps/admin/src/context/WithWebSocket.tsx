import React, { useEffect, useState } from 'react';

import { getToken, TOKEN } from 'utils';
import { useAppSelector, useAppDispatch } from 'hooks';
import { setWebsocket } from 'store';

const SocketPath = import.meta.env.VITE_WEBSOCKET_PATH;

type Props = {
  socket: WebSocket | null;
};
const withWebSocket = (
  WrappedComponent: React.ComponentType<Props>,
  url?: string
) => {
  return () => {
    const { site } = useAppSelector((state) => state);
    const { websocket } = site;
    const dispatch = useAppDispatch();
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
      const ws = new WebSocket(
        `${url || SocketPath}?token=${getToken(TOKEN)}`
      );
      setSocket(ws);

      ws.onopen = () => console.log('WebSocket connected');
      ws.onmessage = (message: any) => {
        const { type, content } = JSON.parse(message.data);
        if (content == '"fresh"') {
          dispatch(
            setWebsocket({
              ...websocket,
              [type]: websocket[type] + 1,
            })
          );
        }
      };
      ws.onerror = (error) =>
        console.log('WebSocket error:', error);
      ws.onclose = () => console.log('WebSocket disconnected');

      return () => {
        ws.close();
      };
    }, []);

    return <WrappedComponent socket={socket} />;
  };
};

export default withWebSocket;
