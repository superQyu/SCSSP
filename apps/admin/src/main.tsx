import './main.css';

import { ConfigProvider } from 'antd';
import { createRoot } from 'react-dom/client';
import { store, Provider } from 'store';

import { AuthContext, signIn, signOut, saveUserInfor, saveSiteInfor, saveDicts } from 'hooks';

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
    <AuthContext.Provider value={{ signIn, signOut, saveUserInfor, saveSiteInfor, saveDicts }}>
      {/* 消息提示 */}
      <SnackbarProvider>
        {/* 基础信息 */}
        <BasicConfigurationProvider>
          {/* antd 主题配置 */}
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#00a2fb',
                borderRadius: 6,
                // colorBgContainer: 'transparent',
                wireframe: false,
                sizeUnit: 4,
                sizeStep: 4,
                fontSize: 14,
                colorTextBase: '#000000',
                colorLink: '#1677ff',
                colorError: '#ff0000',
                colorWarning: '#ffa153',
                colorSuccess: '#67c23a',
                colorInfo: '#458fff',
              },
              components: {},
            }}
          >
            {/* <PermissionsProvider> */}
            <App />
            {/* </PermissionsProvider> */}
          </ConfigProvider>
        </BasicConfigurationProvider>
      </SnackbarProvider>
    </AuthContext.Provider>
  </Provider>
);
