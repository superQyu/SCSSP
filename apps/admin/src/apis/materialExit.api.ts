import { ApiItem } from '@spms/web-request';

const ADMIN_API = import.meta.env.VITE_APP_ADMIN_API;

const materialExit: ApiItem[] = [
  {
    key: 'getExitList',
    url: `${ADMIN_API}/wisdom/materials-exit/page`,
    type: 'GET',
    name: '物料出场列表',
    description: '获取物料出场列表(分页)',
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
    name: '物料出场列表',
    description: '编辑物料出场',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'materialsExitSaveReqVO', cn: '出场相关信息' },
      {
        key: 'materialsExitDetailsSaveReqVOS',
        cn: '出场物料相关信息',
      },
    ],
  },
  {
    key: 'createExit',
    url: `${ADMIN_API}/wisdom/materials-exit/create`,
    type: 'POST',
    name: '物料出场列表',
    description: '新增物料出场',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'materialsExitSaveReqVO', cn: '出场相关信息' },
      {
        key: 'materialsExitDetailsSaveReqVOS',
        cn: '出场物料相关信息',
      },
    ],
  },
  {
    key: 'deleteExit',
    url: `${ADMIN_API}/wisdom/materials-exit/delete`,
    type: 'DELETE',
    name: '物料出场列表',
    description: '删除物料出场',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'id', cn: '数据库主键' },
    ],
  },
  {
    key: 'startBpm',
    url: `${ADMIN_API}/wisdom/materials-exit/create-bpm`,
    type: 'GET',
    name: '物料出场列表',
    description: '发起物料出场审核流程',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'materialsExitId', cn: '物料出场id' },
    ],
  },
  {
    key: 'materialAccept',
    url: `${ADMIN_API}/wisdom/materials-exit/pass-bpm`,
    type: 'PUT',
    name: '物料出场清点(验收员)',
    description: '物料出场清点, 填写清点数量',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'materialsExitSaveReqVO', cn: '出场相关信息' },
      {
        key: 'materialsExitDetailsSaveReqVOS',
        cn: '出场物料相关信息',
      },
    ],
  },
  {
    key: 'materialExamine',
    url: `${ADMIN_API}/wisdom/materials-exit/confirm-bpm`,
    type: 'GET',
    name: '物料审核(项目经理)',
    description: '物料出场审核, 填写实际验收数量',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'materialsEnterId', cn: '传id' },
      {
        key: 'isConfirm',
        cn: '传通过/驳回',
      },
    ],
  },
];
export default materialExit;
