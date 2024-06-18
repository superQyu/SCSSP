import { ApiItem } from '@spms/web-request';

const ADMIN_API = import.meta.env.VITE_APP_ADMIN_API;

const flowModel: ApiItem[] = [
  {
    key: 'getModelPage',
    url: `${ADMIN_API}/bpm/model/page`,
    type: 'GET',
    name: '流程管理/流程模型',
    description: '获得模型分页',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'key', cn: '流程标识' },
      { key: 'name', cn: '流程名称' },
      { key: 'category', cn: '流程分类' },
      { key: 'current', targetKey: 'pageNo' },
      { key: 'pageSize' },
    ],
  },
  {
    key: 'createUserGroup',
    url: `${ADMIN_API}/bpm/user-group/create`,
    type: 'POST',
    name: '流程管理/用户分组',
    description: '创建用户组',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'name', cn: '组名' },
      { key: 'description', cn: '描述' },
      { key: 'memberUserIds', cn: '成员编号' },
      { key: 'status', cn: '状态' },
    ],
  },
  {
    key: 'updateUserGroup',
    url: `${ADMIN_API}/bpm/user-group/update`,
    type: 'PUT',
    name: '流程管理/用户分组',
    description: '更新用户组',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'id', cn: '数据库主键' },
      { key: 'name', cn: '组名' },
      { key: 'description', cn: '描述' },
      { key: 'memberUserIds', cn: '成员编号' },
      { key: 'status', cn: '状态' },
    ],
  },
  {
    key: 'deleteUserGroup',
    url: `${ADMIN_API}/bpm/user-group/delete`,
    type: 'DELETE',
    name: '流程管理/用户分组',
    description: '删除用户组',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'id', cn: '数据库主键' },
    ],
  },
  {
    key: 'updateModelState',
    url: `${ADMIN_API}/bpm/model/update-state`,
    type: 'PUT',
    name: '流程管理/流程模型',
    description: '任务状态修改',
    params: [
      { key: 'Authorization', location: 'header' },
      { key: 'id', cn: '数据库主键' },
      { key: 'state', cn: '状态' },
    ],
  },
];
export default flowModel;
