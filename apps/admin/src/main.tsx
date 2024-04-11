import './main.css';

import { ConfigProvider } from 'antd';
import { createRoot } from 'react-dom/client';
import { store, Provider } from 'store';

import { AuthContext, signIn, signOut, saveUserInfor, saveSiteInfor } from 'hooks';

// eslint-disable-next-line import/no-unresolved
import 'virtual:uno.css';

// Load global configuration items
import { BasicConfigurationProvider } from '@/context/BasicConfigurationContext';
import { SnackbarProvider } from '@/context/SnackbarContext';

import App from './app';

const root = createRoot(document.getElementById('root') as HTMLDivElement);
root.render(
  // 状态管理
  <Provider store={store}>
    <AuthContext.Provider value={{ signIn, signOut, saveUserInfor, saveSiteInfor }}>
      {/* 消息提示 */}
      <SnackbarProvider>
        {/* 基础信息 */}
        <BasicConfigurationProvider>
          {/* antd 主题配置 */}
          <ConfigProvider theme={{ token: { colorPrimary: 'pink' } }}>
            {/* <PermissionsProvider> */}
            <App />
            {/* </PermissionsProvider> */}
          </ConfigProvider>
        </BasicConfigurationProvider>
      </SnackbarProvider>
    </AuthContext.Provider>
  </Provider>
);
