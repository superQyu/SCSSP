import { ApiItem } from '@spms/web-request';

const user: ApiItem[] = [
  {
    key: 'userInfor',
    url: '/api/v1/admin/system/getInfo',
    type: 'GET',
    name: '用户信息',
    description: '获取用户信息',
    params: [{ key: 'Authorization', location: 'header' }],
  },
  {
    key: 'getRoute',
    url: '/api/v1/admin/system/getRoute',
    type: 'GET',
    name: '菜单列表',
    description: '获取菜单列表',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'siteKey', cn: '站点标识' },
      { key: 'name', cn: '菜单名称' },
      { key: 'isDelete', cn: '菜单状态' },
    ],
  },
];
export default user;
