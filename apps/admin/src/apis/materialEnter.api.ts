import { ApiItem } from '@spms/web-request';

const ADMIN_API = import.meta.env.VITE_APP_ADMIN_API;

const materialEnter: ApiItem[] = [
  {
    key: 'getEnterList',
    url: `${ADMIN_API}/wisdom/materials-enter/page`,
    type: 'GET',
    name: '物料进场列表',
    description: '获取物料进场列表(分页)',
    params: [
      { key: 'Authorization', location: 'header' },
      // { key: 'firstLevelName', cn: '物料编号' },
      // { key: 'firstLevelName', cn: '物料名称' },
      { key: 'current', targetKey: 'pageNo' },
      { key: 'pageSize' },
    ],
  },
  {
    key: 'updateEnter',
    url: `${ADMIN_API}/wisdom/materials-enter/update`,
    type: 'PUT',
    name: '物料进场列表',
    description: '编辑物料进场',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'materialsEnterSaveReqVO', cn: '进场相关信息' },
      { key: 'materialsEnterDetailsSaveReqVOS', cn: '进场物料相关信息' },
    ],
  },
  {
    key: 'createEnter',
    url: `${ADMIN_API}/wisdom/materials-enter/create`,
    type: 'POST',
    name: '物料进场列表',
    description: '新增物料进场',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'materialsEnterSaveReqVO', cn: '进场相关信息' },
      { key: 'materialsEnterDetailsSaveReqVOS', cn: '进场物料相关信息' },
    ],
  },
  {
    key: 'deleteEnter',
    url: `${ADMIN_API}/wisdom/materials-enter/delete`,
    type: 'POST',
    name: '物料进场列表',
    description: '删除物料进场',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'id', cn: '数据库主键' },
    ],
  },
];
export default materialEnter;
