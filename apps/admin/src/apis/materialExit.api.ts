import { ApiItem } from '@spms/web-request';

const ADMIN_API = import.meta.env.VITE_APP_ADMIN_API;

const materialExit: ApiItem[] = [
  {
    key: 'getExitList',
    url: `${ADMIN_API}/wisdom/materials-exit/page`,
    type: 'GET',
    name: '物料进场列表',
    description: '获取物料进场列表(分页)',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'exitPersonnel', cn: '退料人员' },
      { key: 'supplierDepartment', cn: '供应单位' },
      { key: 'current', targetKey: 'pageNo' },
      { key: 'pageSize' },
    ],
  },
  {
    key: 'updateExit',
    url: `${ADMIN_API}/wisdom/materials-exit/update`,
    type: 'PUT',
    name: '物料进场列表',
    description: '编辑物料进场',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'materialsExitSaveReqVO', cn: '进场相关信息' },
      { key: 'materialsExitDetailsSaveReqVOS', cn: '进场物料相关信息' },
    ],
  },
  {
    key: 'createExit',
    url: `${ADMIN_API}/wisdom/materials-exit/create`,
    type: 'POST',
    name: '物料进场列表',
    description: '新增物料进场',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'materialsExitSaveReqVO', cn: '进场相关信息' },
      { key: 'materialsExitDetailsSaveReqVOS', cn: '进场物料相关信息' },
    ],
  },
  {
    key: 'deleteExit',
    url: `${ADMIN_API}/wisdom/materials-exit/delete`,
    type: 'DELETE',
    name: '物料进场列表',
    description: '删除物料进场',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'id', cn: '数据库主键' },
    ],
  },
];
export default materialExit;
