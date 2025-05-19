import react from '@vitejs/plugin-react';
import UnoCSS from 'unocss/vite';
import {
  defineConfig,
  UserConfig,
  ConfigEnv,
  loadEnv,
} from 'vite';
import vitePluginCompression from 'vite-plugin-compression';
import { dirname, basename, resolve } from 'path';

// 获取当前项目根目录
const baseUrl = basename(dirname(__filename));

// 配置别名
const alias: Record<string, string> = {
  '@': `${resolve(process.cwd(), 'src')}`,
  '*': resolve(''),
};

export default defineConfig(
  ({ mode }: ConfigEnv): UserConfig => {
    const env = loadEnv(mode, process.cwd());
    return {
      plugins: [
        UnoCSS(),
        react(),
        vitePluginCompression({
          threshold: 1024 * 10, // 对大于 10kb 的文件进行压缩
          // deleteOriginFile: true,
        }),
      ],
      resolve: { alias },
      server: {
        host: env.VITE_APP_IP,
        port: Number(env.VITE_APP_PORT),
        open: false,
        proxy: {
          [env.VITE_APP_ADMIN_API]: {
            // target: 'http://localhost:48083',
            target: 'http://112.35.146.10:48083',
            // target: 'http://192.168.10.72:48083',
            secure: false,
            // bypass(req, res, options: any) {
            //   const proxyURL =
            //     options.target + options.rewrite(req.url);
            //   console.log('客户端请求的真正地址：', proxyURL);
            //   res.setHeader('REAL-URL', proxyURL); // 设置响应头在浏览器中可见
            // },
          },
          [env.VITE_APP_BASE_API]: {
            target: 'http://192.168.10.26:7001',
            secure: false,
          },
          [env.VITE_APP_MOCK_API]: {
            target: 'http://localhost:3001',
            secure: false,
            rewrite: (path) =>
              path.replace(`${env.VITE_APP_MOCK_API}`, ''),
          },
          '/static': {
            target: 'http://192.168.142.133:9000',
            secure: false,
            rewrite: (path) => path.replace(/^\/static/, ''),
          },
          '/monitor': {
            target: 'http://58.214.33.54:8081',
            secure: false,
            // rewrite: (path) => path.replace(/^\/monitor/, ''),
          },
        },
      },
      base: mode === 'development' ? '/' : `../${baseUrl}/`,
      build: {
        outDir: `${dirname(__filename).replace(`apps`, 'dist')}`,
        assetsInlineLimit: 4096, // 资源内联的阈值（以字节为单位）
        rollupOptions: {
          output: {
            chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
            entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
            assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
            manualChunks(id) {
              if (id.includes('node_modules')) {
                return id
                  .toString()
                  .split('node_modules/')[1]
                  .split('/')[0]
                  .toString();
              }
            },
          },
        },
        minify: 'terser',
        terserOptions: {
          compress: {
            drop_console: false,
            drop_debugger: false,
          },
        },
      },
    };
  }
);
