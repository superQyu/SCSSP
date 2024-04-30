import { ApiItem } from '@spms/web-request';

const ADMIN_API = import.meta.env.VITE_APP_ADMIN_API;

const group: ApiItem[] = [
  {
    key: 'groupList',
    url: `${ADMIN_API}/wisdom/group-info/page`,
    type: 'GET',
    name: '班组列表',
    description: '获取班组列表',
    params: [{ key: 'Authorization', location: 'header' }],
  },
];
export default group;
