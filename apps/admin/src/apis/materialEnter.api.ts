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
      { key: 'deliveryMan', cn: '送货人' },
      { key: 'supplierDepartment', cn: '供应单位' },
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
      {
        key: 'materialsEnterDetailsSaveReqVOS',
        cn: '进场物料相关信息',
      },
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
      {
        key: 'materialsEnterDetailsSaveReqVOS',
        cn: '进场物料相关信息',
      },
    ],
  },
  {
    key: 'deleteEnter',
    url: `${ADMIN_API}/wisdom/materials-enter/delete`,
    type: 'DELETE',
    name: '物料进场列表',
    description: '删除物料进场',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'id', cn: '数据库主键' },
    ],
  },
  {
    key: 'startBpm',
    url: `${ADMIN_API}/wisdom/materials-enter/create-bpm`,
    type: 'GET',
    name: '物料进场列表',
    description: '发起物料进场审核流程',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'materialsEnterId', cn: '物料进场id' },
    ],
  },
  {
    key: 'materialAccept',
    url: `${ADMIN_API}/wisdom/materials-enter/pass-bpm`,
    type: 'PUT',
    name: '物料验收(验收员)',
    description: '物料进场审核, 填写实际验收数量',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'materialsEnterSaveReqVO', cn: '进场相关信息' },
      {
        key: 'materialsEnterDetailsSaveReqVOS',
        cn: '进场物料相关信息',
      },
    ],
  },
  {
    key: 'materialExamine',
    url: `${ADMIN_API}/wisdom/materials-enter/confirm-bpm`,
    type: 'GET',
    name: '物料审核(项目经理)',
    description: '物料进场审核, 填写实际验收数量',
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
export default materialEnter;
