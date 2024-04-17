import { ApiItem } from '@spms/web-request';

const ADMIN_API = import.meta.env.VITE_APP_ADMIN_API;

const login: Record<string, ApiItem> = {
  adminLogin: {
    url: `${ADMIN_API}/system/auth/login`,
    type: 'POST',
    name: '用户登录',
    params: [
      {
        key: 'tenant-id', location: 'header', value: "1", valueAttrs: {
          value: "1"
        }
      },
      { key: 'username', cn: '用户名' },
      { key: 'password', cn: '密码' },
    ]
  },
  captcha: {
    url: '/api/v1/captcha',
    type: 'GET',
    name: '验证码',
    description: '获取验证码',
    params: [
      { key: 'height', cn: '图片高度' },
      { key: 'type', value: 'string', cn: '数据返回类型' },
    ],
  },
  login: {
    url: '/api/v1/login',
    type: 'POST',
    name: '用户登录',
    params: [
      { key: 'userName', cn: '用户名' },
      { key: 'password', cn: '密码' },
      { key: 'captcha', cn: '验证码' },
      { key: 'location', cn: '站点信息' },
    ],
  },
};
export default login;
