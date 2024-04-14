import { ApiItem } from '@spms/web-request';
const MOCK = import.meta.env.VITE_APP_MOCK_API;

const user: ApiItem[] = [
  {
    key: 'siteInfor',
    url: '/api/v1/site/siteInfor',
    type: 'GET',
    name: '站点信息',
    description: '站点信息',
    // params: [{ key: 'Authorization', location: "header" }]
    params: [{ key: 'host' }, { key: 'protocol' }, { key: 'origin' }],
  },
  {
    key: 'test',
    url: `${MOCK}/json-mock/news`,
    type: 'GET',
    name: '测试',
    description: '测试',
  },
];
export default user;
