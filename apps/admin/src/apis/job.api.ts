import { ApiItem } from '@spms/web-request';
const ADMIN_API = import.meta.env.VITE_APP_ADMIN_API;

const job: ApiItem[] = [
  {
    key: 'getJobList',
    url: `${ADMIN_API}/wisdom/work-type-info/page`,
    type: 'GET',
    name: '工种管理',
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
    key: 'createJob',
    url: `${ADMIN_API}/wisdom/work-type-info/create`,
    type: 'POST',
    name: '工种管理',
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
    key: 'updateJob',
    url: `${ADMIN_API}/wisdom/work-type-info/update`,
    type: 'PUT',
    name: '工种管理',
    description: '编辑工种信息',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'id', cn: '数据库键' },
      { key: 'code', cn: '编号' },
      { key: 'name', cn: '工种' },
      { key: 'initialsSpell', cn: '首字母简拼' },
      { key: 'isSpecialWorkType', cn: '是否特殊工种'},
      { key: 'sort', cn: '排序' },
    ],
  },
  {
    key: 'deleteJob',
    url: `${ADMIN_API}/wisdom/work-type-info/delete`,
    type: 'DELETE',
    name: '工种管理',
    description: '删除工种信息',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'id', cn: '数据库键' },
    ],
  },
  {
    key: 'exportJobList',
    url: `${ADMIN_API}/wisdom/work-type-info/export-excel`,
    type: 'GET',
    name: '工种管理',
    description: '导出工种列表',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'code', cn: '编号' },
      { key: 'name', cn: '工种' },
      { key: 'initialsSpell', cn: '首字母简拼' },
      { key: 'isSpecialWorkType', cn: '是否特殊工种' },
    ],
  },
];
export default job;
