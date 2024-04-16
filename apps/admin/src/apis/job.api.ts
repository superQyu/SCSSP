import { ApiItem } from '@spms/web-request';
const MOCK = import.meta.env.VITE_APP_MOCK_API;

const job: ApiItem[] = [
  {
    key: 'getJobList',
    url: `${MOCK}/json-mock/jobList`,
    type: 'GET',
    name: '工种列表',
    description: '获取工种列表',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'code', cn: '编号' },
      { key: 'name', cn: '工种' },
      { key: 'initialsSpell', cn: '首字母简拼' },
      { key: 'isSpecialWorkType', cn: '是否特殊工种' },
    ],
  },
  {
    key: 'updateJob',
    url: `${MOCK}/json-mock/jobList`,
    type: 'PATCH',
    name: '工种详情',
    description: '编辑工种信息',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'code', cn: '编号' },
      { key: 'name', cn: '工种' },
      { key: 'initialsSpell', cn: '首字母简拼' },
      { key: 'isSpecialWorkType', cn: '是否特殊工种' },
      { key: 'sort', cn: '排序' },
    ],
  },
  {
    key: 'createJob',
    url: `${MOCK}/json-mock/jobList`,
    type: 'POST',
    name: '工种详情',
    description: '新建工种',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'code', cn: '编号' },
      { key: 'name', cn: '工种' },
      { key: 'initialsSpell', cn: '首字母简拼' },
      { key: 'isSpecialWorkType', cn: '是否特殊工种' },
      { key: 'sort', cn: '排序' },
    ],
  },
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
export default job;
