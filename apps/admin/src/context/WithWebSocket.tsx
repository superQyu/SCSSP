import React, { useEffect, useState } from 'react';
import { getToken, TOKEN } from 'utils';

const SocketPath = import.meta.env.VITE_WEBSOCKET_PATH;

type Props = {
  socket: WebSocket | null;
};

const withWebSocket = (WrappedComponent: React.ComponentType<Props>, url?: string) => {
  return () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    // useEffect(() => {
    //   const ws = new WebSocket(`${url || SocketPath}?token=${getToken(TOKEN)}`);
    //   setSocket(ws);

    //   ws.onopen = () => console.log('WebSocket connected');
    // //   ws.onmessage = (message) => console.log('Received message:', message.data);
    //   ws.onerror = (error) => console.log('WebSocket error:', error);
    //   ws.onclose = () => console.log('WebSocket disconnected');

    //   return () => {
    //     ws.close();
    //   };
    // }, []);

    return <WrappedComponent socket={socket} />;
  };
};

export default withWebSocket;
